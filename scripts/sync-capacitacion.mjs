// Sincroniza los CURSOS de /capacitacion (flyers HTML autocontenidos) hacia el sitio:
//   - cada curso vive en una carpeta LOCAL con su flyer .html y un evento.json
//     (título, fechas, horario, modalidad, enlace de inscripción). De ahí salen
//     TODOS los datos de la tarjeta: este script no inventa ni duplica texto.
//   - copia el flyer a public/capacitacion/<slug>.html y le ajusta og:url /
//     og:image / canonical hacia el sitio; añade la barra de regreso a /capacitacion
//     (ver scripts/lib/site-inject.mjs). El título y la descripción del flyer se
//     respetan tal como vienen de la fuente.
//   - genera la vista previa 1200×630 con la identidad de la marca (tipo, título,
//     fecha y modalidad del evento) en public/capacitacion/<slug>-preview.png
//   - genera src/data/capacitacion.json (ordenado por inicio, más reciente primero)
//
// "Próximo" vs "finalizado" NO se guarda aquí: la página lo calcula con la fecha
// de fin (finISO) al renderizar, para que un curso que concluye entre despliegues
// pase a "Finalizado" sin volver a correr este script.
//
// Para agregar un curso: deja su carpeta (flyer .html + evento.json) en el disco y
// añade una entrada a CURSOS. Uso: npm run capacitacion → commit + push a main.
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { homedir } from 'node:os'
import { Resvg } from '@resvg/resvg-js'
import { SITE_URL } from '../src/data/site.js'
import { injectStaticBar, injectRuntimeEnsure } from './lib/site-inject.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'capacitacion')
mkdirSync(outDir, { recursive: true })

const BACK = { href: `${SITE_URL}/capacitacion`, label: 'Volver a Capacitación' }

// Carpeta de cursos (autoría local). Sobrescribible con CAPACITACION_SRC.
const BASE_DIR =
  process.env.CAPACITACION_SRC ||
  join(homedir(), 'OneDrive - DSouza Consultores', 'Documentos', 'CURSOS DSV')

// Cursos publicados. Cada entrada:
//   dir      carpeta del curso (relativa a BASE_DIR) con el flyer y su evento.json
//   file     nombre exacto del flyer .html dentro de esa carpeta
//   slug     nombre público del archivo en /capacitacion/ (sin .html)
//   finISO   fin del último día del curso (ISO 8601 con zona): a partir de ahí se
//            considera "finalizado" y la inscripción se desactiva
const CURSOS = [
  {
    dir: join('2026', '11 Noviembre 2026', 'Flyer_Jornada_2027'),
    file: 'Flyer_Jornada_Actualizacion_Fiscal_2027.html',
    slug: 'jornada-actualizacion-fiscal-cierre-2026-perspectivas-2027',
    finISO: '2026-11-25T19:00:00-07:00',
  },
  {
    dir: join('2026', '11 Noviembre 2026', 'Flyer_Sesion1_28oct'),
    file: 'Flyer_Sesion1_El_SAT_ya_sabe_web.html',
    slug: 'el-sat-ya-sabe-y-usted-sesion-1',
    finISO: '2026-10-28T19:00:00-07:00',
  },
]

