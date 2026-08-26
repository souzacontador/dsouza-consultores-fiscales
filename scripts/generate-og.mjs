// Genera public/og-image.png (1200×630) a partir de scripts/og-image.svg.
// Las redes sociales no renderizan SVG en previews; el PNG sí.
// Ejecutar: node scripts/generate-og.mjs  (o `npm run og`)
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'

const root = dirname(fileURLToPath(import.meta.url))
const svg = readFileSync(join(root, 'og-image.svg'), 'utf8')

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true }, // Georgia/Arial del sistema
  background: '#0A2540',
})

const png = resvg.render().asPng()
const out = join(root, '..', 'public', 'og-image.png')
writeFileSync(out, png)
console.log(`OK → ${out} (${(png.length / 1024).toFixed(1)} KB)`)
