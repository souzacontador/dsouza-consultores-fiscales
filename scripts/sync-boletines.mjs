// Sincroniza los boletines desde el repo público souzacontador/BOLETIN-DSOUZA:
//   - descarga cada Boletin-*.html y su *-preview.png a public/boletines/
//   - ajusta SOLO metadatos de ubicación (og:url / og:image / canonical) para
//     que apunten al sitio; añade og:image si el boletín no lo trae
//   - inyecta (idempotente) una barra superior de regreso a /recursos, un JSON-LD
//     Article con el título, la fecha y el autor ya conocidos, y un script de
//     refuerzo en runtime (ver scripts/lib/site-inject.mjs: algunos boletines
//     reconstruyen el documento al cargar)
//   - genera src/data/boletines.json (título, descripción, fecha) leyendo
//     los meta de cada archivo — nada se inventa.
// Uso: npm run boletines   → luego commit + push (auto-deploy en Vercel).
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE_URL } from '../src/data/site.js'
import { injectStaticBar, injectRuntimeEnsure } from './lib/site-inject.mjs'

const REPO = 'souzacontador/BOLETIN-DSOUZA'
const API = `https://api.github.com/repos/${REPO}/contents`
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'boletines')
mkdirSync(outDir, { recursive: true })

const BACK = { href: `${SITE_URL}/recursos`, label: 'Volver a Recursos' }

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

// Títulos y descriptions SEO aprobados por el titular (≤60 / ≤160 caracteres),
// redactados únicamente a partir del contenido de cada boletín. Se aplican al
// <title>, og:title, description y og:description del archivo, al JSON-LD
// Article y al listado de /recursos. Si un boletín no está aquí, se usan los
// metadatos que trae el propio archivo.
const SEO_OVERRIDE = {
  'Boletin-Fiscal-DSouza-19-28-ago-2026.html': {
    title: 'Boletín Fiscal 19–28 de agosto de 2026 | DSouza Consultores',
    description:
      'El SAT intensifica la fiscalización con las facultades que ya tiene. Plazos clave antes del cierre de 2026: Regularización (31-oct) y Antilavado (30-nov).',
  },
  'Boletin-Fiscal-DSouza-07-11-ago-2026.html': {
    title: 'Boletín Fiscal 7–11 de agosto de 2026 | DSouza Consultores',
    description:
      'Reforma integral antilavado (Acuerdo 115/2026), Programa de Regularización Fiscal 2026 (límite 31-oct) y fiscalización algorítmica del SAT.',
  },
  'Boletin-Fiscal-DSouza-27-jul-03-ago-2026.html': {
    title: 'Boletín Fiscal 27 jul – 3 ago 2026 | DSouza Consultores',
    description:
      'El SAT reanuda plazos el 3 de agosto: calendario de vencimientos, Plan Maestro de Fiscalización, antilavado, prórroga de la MVE y Carta Porte.',
  },
  'Boletin-Fiscal-DSouza-03-23-jul-2026.html': {
    title: 'Boletín Fiscal 3–23 de julio de 2026 | DSouza Consultores',
  },
  'Boletin-Fiscal-DSouza-30-abr-2026.html': {
    title: 'Boletín Fiscal 23–30 de abril de 2026 | DSouza Consultores',
    description:
      'Vence la Anual 2025 de personas físicas; 1ª Modificación a la RMF 2026 (estímulo al diésel), aranceles en 185 fracciones y complemento de hidrocarburos.',
  },
  'Boletin-Fiscal-DSouza-21-24-abr-2026.html': {
    title: 'Boletín Fiscal 21–24 de abril de 2026 | DSouza Consultores',
    description:
      'Complemento CFDI Hidrocarburos, reforma LFPIORPI, SCJN-UIF, Plan Maestro SAT 2026, Declaración Anual PF 2025 y jornada de 40 horas.',
  },
}

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

const pick = (html, re) => (html.match(re) || [null, null])[1]?.trim() || null
const metaContent = (html, attr, key) =>
  pick(html, new RegExp(`<meta\\s[^>]*${attr}=["']${key}["'][^>]*content=["']([^"']*)["']`, 'i')) ||
  pick(html, new RegExp(`<meta\\s[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${key}["']`, 'i'))

// JSON-LD Article: solo datos que ya existen (título y descripción del propio
// boletín, fecha de la edición, autor/publicador del sitio).
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

const htmlFiles = list.filter((f) => f.type === 'file' && /\.html$/i.test(f.name) && /^Boletin/i.test(f.name))
const pngNames = new Set(list.filter((f) => /-preview\.png$/i.test(f.name)).map((f) => f.name))

const manifest = []
for (const f of htmlFiles) {
  const slug = RENAME[f.name] || f.name
  const previewSrc = f.name.replace(/\.html$/i, '-preview.png')
  const previewSlug = slug.replace(/\.html$/i, '-preview.png')
  const hasPreview = pngNames.has(previewSrc)

  let html = await (await fetch(f.download_url)).text()
  const fileTitle = metaContent(html, 'property', 'og:title') || pick(html, /<title>([\s\S]*?)<\/title>/i)
  const fileDescription = metaContent(html, 'property', 'og:description') || metaContent(html, 'name', 'description')
  const seo = SEO_OVERRIDE[slug] || {}
  const title = seo.title || fileTitle
  const description = seo.description || fileDescription
  const date = DATE_OVERRIDE[slug] || dateFromName(slug)
  if (!title || !date) throw new Error(`Sin título o fecha para ${f.name}`)
  if (seo.title || seo.description) html = applySeoMeta(html, title, description)

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
  const article = articleData({ title, description, dateISO: date.iso, url, img })
  html = injectArticle(html, article)
  html = injectStaticBar(html, BACK)
  const force = !!(seo.title || seo.description)
  html = injectRuntimeEnsure(html, { canonical: url, back: BACK, ld: article, title, description, force })
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
