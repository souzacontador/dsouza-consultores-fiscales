// Sincroniza los comunicados desde el repo público souzacontador/Comunicados:
//   - descarga cada comunicado (archivo suelto o carpeta) y su vista previa a
//     public/comunicados/
//   - aplica los metadatos SEO aprobados por el titular (título ≤60 / descripción
//     ≤160) al <title>, og:title, description y og:description del archivo
//   - ajusta metadatos de ubicación (og:url / og:image / canonical) hacia el sitio
//   - añade metadatos sociales de refuerzo (og:type, og:site_name, og:locale,
//     og:image:width/height 1200×630 y Twitter Card) para que Facebook, LinkedIn y
//     X muestren una tarjeta correcta desde el primer intento
//   - inyecta (idempotente) una barra de regreso a /recursos, un JSON-LD Article y
//     el script de refuerzo en runtime (ver scripts/lib/site-inject.mjs)
//   - genera src/data/comunicados.json
//
// A diferencia de los boletines (semanales, fecha en el nombre), los comunicados
// son temáticos: su fecha, título y descripción se declaran aquí, en COMUNICADOS.
// Nada se inventa: cada dato proviene del comunicado o de esta configuración.
//
// Dos formas de comunicado en el repo, ambas soportadas:
//   · archivo suelto  → slug = 'Nombre.html' (+ preview '<Nombre>-preview.png',
//                       o un 'preview:' explícito si el archivo usa otro nombre)
//     se sirve en /comunicados/<Nombre>.html
//   · carpeta         → slug = 'carpeta', type: 'dir'  (usa carpeta/index.html y
//                       carpeta/og-image.png); se sirve en /comunicados/<carpeta>/
//
// Uso: npm run comunicados   → luego commit + push (auto-deploy en Vercel).
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE_URL } from '../src/data/site.js'
import { injectStaticBar, injectRuntimeEnsure } from './lib/site-inject.mjs'

const REPO = 'souzacontador/Comunicados'
const API = `https://api.github.com/repos/${REPO}/contents`
const HEADERS = { 'User-Agent': 'dsouza-site-sync' }
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'comunicados')
mkdirSync(outDir, { recursive: true })

const BACK = { href: `${SITE_URL}/recursos`, label: 'Volver a Recursos' }

// Comunicados publicados. Para agregar uno nuevo: súbelo a souzacontador/Comunicados
// (con su vista previa 1200×630) y añade aquí su entrada.
//   slug        archivo ('Nombre.html') o carpeta ('carpeta') exactos en el repo
//   type        'dir' si el comunicado es una carpeta con index.html; omitir si es archivo
//   preview     (solo archivo suelto) nombre del PNG de vista previa si NO sigue la
//               convención '<slug>-preview.png'
//   dateISO     fecha de referencia del comunicado (AAAA-MM-DD)
//   dateLabel   etiqueta legible que se muestra en la tarjeta de /recursos
//   title       título SEO aprobado (≤60 caracteres, con marca)
//   description descripción SEO aprobada (≤160 caracteres)
const COMUNICADOS = [
  {
    slug: 'Comunicado-DSouza-01-07-sep-2026.html',
    dateISO: '2026-09-07',
    dateLabel: '1–7 de septiembre de 2026',
    title: 'Comunicado SBC variables IV bimestre 2026 | DSouza',
    description:
      'Conoce el nuevo SBC del IV bimestre 2026 para trabajadores con salario variable o mixto y la fecha límite ante el IMSS: 7 de septiembre.',
  },
  {
    slug: 'circular-imss-campo-2026',
    type: 'dir',
    dateISO: '2026-08-08',
    dateLabel: '8 de agosto de 2026',
    title: 'Beneficios fiscales IMSS 2026 al campo | DSouza',
    description:
      'Circular para patrones del campo: beneficios fiscales del IMSS 2026 y las nuevas reglas que entran en vigor hacia el 8 de agosto de 2026.',
  },
  {
    slug: 'Analisis_Criterio_43ISRPI_DSouza.html',
    preview: 'og-analisis-43-isr-pi.png',
    dateISO: '2026-07-17',
    dateLabel: '17 de julio de 2026',
    title: 'Análisis: Criterio 43/ISR/PI (RMF 2026) | DSouza',
    description:
      'Análisis técnico preventivo del Criterio 43/ISR/PI (RMF 2026, DOF 17-jul-2026): bonos vía A.C., riesgos y recomendaciones.',
  },
  {
    slug: 'circular-npie-efirma-sat',
    type: 'dir',
    dateISO: '2026-07-16',
    dateLabel: '16 de julio de 2026',
    title: 'IMSS elimina el NPIE: e.firma obligatoria | DSouza',
    description:
      'El IMSS deroga el NPIE; la e.firma del SAT será el único medio válido para movimientos afiliatorios (DOF 16-jul-2026). Transición de 90 días.',
  },
]

