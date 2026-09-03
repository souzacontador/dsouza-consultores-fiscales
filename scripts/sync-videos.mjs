// Sincroniza la Videoteca desde el feed RSS público del canal de YouTube del
// titular (sin API ni clave):
//   - lee los videos más recientes del feed (YouTube expone hasta 15)
//   - normaliza los títulos/descripciones escritos con "negritas Unicode"
//     (𝗔𝗥𝗧 → ART) para que sean texto real: indexable y legible por lectores
//     de pantalla
//   - excluye los ids listados en EXCLUIR (p. ej. repeticiones) y aplica los
//     títulos/descripciones SEO aprobados en SEO_OVERRIDE (≤60 / ≤160)
//   - descarga la miniatura de cada video a public/videos/<id>.jpg (así el
//     sitio no depende de terceros al cargar; el reproductor solo se carga al
//     hacer clic)
//   - genera src/data/videos.json (ordenado del más reciente al más antiguo)
// Nada se inventa: título, descripción y fecha provienen del feed o de esta
// configuración aprobada por el titular.
//
// Uso: npm run videos   → luego commit + push (auto-deploy en Vercel).
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const CHANNEL_ID = 'UCk1VDE4U-PknfkLM4D7bY5Q' // C.P. Daniel Souza Vazquez (@c.p.danielsouzavazquez5022)
const CHANNEL_URL = 'https://www.youtube.com/@c.p.danielsouzavazquez5022'
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
const UA = 'dsouza-site-sync'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'videos')
mkdirSync(outDir, { recursive: true })

// Videos del feed que NO se publican (ids de YouTube). Motivo entre comentarios.
const EXCLUIR = new Set([
  '-MtGwSqg_cs', // Reforma INFONAVIT 2025 y SUA 3.6.7 — repetido (se conserva 9lKGtKdYoPA)
  'LoutznqnfLE', // Reforma INFONAVIT 2025 y SUA 3.6.7 — repetido (se conserva 9lKGtKdYoPA)
])

// Videos adicionales por id (más antiguos que los 15 del feed). Se declaran a
// mano con título, descripción y fecha reales del video.
//   { id, title, description, dateISO }
const EXTRA = []

// Títulos y descripciones SEO aprobados por el titular (≤60 / ≤160), redactados
// únicamente a partir de lo que cada video dice en YouTube. Si un video no está
// aquí, se usa su título/descripción del feed normalizados.
const SEO_OVERRIDE = {
  IBrPwcTWJ90: {
    title: 'Art. 49-Bis CFF: visita exprés del SAT por CFDI falsos',
    description:
      'Visita exprés del SAT por CFDI presuntamente falsos (art. 49-Bis CFF): diferencias con el 69-B, cómo funciona, qué pruebas conservar y consecuencias.',
  },
  ZVSRseifqWY: {
    title: 'Cálculo anual de sueldos y salarios 2025',
    description:
      'Obligación patronal de cierre: cuadrar el ISR anual contra las retenciones mensuales. Si no se hace bien, la nómina puede resultar no deducible.',
  },
  GomghN95ggw: {
    title: 'Aguinaldo 2025: puntos importantes',
    description: 'Repaso de los puntos clave de esta obligación patronal de fin de año.',
  },
  QmFvulEze_A: {
    title: 'Carta Porte: la burbuja de los 30 km',
    description:
      'Casos de excepción para no incluir el complemento Carta Porte en el transporte local de bienes y servicios.',
  },
  f3GrOieBqmI: {
    title: 'Correos masivos del SAT a RESICO 2022',
    description: 'Si migraste a RESICO en 2022 y te están llegando correos del SAT, este video te explica el tema.',
  },
  PiYsgfNen6Y: {
    title: 'Factura con PUE sin cobrar antes de fin de mes: cuidado',
    description:
      '¿Emitiste una factura con método de pago PUE y no te pagaron antes de fin de mes? Cuidado con el SAT.',
  },
  '9lKGtKdYoPA': {
    title: 'Reforma INFONAVIT 2025 y nuevo SUA 3.6.7',
    description:
      'Qué cambió en INFONAVIT para 2025, implicaciones en cálculos y reportes, ajustes clave del SUA 3.6.7 y recomendaciones de cumplimiento para patrones y despachos.',
  },
  LYmt4zFRQS4: {
    title: '5 errores frecuentes al emitir el CFDI 4.0 de ingreso',
    description:
      'Datos del receptor que no coinciden, claves de producto mal elegidas, ObjetoImp, forma vs. método de pago y complemento de pago olvidado: cómo evitarlos.',
  },
  'hn-8enN3s2Q': {
    title: 'DIOT 2024 con el esquema 2025',
    description:
      'Cambios del esquema 2025 y cómo impactan el envío de la DIOT 2024 hacia atrás, tips para evitar errores y un paso a paso del trámite.',
  },
  '348YVx-h6DE': {
    title: 'Salarios variables: aviso del I bimestre 2025 al IMSS',
    description:
      'Fecha límite 7 de marzo de 2025 (efectos al 1 de marzo) para los avisos de modificación por elementos variables, y el efecto del aniversario laboral en el SBC.',
  },
  KVoJc8HSjBY: {
    title: 'Reforma INFONAVIT y LFT en vivienda social (feb 2025)',
    description:
      'Decreto del DOF del 21-feb-2025: nuevas obligaciones patronales, arrendamiento social con descuento vía nómina, cambios al crédito e impacto en la nómina.',
  },
  K8nDmceSYhQ: {
    title: 'Puntos fiscales de impacto en la nómina, inicio 2025',
    description: 'Los principales puntos a tomar en cuenta al inicio del ejercicio en el pago de tu nómina.',
  },
  ZwN8I3r2WfU: {
    title: 'Recomendaciones para el cierre fiscal del ejercicio',
    description: 'Recomendaciones prácticas para el cierre fiscal del ejercicio.',
  },
}

