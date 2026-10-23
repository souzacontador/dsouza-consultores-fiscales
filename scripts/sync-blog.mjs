// Sincroniza las publicaciones del BLOG (carruseles HTML responsivos y
// autocontenidos) hacia el sitio:
//   - lee cada publicación desde content/blog/ (versionada en este repo; la ruta
//     se puede sobrescribir con la variable de entorno BLOG_SRC). El original en
//     OneDrive (carrusel de 1080×1350 px para LinkedIn) NO se toca: aquí vive la
//     versión web responsiva.
//   - copia el HTML a public/blog/ y le aplica los metadatos SEO aprobados por el
//     titular (título ≤60 / descripción ≤160) al <title>, og:title, description y
//     og:description
//   - ajusta og:url / og:image / canonical hacia el sitio y añade metadatos
//     sociales de refuerzo (og:type, og:site_name, og:locale, 1200×630, Twitter)
//   - inyecta (idempotente) la barra de regreso a /recursos, un JSON-LD Article y
//     el script de refuerzo en runtime (ver scripts/lib/site-inject.mjs)
//   - usa la vista previa 1200×630 que acompañe a la publicación
//     ('<archivo>-preview.png') o, si no existe, genera una tarjeta branded
//   - genera src/data/blog.json (ordenado por fecha desc)
//
// Igual que las guías, el build de Vercel solo sirve lo commiteado en public/:
// este script se corre en local y su salida se agrega al commit.
//
// Uso: npm run blog   → luego commit + push a main (auto-deploy en Vercel).
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import { SITE_URL } from '../src/data/site.js'
import { injectStaticBar, injectRuntimeEnsure } from './lib/site-inject.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'blog')
mkdirSync(outDir, { recursive: true })

// Carpeta fuente de las publicaciones. Sobrescribible con BLOG_SRC.
const SRC_DIR = process.env.BLOG_SRC || join(root, 'content', 'blog')

const BACK = { href: `${SITE_URL}/recursos`, label: 'Volver a Recursos' }

// Publicaciones del blog. Para agregar una: deja el HTML en content/blog y añade
// aquí su entrada. Nada se inventa: cada dato proviene de la publicación o de esta config.
//   file        nombre exacto del archivo .html en la carpeta fuente
//   dateISO     fecha de publicación (AAAA-MM-DD)
//   dateLabel   etiqueta legible que se muestra en la tarjeta de /recursos
//   title       título SEO aprobado (≤60 caracteres, con marca)
//   description descripción SEO aprobada (≤160 caracteres)
//   cardTitle   título mostrado en la vista previa generada (si no hay PNG propio)
//   eyebrow     ceja de la vista previa generada
const POSTS = [
  {
    file: '2026-10-19-tres-descuidos-fiscales.html',
    dateISO: '2026-10-19',
    dateLabel: '19 de octubre de 2026',
    title: 'Tres descuidos fiscales que pueden salirle caros | DSouza',
    description:
      'Timbrar tarde, no conciliar el CFDI y no atender los avisos del buzón tributario: qué cuidar, plazos y fundamento legal. Carrusel de DSouza.',
    cardTitle: 'Tres descuidos fiscales que pueden salirle caros',
    eyebrow: 'BLOG · CUMPLIMIENTO FISCAL',
  },
  {
    file: '2026-10-22-constancia-situacion-fiscal.html',
    dateISO: '2026-10-22',
    dateLabel: '22 de octubre de 2026',
    title: 'Constancia fiscal: no es requisito para facturar | DSouza',
    description:
      'Desde 2026 condicionar el CFDI a la Constancia de Situación Fiscal es infracción: fundamento, multa y para qué sirve. Carrusel de DSouza.',
    cardTitle: 'Constancia fiscal: no es requisito para facturar',
    eyebrow: 'BLOG · FACTURACIÓN 2026',
  },
  {
    file: '2026-10-23-gastos-deducibles.html',
    dateISO: '2026-10-23',
    dateLabel: '23 de octubre de 2026',
    title: 'Un CFDI no basta para deducir un gasto | DSouza',
    description:
      'Tener el CFDI no basta: el gasto debe ser estrictamente indispensable (LISR art. 27). Requisitos, criterio 6/ISR/PI y qué revisar. Carrusel de DSouza.',
    cardTitle: 'Un CFDI no basta para deducir un gasto',
    eyebrow: 'BLOG · DEDUCCIONES',
  },
]