const escAttr = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;')

// Sustituye (o inserta) el <title> y las metas de título/descripción del archivo.
function applySeoMeta(html, title, description) {
  html = /<title>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escAttr(title)}</title>`)
    : html.replace(/<\/head>/i, `<title>${escAttr(title)}</title>\n</head>`)
  return setMetaChain(html, [
    ['property', 'og:title', title],
    ['name', 'description', description],
    ['property', 'og:description', description],
  ])
}

// Reemplaza o inserta una <meta> por (attr,key). Devuelve el HTML nuevo.
function setMeta(html, attr, key, value) {
  if (value == null) return html
  const a = new RegExp(`(<meta\\s[^>]*${attr}=["']${key}["'][^>]*content=)["'][^"']*["']`, 'i')
  const b = new RegExp(`(<meta\\s[^>]*content=)["'][^"']*["']([^>]*${attr}=["']${key}["'])`, 'i')
  if (a.test(html)) return html.replace(a, `$1"${escAttr(value)}"`)
  if (b.test(html)) return html.replace(b, `$1"${escAttr(value)}"$2`)
  return html.replace(/<\/head>/i, `<meta ${attr}="${key}" content="${escAttr(value)}">\n</head>`)
}
function setMetaChain(html, triples) {
  for (const [attr, key, value] of triples) html = setMeta(html, attr, key, value)
  return html
}

// Reemplaza el href del <link rel="canonical"> existente (aunque apunte a otro
// dominio, p. ej. github.io) o lo inserta si no hay ninguno.
function setCanonical(html, url) {
  const a = /(<link\s[^>]*rel=["']canonical["'][^>]*href=)["'][^"']*["']/i
  const b = /(<link\s[^>]*href=)["'][^"']*["']([^>]*rel=["']canonical["'])/i
  if (a.test(html)) return html.replace(a, `$1"${url}"`)
  if (b.test(html)) return html.replace(b, `$1"${url}"$2`)
  return html.replace(/<\/head>/i, `<link rel="canonical" href="${url}">\n</head>`)
}

// Metadatos sociales de refuerzo: garantizan una tarjeta grande y correcta en
// Facebook, LinkedIn y X. La vista previa del proyecto es siempre 1200×630.
function ensureSocialMeta(html, { title, description, img }) {
  return setMetaChain(html, [
    ['property', 'og:type', 'article'],
    ['property', 'og:site_name', 'DSouza Consultores Fiscales'],
    ['property', 'og:locale', 'es_MX'],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', img],
  ])
}

// JSON-LD Article: solo datos que ya existen (título y descripción aprobados,
// fecha del comunicado, autor/publicador del sitio).
function articleData({ title, description, dateISO, url, img }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    ...(description ? { description } : {}),
    datePublished: dateISO,
    dateModified: dateISO,
    inLanguage: 'es-MX',
    mainEntityOfPage: url,
    image: img,
    author: { '@type': 'Person', name: 'Daniel Souza Vázquez', url: `${SITE_URL}/nosotros` },
    publisher: {
      '@type': 'Organization',
      name: 'DSouza Consultores Fiscales',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
    },
  }
}
function injectArticle(html, data) {
  if (html.includes('data-dsz="article"')) return html
  const json = JSON.stringify(data).replace(/</g, '\\u003c') // `<` escapado: no puede cerrar el <script>
  return html.replace(/<\/head>/i, `<script type="application/ld+json" data-dsz="article">${json}</script>\n</head>`)
}

// Devuelve la entrada de archivo del repo para una ruta ('n.html' o 'carpeta/index.html').
const dirCache = new Map()
async function repoFile(rootList, path) {
  const i = path.lastIndexOf('/')
  const dir = i === -1 ? '' : path.slice(0, i)
  const name = i === -1 ? path : path.slice(i + 1)
  let list = rootList
  if (dir) {
    if (!dirCache.has(dir)) dirCache.set(dir, await (await fetch(`${API}/${dir}`, { headers: HEADERS })).json())
    list = dirCache.get(dir)
  }
  if (!Array.isArray(list)) return null
  return list.find((f) => f.name === name && f.type === 'file') || null
}

const rootList = await (await fetch(API, { headers: HEADERS })).json()
if (!Array.isArray(rootList)) throw new Error('No se pudo listar el repo: ' + JSON.stringify(rootList).slice(0, 200))

const manifest = []
for (const c of COMUNICADOS) {
  const isDir = c.type === 'dir'
  // Rutas en el REPO
  const srcPath = isDir ? `${c.slug}/index.html` : c.slug
  const previewSrc = isDir
    ? `${c.slug}/og-image.png`
    : c.preview || c.slug.replace(/\.html$/i, '-preview.png')
  // Rutas de SALIDA bajo public/comunicados/ (y sufijo de URL del sitio)
  const htmlOut = isDir ? join(c.slug, 'index.html') : c.slug
  const previewOut = isDir ? join(c.slug, 'og-image.png') : previewSrc
  const hrefSlug = isDir ? `${c.slug}/` : c.slug // usado por /recursos como /comunicados/<hrefSlug>
  const previewUrlPath = isDir ? `${c.slug}/og-image.png` : previewSrc

  const fileEntry = await repoFile(rootList, srcPath)
  if (!fileEntry) throw new Error(`No está en el repo ${REPO}: ${srcPath}`)
  const previewEntry = await repoFile(rootList, previewSrc)

  let html = await (await fetch(fileEntry.download_url)).text()

  const url = `${SITE_URL}/comunicados/${hrefSlug}`
  const img = `${SITE_URL}/comunicados/${previewUrlPath}`

  html = applySeoMeta(html, c.title, c.description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:image', img)
  html = ensureSocialMeta(html, { title: c.title, description: c.description, img })
  html = setCanonical(html, url)

  const article = articleData({ title: c.title, description: c.description, dateISO: c.dateISO, url, img })
  html = injectArticle(html, article)
  html = injectStaticBar(html, BACK)
  html = injectRuntimeEnsure(html, {
    canonical: url,
    back: BACK,
    ld: article,
    title: c.title,
    description: c.description,
    force: true,
  })

  mkdirSync(dirname(join(outDir, htmlOut)), { recursive: true })
  writeFileSync(join(outDir, htmlOut), html)

  if (previewEntry) {
    const buf = Buffer.from(await (await fetch(previewEntry.download_url)).arrayBuffer())
    mkdirSync(dirname(join(outDir, previewOut)), { recursive: true })
    writeFileSync(join(outDir, previewOut), buf)
  }

  manifest.push({
    slug: hrefSlug,
    title: c.title,
    description: c.description,
    dateISO: c.dateISO,
    dateLabel: c.dateLabel,
    preview: `/comunicados/${previewUrlPath}`,
    previewFromRepo: !!previewEntry,
    sizeKB: Math.round(html.length / 1024),
  })
  console.log(`✓ ${hrefSlug}${previewEntry ? '' : '  (sin vista previa en el repo)'}`)
}

manifest.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
writeFileSync(join(root, 'src', 'data', 'comunicados.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`OK → ${manifest.length} comunicado(s) en public/comunicados/ y src/data/comunicados.json`)