// "𝗔𝗥𝗧 𝟰𝟵" (símbolos matemáticos en negrita/cursiva) → "ART 49". NFKD descompone
// esos símbolos a sus letras base; NFC vuelve a componer los acentos (é, ñ…).
const normalize = (s) =>
  String(s || '')
    .normalize('NFKD')
    .normalize('NFC')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

const MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const label = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} de ${MES[m - 1]} de ${y}`
}

const pick = (s, re) => (s.match(re) || [])[1] || ''
const feed = await (await fetch(FEED, { headers: { 'User-Agent': UA } })).text()
const entries = [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1])
if (!entries.length) throw new Error('El feed del canal no devolvió videos')

let videos = entries.map((e) => ({
  id: pick(e, /<yt:videoId>([^<]+)/),
  title: normalize(pick(e, /<title>([^<]*)/)),
  description: normalize(pick(e, /<media:description>([\s\S]*?)<\/media:description>/)),
  dateISO: pick(e, /<published>([^<]{10})/),
}))
videos = videos.filter((v) => !EXCLUIR.has(v.id)).concat(EXTRA)

const manifest = []
for (const v of videos) {
  const seo = SEO_OVERRIDE[v.id] || {}
  const title = seo.title || v.title
  const description = seo.description || v.description || v.title

  // Miniatura: la de mayor resolución disponible; se guarda local.
  const thumbOut = join(outDir, `${v.id}.jpg`)
  if (!existsSync(thumbOut)) {
    let buf = null
    for (const q of ['maxresdefault', 'hqdefault']) {
      const r = await fetch(`https://i.ytimg.com/vi/${v.id}/${q}.jpg`, { headers: { 'User-Agent': UA } })
      if (r.ok) {
        buf = Buffer.from(await r.arrayBuffer())
        break
      }
    }
    if (!buf) throw new Error(`Sin miniatura para ${v.id}`)
    writeFileSync(thumbOut, buf)
  }

  manifest.push({
    id: v.id,
    title,
    description,
    dateISO: v.dateISO,
    dateLabel: label(v.dateISO),
    url: `https://www.youtube.com/watch?v=${v.id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`,
    thumb: `/videos/${v.id}.jpg`,
  })
  console.log(`✓ ${v.dateISO}  ${v.id}  ${title}`)
}

manifest.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
writeFileSync(
  join(root, 'src', 'data', 'videos.json'),
  JSON.stringify({ channelUrl: CHANNEL_URL, videos: manifest }, null, 2) + '\n'
)
console.log(`OK → ${manifest.length} video(s) en public/videos/ y src/data/videos.json`)
