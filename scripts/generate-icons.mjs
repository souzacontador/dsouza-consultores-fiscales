// Genera los iconos rasterizados a partir de public/favicon.svg (fuente única
// del logotipo), sin dependencias nuevas (@resvg/resvg-js ya se usa para el OG):
//   public/icon-512.png, public/icon-192.png   → manifest.webmanifest y logo (JSON-LD)
//   public/apple-touch-icon.png (180×180)      → iOS / Safari
//   public/favicon.ico (16/32/48, entradas PNG) → navegadores y buscadores
// Ejecutar: node scripts/generate-icons.mjs  (o `npm run icons`)
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const svg = readFileSync(join(pub, 'favicon.svg'), 'utf8')

const png = (size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng()

for (const [name, size] of [
  ['icon-512.png', 512],
  ['icon-192.png', 192],
  ['apple-touch-icon.png', 180],
]) {
  const buf = png(size)
  writeFileSync(join(pub, name), buf)
  console.log(`OK → public/${name} (${size}px, ${(buf.length / 1024).toFixed(1)} KB)`)
}

// favicon.ico con entradas PNG (formato soportado por todos los navegadores actuales).
function ico(sizes) {
  const images = sizes.map((s) => ({ s, buf: png(s) }))
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reservado
  header.writeUInt16LE(1, 2) // tipo: icono
  header.writeUInt16LE(images.length, 4)
  let offset = 6 + 16 * images.length
  const entries = images.map(({ s, buf }) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(s >= 256 ? 0 : s, 0) // ancho (0 = 256)
    e.writeUInt8(s >= 256 ? 0 : s, 1) // alto
    e.writeUInt8(0, 2) // sin paleta
    e.writeUInt8(0, 3) // reservado
    e.writeUInt16LE(1, 4) // planos
    e.writeUInt16LE(32, 6) // bits por píxel
    e.writeUInt32LE(buf.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += buf.length
    return e
  })
  return Buffer.concat([header, ...entries, ...images.map((i) => i.buf)])
}

const icoBuf = ico([16, 32, 48])
writeFileSync(join(pub, 'favicon.ico'), icoBuf)
console.log(`OK → public/favicon.ico (16/32/48, ${(icoBuf.length / 1024).toFixed(1)} KB)`)
