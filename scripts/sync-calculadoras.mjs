// Sincroniza las calculadoras desde el repo público souzacontador/dsouza-app:
//   - descarga cada <slug>/index.html (autocontenido) a public/calculadoras/<slug>/index.html
//   - inyecta SOLO metadatos y navegación (nunca toca la lógica ni los resultados):
//       · <link rel="canonical"> al sitio
//       · lang="es-MX", viewport, description, Open Graph y Twitter — solo si faltan
//       · una barra superior con enlace de regreso a /calculadoras (idempotente)
//   - genera src/data/calculadoras.json con el título/descripción que el propio
//     repo usa en su página menú (index.html raíz) — nada se inventa.
// Uso: npm run calculadoras   → luego commit + push.
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE_URL } from '../src/data/site.js'

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
]

const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
const has = (html, re) => re.test(html)

// Barra superior de regreso al sitio. Estilos inline para no depender del CSS
// de cada calculadora; se identifica por id para no duplicarse en re-sync.
const BAR_ID = 'dsz-site-bar'
function siteBar(backHref, backLabel) {
  return (
    `<div id="${BAR_ID}" style="font:600 14px/1.4 Inter,system-ui,sans-serif;background:#0A2540;color:#fff;padding:10px 16px;text-align:center">` +
    `<a href="${backHref}" style="color:#00B8D9;text-decoration:none">&larr; ${backLabel}</a>` +
    `<span style="opacity:.5;margin:0 10px">|</span>` +
    `<a href="${SITE_URL}/" style="color:#fff;text-decoration:none">dsouzaconsultores.mx</a>` +
    `</div>\n`
  )
}

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

function injectBar(html, backHref, backLabel) {
  if (html.includes(`id="${BAR_ID}"`)) return html
  return html.replace(/<body([^>]*)>/i, (tag) => `${tag}\n${siteBar(backHref, backLabel)}`)
}

const manifest = []
for (const c of CALCULADORAS) {
  const res = await fetch(`${RAW}/${c.slug}/index.html`)
  if (!res.ok) throw new Error(`No se pudo descargar ${c.slug}: HTTP ${res.status}`)
  let html = await res.text()

  const url = `${SITE_URL}/calculadoras/${c.slug}/`
  html = injectLang(html)
  html = injectHead(html, c, url)
  html = injectBar(html, `${SITE_URL}/calculadoras`, 'Volver a Calculadoras')

  const dir = join(root, 'public', 'calculadoras', c.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)

  const pageTitle = (html.match(/<title>([\s\S]*?)<\/title>/i) || [null, null])[1]?.trim() || null
  manifest.push({ ...c, path: `/calculadoras/${c.slug}/`, pageTitle, sizeKB: Math.round(html.length / 1024) })
  console.log(`✓ ${c.slug} (${Math.round(html.length / 1024)} KB)`)
}

writeFileSync(join(root, 'src', 'data', 'calculadoras.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`OK → ${manifest.length} calculadoras en public/calculadoras/ y src/data/calculadoras.json`)