const escAttr = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
const escXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function setMeta(html, attr, key, value) {
  if (value == null) return html
  const a = new RegExp(`(<meta\\s[^>]*${attr}=["']${key}["'][^>]*content=)["'][^"']*["']`, 'i')
  const b = new RegExp(`(<meta\\s[^>]*content=)["'][^"']*["']([^>]*${attr}=["']${key}["'])`, 'i')
  if (a.test(html)) return html.replace(a, `$1"${escAttr(value)}"`)
  if (b.test(html)) return html.replace(b, `$1"${escAttr(value)}"$2`)
  return html.replace(/<\/head>/i, `<meta ${attr}="${key}" content="${escAttr(value)}">\n</head>`)
}
function setCanonical(html, url) {
  const a = /(<link\s[^>]*rel=["']canonical["'][^>]*href=)["'][^"']*["']/i
  const b = /(<link\s[^>]*href=)["'][^"']*["']([^>]*rel=["']canonical["'])/i
  if (a.test(html)) return html.replace(a, `$1"${url}"`)
  if (b.test(html)) return html.replace(b, `$1"${url}"$2`)
  return html.replace(/<\/head>/i, `<link rel="canonical" href="${url}">\n</head>`)
}
const metaContent = (html, attr, key) =>
  html.match(new RegExp(`<meta\\s[^>]*${attr}=["']${key}["'][^>]*content=["']([^"']*)["']`, 'i'))?.[1]

// --- Vista previa branded 1200×630 (misma familia visual que las guías) -------
function wrap(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/)
  const lines = []
  let cur = ''
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) {
      lines.push(cur.trim())
      cur = w
    } else cur = (cur + ' ' + w).trim()
  }
  if (cur) lines.push(cur.trim())
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[.,;:]?$/, '…')
    return kept
  }
  return lines
}
function previewSvg(ev) {
  const titleLines = wrap(ev.titulo, 26, 3)
  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="90" y="${300 + i * 70}" font-family="Georgia, 'Times New Roman', serif" font-size="56" font-weight="700" fill="#FFFFFF">${escXml(line)}</text>`
    )
    .join('\n  ')
  const fechaLines = wrap(ev.fecha, 68, 2)
  const fechaSvg = fechaLines
    .map(
      (line, i) =>
        `<text x="92" y="${540 - (fechaLines.length - 1 - i) * 38}" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#C4CBD1">${escXml(line)}</text>`
    )
    .join('\n  ')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0A2540" />
  <circle cx="1040" cy="120" r="260" fill="#00B8D9" opacity="0.10" />
  <circle cx="150" cy="560" r="200" fill="#00B8D9" opacity="0.08" />
  <rect x="90" y="70" width="84" height="84" rx="18" fill="#00B8D9" />
  <text x="132" y="130" font-family="Georgia, 'Times New Roman', serif" font-size="54" font-weight="700" fill="#0A2540" text-anchor="middle">D</text>
  <text x="194" y="124" font-family="Georgia, 'Times New Roman', serif" font-size="36" font-weight="700" fill="#FFFFFF">DSouza Consultores Fiscales</text>
  <text x="92" y="208" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="#00B8D9">${escXml(String(ev.tipo).toUpperCase())}</text>
  ${titleSvg}
  ${fechaSvg}
  <text x="92" y="586" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="700" fill="#00B8D9">${escXml(ev.modalidad)}</text>
  <text x="1110" y="586" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#8FA3B5" text-anchor="end">dsouzaconsultores.mx</text>
</svg>`
}

// --- Sincronización ---------------------------------------------------------
const REQUIRED = ['tipo', 'titulo', 'fecha', 'horario', 'modalidad', 'fecha_iso', 'enlace']
const manifest = []

for (const c of CURSOS) {
  const dir = join(BASE_DIR, c.dir)
  const srcHtml = join(dir, c.file)
  const srcJson = join(dir, 'evento.json')
  if (!existsSync(srcHtml)) throw new Error(`No está el flyer: ${srcHtml}`)
  if (!existsSync(srcJson)) throw new Error(`No está evento.json: ${srcJson}`)
  if (Number.isNaN(Date.parse(c.finISO))) throw new Error(`finISO inválido en ${c.slug}`)

  const { evento: ev } = JSON.parse(readFileSync(srcJson, 'utf8'))
  for (const k of REQUIRED) if (!ev?.[k]) throw new Error(`evento.json de ${c.slug} no trae "${k}"`)
  if (Number.isNaN(Date.parse(ev.fecha_iso))) throw new Error(`fecha_iso inválida en ${c.slug}`)

  const fileName = `${c.slug}.html`
  const previewName = `${c.slug}-preview.png`
  const url = `${SITE_URL}/capacitacion/${fileName}`
  const img = `${SITE_URL}/capacitacion/${previewName}`

  let html = readFileSync(srcHtml, 'utf8')
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim()
  const description = metaContent(html, 'name', 'description')
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:image', img)
  html = setMeta(html, 'property', 'og:image:width', '1200')
  html = setMeta(html, 'property', 'og:image:height', '630')
  html = setMeta(html, 'property', 'og:site_name', 'DSouza Consultores Fiscales')
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image')
  html = setMeta(html, 'name', 'twitter:image', img)
  html = setCanonical(html, url)
  html = injectStaticBar(html, BACK)
  html = injectRuntimeEnsure(html, { canonical: url, back: BACK, title, description })
  writeFileSync(join(outDir, fileName), html)

  const png = new Resvg(previewSvg(ev), { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
  writeFileSync(join(outDir, previewName), png)

  manifest.push({
    slug: fileName,
    tipo: ev.tipo,
    title: ev.titulo,
    fecha: ev.fecha,
    horario: ev.horario,
    modalidad: ev.modalidad,
    startISO: ev.fecha_iso,
    endISO: c.finISO,
    enrollUrl: ev.enlace,
    preview: `/capacitacion/${previewName}`,
  })
  console.log(`✓ ${c.slug}`)
}

manifest.sort((a, b) => (a.startISO < b.startISO ? 1 : -1))
writeFileSync(join(root, 'src', 'data', 'capacitacion.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`OK → ${manifest.length} curso(s) en public/capacitacion/ y src/data/capacitacion.json`)
