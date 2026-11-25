// Sincroniza las calculadoras desde el repo público souzacontador/dsouza-app:
//   - descarga cada <slug>/index.html (autocontenido) a public/calculadoras/<slug>/index.html
//   - inyecta SOLO metadatos y navegación (nunca toca la lógica ni los resultados):
//       · <link rel="canonical"> al sitio
//       · lang="es-MX", viewport, description, Open Graph y Twitter — solo si faltan
//       · barra superior de regreso a /calculadoras + script de refuerzo en runtime
//         (ver scripts/lib/site-inject.mjs: estas páginas reconstruyen el documento al cargar)
//   - genera src/data/calculadoras.json con el título/descripción que el propio
//     repo usa en su página menú (index.html raíz) — nada se inventa.
// Uso: npm run calculadoras   → luego commit + push.
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE_URL } from '../src/data/site.js'
import { injectStaticBar, injectRuntimeEnsure } from './lib/site-inject.mjs'

const RAW = 'https://raw.githubusercontent.com/souzacontador/dsouza-app/main'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Textos tomados literalmente de las tarjetas del menú raíz de dsouza-app.
// Para agregar una calculadora nueva: súbela a dsouza-app en su carpeta y
// añade aquí su slug + los textos de su tarjeta.
const CALCULADORAS = [
  {
    slug: 'iva-retenciones',
    title: 'Calculadora de IVA y Retenciones',
    description:
      'Desglose de IVA, retención de ⅔ de IVA e ISR por régimen fiscal y tipo de operación. Cálculo desde el gasto o desde el monto pagado.',
    icon: 'calculator',
  },
  {
    slug: 'equivalencias-dlls',
    title: 'Equivalencias en Dólares (USD)',
    description:
      'Tipo de cambio USD/MXN aplicable a cada día de 2026, con conversión de montos, gráfica de evolución y cierres mensuales.',
    icon: 'currency',
  },
  {
    slug: 'asimilados-salarios',
    title: 'Calculadora de ISR · Asimilados a salarios',
    description:
      'Retención de ISR sobre percepciones asimiladas a salarios conforme al Anexo 8 de la RMF 2026. Cálculo directo, inverso y proyección anual.',
    icon: 'calculator',
  },
  // Calculadora de nómina: vive en el repo souzacontador/dsouza-nomina-2026 (app
  // Vite/React, no es un HTML suelto). Se publica desde su build de un solo archivo
  // (`npx vite build -c vite.config.singlefile.ts` → dist-single/index.html):
  //   NOMINA_2026_DIST=<ruta a dist-single/index.html> npm run calculadoras
  // Sin esa variable se conserva el archivo ya publicado en public/.
  {
    slug: 'nomina-2026',
    title: 'Calculadora Nómina 2026 y Carga Social',
    description:
      'ISR por salarios (Anexo 8 RMF 2026), subsidio para el empleo, cuotas IMSS e INFONAVIT y tiempo extra. Incluye aguinaldo y PTU, finiquito y liquidación, ISR anual y SBC variable.',
    icon: 'calculator',
    local: true,
  },
]

const BACK = { href: `${SITE_URL}/calculadoras`, label: 'Volver a Calculadoras' }
const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
const has = (html, re) => re.test(html)

function injectHead(html, c, url) {
  const inserts = []
  if (!has(html, /<meta\s[^>]*name=["']?viewport/i)) {
    inserts.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
  }
  if (!has(html, /<meta\s[^>]*name=["']?description/i)) {
    inserts.push(`<meta name="description" content="${esc(c.description)}">`)
  }
  if (!has(html, /<meta\s[^>]*property=["']?og:title/i)) {
    const pageTitle = (html.match(/<title>([\s\S]*?)<\/title>/i) || [null, c.title])[1].trim()
    inserts.push(
      '<meta property="og:type" content="website">',
      '<meta property="og:site_name" content="DSouza Consultores Fiscales">',
      '<meta property="og:locale" content="es_MX">',
      `<meta property="og:title" content="${esc(pageTitle)}">`,
      `<meta property="og:description" content="${esc(c.description)}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${SITE_URL}/og-image.png">`,
      '<meta name="twitter:card" content="summary_large_image">'
    )
  }
  if (!has(html, /rel=["']canonical["']/i)) {
    inserts.push(`<link rel="canonical" href="${url}">`)
  }
  if (!inserts.length) return html
  return html.replace(/<\/head>/i, `${inserts.join('\n')}\n</head>`)
}

function injectLang(html) {
  return html.replace(/<html(\s[^>]*)?>/i, (tag, attrs = '') =>
    /\blang=/i.test(tag) ? tag : `<html lang="es-MX"${attrs || ''}>`
  )
}

// Los bundles de Vite traen cadenas como "<body>" o "</head>" dentro del JS inline
// (p. ej. SheetJS) que los helpers de inyección tomarían por las etiquetas reales.
// Se enmascaran en la parte previa al </head> real, se inyecta y se restauran.
function conEtiquetasEnmascaradas(html, fn) {
  const i = html.lastIndexOf('</head>')
  if (i < 0) return fn(html)
  // Marcadores @@DSZ-...@@ : no aparecen en los bundles.
  const PARES = [
    ['</head>', '@@DSZ-HC@@'],
    ['<body', '@@DSZ-BO@@'],
    ['</body>', '@@DSZ-BC@@'],
  ]
  if (PARES.some(([, m]) => html.includes(m))) throw new Error('El HTML ya contiene un marcador @@DSZ-')
  const mask = (t) => PARES.reduce((x, [orig, m]) => x.replaceAll(orig, m), t)
  const unmask = (t) => PARES.reduce((x, [orig, m]) => x.replaceAll(m, orig), t)
  return unmask(fn(mask(html.slice(0, i)) + html.slice(i)))
}

const manifest = []
for (const c of CALCULADORAS) {
  const dir = join(root, 'public', 'calculadoras', c.slug)
  const file = join(dir, 'index.html')
  const url = `${SITE_URL}/calculadoras/${c.slug}/`
  let html

  if (c.local && !process.env.NOMINA_2026_DIST) {
    if (!existsSync(file)) throw new Error(`Falta ${file}; define NOMINA_2026_DIST con el build de ${c.slug}`)
    html = readFileSync(file, 'utf8') // ya procesado en una ejecución previa
  } else {
    if (c.local) {
      html = readFileSync(process.env.NOMINA_2026_DIST, 'utf8')
    } else {
      const res = await fetch(`${RAW}/${c.slug}/index.html`)
      if (!res.ok) throw new Error(`No se pudo descargar ${c.slug}: HTTP ${res.status}`)
      html = await res.text()
    }
    const procesar = (h) => {
      h = injectLang(h)
      h = injectHead(h, c, url)
      h = injectStaticBar(h, BACK)
      return injectRuntimeEnsure(h, { canonical: url, back: BACK, description: c.description })
    }
    html = c.local ? conEtiquetasEnmascaradas(html, procesar) : procesar(html)
    mkdirSync(dir, { recursive: true })
    writeFileSync(file, html)
  }

  const pageTitle = (html.match(/<title>([\s\S]*?)<\/title>/i) || [null, null])[1]?.trim() || null
  const { local, ...meta } = c
  manifest.push({ ...meta, path: `/calculadoras/${c.slug}/`, pageTitle, sizeKB: Math.round(html.length / 1024) })
  console.log(`✓ ${c.slug} (${Math.round(html.length / 1024)} KB)`)
}

writeFileSync(join(root, 'src', 'data', 'calculadoras.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`OK → ${manifest.length} calculadoras en public/calculadoras/ y src/data/calculadoras.json`)
