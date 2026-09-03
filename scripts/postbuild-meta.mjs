// Post-build: genera dist/<ruta>/index.html con el <head> correcto por URL
// (title, description, canonical, robots, Open Graph y Twitter), a partir de
// la fuente única src/data/seoMeta.js. Así los crawlers y scrapers sociales
// que NO ejecutan JavaScript ven los metadatos correctos de cada página.
// También genera dist/404.html (noindex): Vercel la sirve con HTTP 404 real
// para cualquier ruta inexistente (ya no hay rewrite global a index.html), y
// añade el JSON-LD FAQPage SOLO en Inicio, donde el bloque de FAQ es visible.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SEO_META } from '../src/data/seoMeta.js'
import { SITE_URL, FAQS } from '../src/data/site.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;')

// Reemplaza el atributo content del primer <meta> que contenga `key`.
function setMeta(html, key, value) {
  return html.replace(/<meta[\s\S]*?\/>/g, (tag) =>
    tag.includes(key) ? tag.replace(/content="[\s\S]*?"/, `content="${esc(value)}"`) : tag
  )
}

// FAQPage con las mismas preguntas/respuestas que se muestran en Inicio (src/data/site.js).
function faqJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  // `<` escapado para que ningún texto pueda cerrar el <script>.
  return `    <script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>\n`
}

// ItemList de VideoObject para /recursos (Videoteca): mismos datos que se
// muestran en la página (título, descripción, fecha, miniatura, URL del video).
function videosJsonLd() {
  let data
  try {
    data = JSON.parse(readFileSync(join(root, 'src', 'data', 'videos.json'), 'utf8'))
  } catch {
    return ''
  }
  if (!data?.videos?.length) return ''
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Videoteca DSouza',
    itemListElement: data.videos.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VideoObject',
        name: v.title,
        description: v.description,
        thumbnailUrl: `${SITE_URL}${v.thumb}`,
        uploadDate: v.dateISO,
        contentUrl: v.url,
        embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
        url: v.url,
        publisher: { '@type': 'Organization', name: 'DSouza Consultores Fiscales', url: SITE_URL },
      },
    })),
  }
  return `    <script type="application/ld+json">${JSON.stringify(list).replace(/</g, '\\u003c')}</script>\n`
}

function buildHtml(path) {
  const { title, description, noindex } = SEO_META[path]
  const is404 = path === '/404'
  const url = is404 ? SITE_URL : `${SITE_URL}${path === '/' ? '' : path}`
  let html = template

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name="description"', description)
  html = setMeta(html, 'property="og:title"', title)
  html = setMeta(html, 'property="og:description"', description)
  html = setMeta(html, 'property="og:url"', url)
  html = setMeta(html, 'name="twitter:title"', title)
  html = setMeta(html, 'name="twitter:description"', description)

  // Canonical (no aplica a la página 404) + robots + FAQPage (solo Inicio).
  const extra =
    (is404 ? '' : `    <link rel="canonical" href="${url}" />\n`) +
    `    <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}" />\n` +
    (path === '/' ? faqJsonLd() : '') +
    (path === '/recursos' ? videosJsonLd() : '')
  html = html.replace('</head>', `${extra}  </head>`)
  return html
}

let count = 0
for (const path of Object.keys(SEO_META)) {
  const html = buildHtml(path)
  if (path === '/') {
    writeFileSync(join(dist, 'index.html'), html)
  } else if (path === '/404') {
    writeFileSync(join(dist, '404.html'), html)
  } else {
    const dir = join(dist, path.slice(1))
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
  }
  count++
}
console.log(`OK → metadatos pre-renderizados para ${count} rutas en dist/ (incluye 404.html)`)