const escAttr = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
const escXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// --- Metadatos (idénticos en criterio a sync-comunicados.mjs) ---------------
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
function setCanonical(html, url) {
  const a = /(<link\s[^>]*rel=["']canonical["'][^>]*href=)["'][^"']*["']/i
  const b = /(<link\s[^>]*href=)["'][^"']*["']([^>]*rel=["']canonical["'])/i
  if (a.test(html)) return html.replace(a, `$1"${url}"`)
  if (b.test(html)) return html.replace(b, `$1"${url}"$2`)
  return html.replace(/<\/head>/i, `<link rel="canonical" href="${url}">\n</head>`)
}
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
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return html.replace(/<\/head>/i, `<script type="application/ld+json" data-dsz="article">${json}</script>\n</head>`)
}

// --- Vista previa branded 1200×630 (misma familia visual que los boletines) ---
function wrap(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/)
  const lines = []
  let cur = ''
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) {
      lines.push(cur.trim())
      cur = w
      if (lines.length === maxLines) break
    } else cur = (cur + ' ' + w).trim()
  }
  if (lines.length < maxLines && cur) lines.push(cur.trim())
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length)
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[.,;:]?$/, '…')
  return lines
}
function previewSvg(g) {
  const titleLines = wrap(g.cardTitle || g.title, 24, 3)
  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="90" y="${318 + i * 74}" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="700" fill="#FFFFFF">${escXml(line)}</text>`
    )
    .join('\n  ')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0A2540" />
  <circle cx="1040" cy="120" r="260" fill="#00B8D9" opacity="0.10" />
  <circle cx="150" cy="560" r="200" fill="#00B8D9" opacity="0.08" />
  <rect x="90" y="86" width="96" height="96" rx="20" fill="#00B8D9" />
  <text x="138" y="152" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="700" fill="#0A2540" text-anchor="middle">D</text>
  <text x="206" y="150" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="700" fill="#FFFFFF">DSouza Consultores Fiscales</text>
  <text x="92" y="232" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="#00B8D9">${escXml(g.eyebrow || 'BLOG')}</text>
  ${titleSvg}
  <rect x="92" y="548" width="56" height="6" rx="3" fill="#00B8D9" />
  <text x="92" y="592" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#8FA3B5">${escXml(g.dateLabel)}</text>
  <text x="1110" y="592" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#8FA3B5" text-anchor="end">dsouzaconsultores.mx</text>
</svg>`
}

// --- Sincronización ---------------------------------------------------------
if (!existsSync(SRC_DIR)) throw new Error(`No existe la carpeta fuente del blog: ${SRC_DIR}`)

const manifest = []
for (const g of POSTS) {
  const srcHtml = join(SRC_DIR, g.file)
  if (!existsSync(srcHtml)) throw new Error(`No está en la carpeta fuente (content/blog): ${g.file}`)

  const previewName = g.file.replace(/\.html$/i, '-preview.png')
  const url = `${SITE_URL}/blog/${g.file}`
  const img = `${SITE_URL}/blog/${previewName}`

  let html = readFileSync(srcHtml, 'utf8')
  html = applySeoMeta(html, g.title, g.description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:image', img)
  html = ensureSocialMeta(html, { title: g.title, description: g.description, img })
  html = setCanonical(html, url)

  const article = articleData({ title: g.title, description: g.description, dateISO: g.dateISO, url, img })
  html = injectArticle(html, article)
  html = injectStaticBar(html, BACK)
  html = injectRuntimeEnsure(html, {
    canonical: url,
    back: BACK,
    ld: article,
    title: g.title,
    description: g.description,
    force: true,
  })

  writeFileSync(join(outDir, g.file), html)

  // Vista previa: usa el PNG propio si viene junto a la publicación; si no, se genera.
  const ownPreview = join(SRC_DIR, previewName)
  let previewFromSource = false
  if (existsSync(ownPreview)) {
    writeFileSync(join(outDir, previewName), readFileSync(ownPreview))
    previewFromSource = true
  } else {
    const png = new Resvg(previewSvg(g), { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
    writeFileSync(join(outDir, previewName), png)
  }

  manifest.push({
    slug: g.file,
    title: g.title,
    description: g.description,
    dateISO: g.dateISO,
    dateLabel: g.dateLabel,
    preview: `/blog/${previewName}`,
    previewFromSource,
    sizeKB: Math.round(html.length / 1024),
  })
  console.log(`✓ ${g.file}${previewFromSource ? '' : '  (preview generada)'}`)
}

manifest.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
writeFileSync(join(root, 'src', 'data', 'blog.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`OK → ${manifest.length} publicación(es) en public/blog/ y src/data/blog.json`)
