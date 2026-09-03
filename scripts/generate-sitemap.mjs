// Genera dist/sitemap.xml en cada build a partir de:
//   - las rutas indexables de src/data/seoMeta.js (sin noindex, sin excluidas)
//   - src/data/boletines.json   (una URL por boletín, con lastmod)
//   - src/data/calculadoras.json (una URL por calculadora, con barra final)
// No hay sitemap manual: al publicar un boletín o calculadora nuevos basta
// con correr el sync correspondiente y hacer push.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE_URL } from '../src/data/site.js'
import { SEO_META } from '../src/data/seoMeta.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'))

// Rutas del sitio que NO van al sitemap aunque sean indexables (páginas utilitarias).
const EXCLUDE = new Set(['/aviso-de-privacidad', '/404'])

// Prioridad y frecuencia por ruta estática.
const ROUTES = {
  '/': { priority: 1.0, changefreq: 'monthly' },
  '/servicios': { priority: 0.9, changefreq: 'monthly' },
  '/nosotros': { priority: 0.8, changefreq: 'monthly' },
  '/recursos': { priority: 0.8, changefreq: 'weekly' },
  '/calculadoras': { priority: 0.8, changefreq: 'monthly' },
  '/contacto': { priority: 0.8, changefreq: 'monthly' },
  '/testimonios': { priority: 0.6, changefreq: 'monthly' },
}

const entries = []

for (const [path, meta] of Object.entries(SEO_META)) {
  if (meta.noindex || EXCLUDE.has(path)) continue
  const cfg = ROUTES[path] || { priority: 0.5, changefreq: 'monthly' }
  entries.push({ loc: `${SITE_URL}${path === '/' ? '/' : path}`, ...cfg })
}

for (const c of read('src/data/calculadoras.json')) {
  entries.push({ loc: `${SITE_URL}${c.path}`, priority: 0.7, changefreq: 'monthly' })
}

// Boletines ya vienen ordenados del más reciente al más antiguo.
read('src/data/boletines.json').forEach((b, i) => {
  entries.push({
    loc: `${SITE_URL}/boletines/${b.slug}`,
    lastmod: b.dateISO,
    priority: i === 0 ? 0.7 : i < 4 ? 0.6 : 0.5,
  })
})

// Comunicados (mismo criterio que boletines: ordenados del más reciente al más antiguo).
read('src/data/comunicados.json').forEach((c, i) => {
  entries.push({
    loc: `${SITE_URL}/comunicados/${c.slug}`,
    lastmod: c.dateISO,
    priority: i === 0 ? 0.7 : i < 4 ? 0.6 : 0.5,
  })
})

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<!-- Generado automáticamente por scripts/generate-sitemap.mjs en cada build. No editar a mano. -->\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n` +
        (e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : '') +
        (e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>\n` : '') +
        `    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`

writeFileSync(join(root, 'dist', 'sitemap.xml'), xml)
console.log(`OK → dist/sitemap.xml con ${entries.length} URLs`)
