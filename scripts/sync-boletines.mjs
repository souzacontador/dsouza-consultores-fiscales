// Sincroniza los boletines desde el repo público souzacontador/BOLETIN-DSOUZA:
//   - descarga cada Boletin-*.html y su *-preview.png a public/boletines/
//   - ajusta SOLO metadatos de ubicación (og:url / og:image / canonical) para
//     que apunten al sitio; añade og:image si el boletín no lo trae
//   - inyecta (idempotente) una barra superior de regreso a /recursos y un
//     JSON-LD Article con el título, la fecha y el autor ya conocidos
//   - genera src/data/boletines.json (título, descripción, fecha) leyendo
//     los meta de cada archivo — nada se inventa.
// Uso: npm run boletines   → luego commit + push (auto-deploy en Vercel).
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE_URL } from '../src/data/site.js'

const REPO = 'souzacontador/BOLETIN-DSOUZA'
const API = `https://api.github.com/repos/${REPO}/contents`
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'boletines')
mkdirSync(outDir, { recursive: true })

// Nombres irregulares en el repo → nombre normalizado en el sitio.
const RENAME = {
  'Boletin Fiscal Semanal _30 abril_.html': 'Boletin-Fiscal-DSouza-30-abr-2026.html',
}
// Fechas que no se pueden leer del nombre de archivo (tomadas del Index.html del repo).
const DATE_OVERRIDE = {
  // Etiqueta tomada del <title> del propio boletín ("23–30 Abril 2026").
  'Boletin-Fiscal-DSouza-30-abr-2026.html': { iso: '2026-04-30', label: '23–30 de abril de 2026' },
}

const MESES = { ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6, jul: 7, ago: 8, sep: 9, oct: 10, nov: 11, dic: 12 }
const MES_LARGO = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

// "21-24-abr-2026" → {iso: 2026-04-24, label: "21–24 de abril de 2026"}
// "27-jul-03-ago-2026" → {iso: 2026-08-03, label: "27 de julio – 3 de agosto de 2026"}
function dateFromName(slug) {
  const s = slug.replace(/^Boletin-Fiscal-DSouza-/, '').replace(/\.html$/, '')
  let m = s.match(/^(\d{2})-(\d{2})-([a-z]{3})-(\d{4})$/)
  if (m) {
    const [, d1, d2, mes, y] = m
    const mm = MESES[mes]
    return {
      iso: `${y}-${String(mm).padStart(2, '0')}-${d2}`,
      label: `${Number(d1)}–${Number(d2)} de ${MES_LARGO[mm]} de ${y}`,
    }
  }
  m = s.match(/^(\d{2})-([a-z]{3})-(\d{2})-([a-z]{3})-(\d{4})$/)
  if (m) {
    const [, d1, mes1, d2, mes2, y] = m
    const mm = MESES[mes2]
    return {
      iso: `${y}-${String(mm).padStart(2, '0')}-${d2}`,
      label: `${Number(d1)} de ${MES_LARGO[MESES[mes1]]} – ${Number(d2)} de ${MES_LARGO[mm]} de ${y}`,
    }
  }
  return null
}

const pick = (html, re) => (html.match(re) || [null, null])[1]?.trim() || null
const metaContent = (html, attr, key) =>
  pick(html, new RegExp(`<meta\\s[^>]*${attr}=["']${key}["'][^>]*content=["']([^"']*)["']`, 'i')) ||
  pick(html, new RegExp(`<meta\\s[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${key}["']`, 'i'))

// Barra superior de regreso al sitio (estilos inline, identificada por id
// para no duplicarse en re-sync).
const BAR_ID = 'dsz-site-bar'
function siteBar() {
  return (
    `<div id="${BAR_ID}" style="font:600 14px/1.4 Inter,system-ui,sans-serif;background:#0A2540;color:#fff;padding:10px 16px;text-align:center">` +
    `<a href="${SITE_URL}/recursos" style="color:#00B8D9;text-decoration:none">&larr; Volver a Recursos</a>` +
    `<span style="opacity:.5;margin:0 10px">|</span>` +
    `<a href="${SITE_URL}/" style="color:#fff;text-decoration:none">dsouzaconsultores.mx</a>` +
    `</div>\n`
  )
}
function injectBar(html) {
  if (html.includes(`id="${BAR_ID}"`)) return html
  return html.replace(/<body([^>]*)>/i, (tag) => `${tag}\n${siteBar()}`)
}

