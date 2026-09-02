// Sincroniza las calculadoras desde el repo público souzacontador/dsouza-app:
//   - descarga cada <slug>/index.html (autocontenido) a public/calculadoras/<slug>/index.html
//   - agrega SOLO un <link rel="canonical"> apuntando al sitio; el contenido no se toca
//   - genera src/data/calculadoras.json con el título/descripción que el propio
//     repo usa en su página menú (index.html raíz) — nada se inventa.
// Uso: npm run calculadoras   → luego commit + push (auto-deploy en Vercel).
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SITE_URL } from '../src/data/site.js'

const RAW = 'https://raw.githubusercontent.com/souzacontador/dsouza-app/main'
const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Textos tomados literalmente de las tarjetas del menú raíz de dsouza-app.
// Para agregar una calculadora nueva: súbela a dsouza-app en su carpeta y
// añade aquí su slug + los textos de su tarjeta.
const CALCULADORAS = [
  {
    slug: 'iva-retenciones',
    title: 'Calculadora de IVA y Retenciones',
    description:
      'Desglose de IVA, retención de ⅔ de IVA e ISR por régimen fiscal y tipo de operación. Cálculo desde el gasto o desde el monto pagado.',
    icon: 'calculator',
  },
  {
    slug: 'equivalencias-dlls',
    title: 'Equivalencias en Dólares (USD)',
    description:
      'Tipo de cambio USD/MXN aplicable a cada día de 2026, con conversión de montos, gráfica de evolución y cierres mensuales.',
    icon: 'currency',
  },
]

const manifest = []
for (const c of CALCULADORAS) {
  const res = await fetch(`${RAW}/${c.slug}/index.html`)
  if (!res.ok) throw new Error(`No se pudo descargar ${c.slug}: HTTP ${res.status}`)
  let html = await res.text()

  const url = `${SITE_URL}/calculadoras/${c.slug}/`
  if (!/rel=["']canonical["']/i.test(html)) {
    html = html.replace(/<\/head>/i, `<link rel="canonical" href="${url}">\n</head>`)
  }

  const dir = join(root, 'public', 'calculadoras', c.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)

  const pageTitle = (html.match(/<title>([\s\S]*?)<\/title>/i) || [null, null])[1]?.trim() || null
  manifest.push({ ...c, path: `/calculadoras/${c.slug}/`, pageTitle, sizeKB: Math.round(html.length / 1024) })
  console.log(`✓ ${c.slug} (${Math.round(html.length / 1024)} KB)`)
}

writeFileSync(join(root, 'src', 'data', 'calculadoras.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`OK → ${manifest.length} calculadoras en public/calculadoras/ y src/data/calculadoras.json`)
