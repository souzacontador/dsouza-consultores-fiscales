// Sincroniza los comunicados desde el repo público souzacontador/Comunicados:
//   - descarga cada Comunicado-*.html y su *-preview.png a public/comunicados/
//   - aplica los metadatos SEO aprobados por el titular (título ≤60 / descripción
//     ≤160) al <title>, og:title, description y og:description del archivo
//   - ajusta metadatos de ubicación (og:url / og:image / canonical) hacia el sitio
//     (los inserta si el archivo no los trae)
//   - inyecta (idempotente) una barra de regreso a /recursos, un JSON-LD Article y
//     el script de refuerzo en runtime (ver scripts/lib/site-inject.mjs)
//   - genera src/data/comunicados.json
//
// A diferencia de los boletines (semanales, fecha en el nombre), los comunicados
// son temáticos: su fecha, título y descripción se declaran aquí, en COMUNICADOS.
// Nada se inventa: cada dato proviene del comunicado o de esta configuración.
//
// Uso: npm run comunicados   → luego commit + push (auto-deploy en Vercel).
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE_URL } from '../src/data/site.js'
import { injectStaticBar, injectRuntimeEnsure } from './lib/site-inject.mjs'

const REPO = 'souzacontador/Comunicados'
const API = `https://api.github.com/repos/${REPO}/contents`
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'comunicados')
mkdirSync(outDir, { recursive: true })

const BACK = { href: `${SITE_URL}/recursos`, label: 'Volver a Recursos' }

// Comunicados publicados. Para agregar uno nuevo: súbelo a souzacontador/Comunicados
// (junto con su -preview.png de 1200×630) y añade aquí su entrada.
//   slug        nombre exacto del archivo en el repo
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
]

const escAttr = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;')

// Sustituye (o inserta) el <title> y las metas de título/descripción del archivo.
function applySeoMeta(html, title, description) {
  html = /<title>[\s\S]*?<\/title>/i.test(html)
    ? html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escAttr(title)}</title>`)
    : html.replace(/<\/head>/i, `<title>${escAttr(title)}</title>\n</head>`)
  const setMeta = (attr, key, value) => {
    if (!value) return
    const a = new RegExp(`(<meta\\s[^>]*${attr}=["']${key}["'][^>]*content=)["'][^"']*["']`, 'i')
    const b = new RegExp(`(<meta\\s[^>]*content=)["'][^"']*["']([^>]*${attr}=["']${key}["'])`, 'i')
    if (a.test(html)) html = html.replace(a, `$1"${escAttr(value)}"`)
    else if (b.test(html)) html = html.replace(b, `$1"${escAttr(value)}"$2`)
    else html = html.replace(/<\/head>/i, `<meta ${attr}="${key}" content="${escAttr(value)}">\n</head>`)
  }
  setMeta('property', 'og:title', title)
  setMeta('name', 'description', description)
  setMeta('property', 'og:description', description)
  return html
}

// Inserta o reemplaza una meta property de ubicación (og:url, og:image).
function setLocationMeta(html, key, value) {
  const re = new RegExp(`(<meta\\s+property=["']${key}["']\\s+content=)["'][^"']*["']`, 'i')
  if (re.test(html)) return html.replace(re, `$1"${value}"`)
  return html.replace(/<\/head>/i, `<meta property="${key}" content="${value}">\n</head>`)
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

const list = await (await fetch(API, { headers: { 'User-Agent': 'dsouza-site-sync' } })).json()
if (!Array.isArray(list)) throw new Error('No se pudo listar el repo: ' + JSON.stringify(list).slice(0, 200))

const byName = new Map(list.filter((f) => f.type === 'file').map((f) => [f.name, f]))
const pngNames = new Set(list.filter((f) => /-preview\.png$/i.test(f.name)).map((f) => f.name))

const manifest = []
for (const c of COMUNICADOS) {
  const file = byName.get(c.slug)
  if (!file) throw new Error(`No está en el repo ${REPO}: ${c.slug}`)
  const previewName = c.slug.replace(/\.html$/i, '-preview.png')
  const hasPreview = pngNames.has(previewName)

  let html = await (await fetch(file.download_url)).text()
  html = applySeoMeta(html, c.title, c.description)

  const url = `${SITE_URL}/comunicados/${c.slug}`
  const img = `${SITE_URL}/comunicados/${previewName}`
  html = setLocationMeta(html, 'og:url', url)
  html = setLocationMeta(html, 'og:image', img)
  if (!/rel=["']canonical["']/i.test(html)) html = html.replace(/<\/head>/i, `<link rel="canonical" href="${url}">\n</head>`)

  const article = articleData({ title: c.title, description: c.description, dateISO: c.dateISO, url, img })
  html = injectArticle(html, article)
  html = injectStaticBar(html, BACK)
  html = injectRuntimeEnsure(html, { canonical: url, back: BACK, ld: article, title: c.title, description: c.description, force: true })
  writeFileSync(join(outDir, c.slug), html)

  if (hasPreview) {
    const png = byName.get(previewName)
    const buf = Buffer.from(await (await fetch(png.download_url)).arrayBuffer())
    writeFileSync(join(outDir, previewName), buf)
  }

  manifest.push({
    slug: c.slug,
    title: c.title,
    description: c.description,
    dateISO: c.dateISO,
    dateLabel: c.dateLabel,
    preview: `/comunicados/${previewName}`,
    previewFromRepo: hasPreview,
    sizeKB: Math.round(html.length / 1024),
  })
  console.log(`✓ ${c.slug}${hasPreview ? '' : '  (sin preview en el repo)'}`)
}

manifest.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
writeFileSync(join(root, 'src', 'data', 'comunicados.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`OK → ${manifest.length} comunicado(s) en public/comunicados/ y src/data/comunicados.json`)