// JSON-LD Article: solo datos que ya existen (título y descripción del propio
// boletín, fecha de la edición, autor/publicador del sitio).
function articleJsonLd({ title, description, dateISO, url, img }) {
  const data = {
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
  return `<script type="application/ld+json" data-dsz="article">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>\n`
}
function injectArticle(html, info) {
  if (html.includes('data-dsz="article"')) return html
  return html.replace(/<\/head>/i, `${articleJsonLd(info)}</head>`)
}

const list = await (await fetch(API, { headers: { 'User-Agent': 'dsouza-site-sync' } })).json()
if (!Array.isArray(list)) throw new Error('No se pudo listar el repo: ' + JSON.stringify(list).slice(0, 200))

const htmlFiles = list.filter((f) => f.type === 'file' && /\.html$/i.test(f.name) && /^Boletin/i.test(f.name))
const pngNames = new Set(list.filter((f) => /-preview\.png$/i.test(f.name)).map((f) => f.name))

const manifest = []
for (const f of htmlFiles) {
  const slug = RENAME[f.name] || f.name
  const previewSrc = f.name.replace(/\.html$/i, '-preview.png')
  const previewSlug = slug.replace(/\.html$/i, '-preview.png')
  const hasPreview = pngNames.has(previewSrc)

  let html = await (await fetch(f.download_url)).text()
  const title = metaContent(html, 'property', 'og:title') || pick(html, /<title>([\s\S]*?)<\/title>/i)
  const description = metaContent(html, 'property', 'og:description') || metaContent(html, 'name', 'description')
  const date = DATE_OVERRIDE[slug] || dateFromName(slug)
  if (!title || !date) throw new Error(`Sin título o fecha para ${f.name}`)

  // Solo metadatos de ubicación y navegación: el contenido no se toca.
  const url = `${SITE_URL}/boletines/${slug}`
  const img = `${SITE_URL}/boletines/${previewSlug}` // la vista previa existe siempre (repo o generada)
  html = html.replace(/(<meta\s+property=["']og:url["']\s+content=)["'][^"']*["']/i, `$1"${url}"`)
  if (/<meta\s+property=["']og:image["']/i.test(html)) {
    html = html.replace(/(<meta\s+property=["']og:image["']\s+content=)["'][^"']*["']/i, `$1"${img}"`)
  } else {
    html = html.replace(/<\/head>/i, `<meta property="og:image" content="${img}">\n</head>`)
  }
  if (!/rel=["']canonical["']/i.test(html)) html = html.replace(/<\/head>/i, `<link rel="canonical" href="${url}">\n</head>`)
  html = injectArticle(html, { title, description, dateISO: date.iso, url, img })
  html = injectBar(html)
  writeFileSync(join(outDir, slug), html)

  if (hasPreview) {
    const png = list.find((x) => x.name === previewSrc)
    const buf = Buffer.from(await (await fetch(png.download_url)).arrayBuffer())
    writeFileSync(join(outDir, previewSlug), buf)
  }

  manifest.push({
    slug,
    title,
    description,
    dateISO: date.iso,
    dateLabel: date.label,
    preview: `/boletines/${previewSlug}`, // si falta, generar con scripts/generate-boletin-preview.mjs
    previewFromRepo: hasPreview,
    sizeKB: Math.round(html.length / 1024),
  })
  console.log(`✓ ${slug}${hasPreview ? '' : '  (sin preview en el repo)'}`)
}

manifest.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
writeFileSync(join(root, 'src', 'data', 'boletines.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`OK → ${manifest.length} boletines en public/boletines/ y src/data/boletines.json`)
