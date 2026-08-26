// Post-build: genera dist/<ruta>/index.html con el <head> correcto por URL
// (title, description, canonical, robots, Open Graph y Twitter), a partir de
// la fuente única src/data/seoMeta.js. Así los crawlers y scrapers sociales
// que NO ejecutan JavaScript ven los metadatos correctos de cada página.
// Vercel sirve estos archivos estáticos antes de aplicar el rewrite SPA.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SEO_META } from '../src/data/seoMeta.js'
import { SITE_URL } from '../src/data/site.js'

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

function buildHtml(path) {
  const { title, description, noindex } = SEO_META[path]
  const url = `${SITE_URL}${path === '/' ? '' : path}`
  let html = template

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name="description"', description)
  html = setMeta(html, 'property="og:title"', title)
  html = setMeta(html, 'property="og:description"', description)
  html = setMeta(html, 'property="og:url"', url)
  html = setMeta(html, 'name="twitter:title"', title)
  html = setMeta(html, 'name="twitter:description"', description)

  // Canonical + robots (no existen en la plantilla; se insertan).
  const extra =
    `    <link rel="canonical" href="${url}" />\n` +
    `    <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}" />\n`
  html = html.replace('</head>', `${extra}  </head>`)
  return html
}

let count = 0
for (const path of Object.keys(SEO_META)) {
  if (path === '/404') continue // el 404 lo maneja el SPA con noindex en runtime
  const html = buildHtml(path)
  if (path === '/') {
    writeFileSync(join(dist, 'index.html'), html)
  } else {
    const dir = join(dist, path.slice(1))
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
  }
  count++
}
console.log(`OK → metadatos pre-renderizados para ${count} rutas en dist/`)
