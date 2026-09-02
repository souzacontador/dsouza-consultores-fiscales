// Genera la imagen de vista previa (1200×630 PNG, identidad del sitio) para los
// boletines que NO traen preview en el repo (previewFromRepo: false en
// src/data/boletines.json). Usa solo datos del manifiesto: fecha y descripción.
// Uso: node scripts/generate-boletin-preview.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(readFileSync(join(root, 'src', 'data', 'boletines.json'), 'utf8'))

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Corte de texto en líneas de ~maxChars sin partir palabras (SVG no envuelve).
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/)
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

function svgFor(b) {
  const excerpt = b.description ? wrap(b.description, 58, 2) : []
  const excerptSvg = excerpt
    .map(
      (line, i) =>
        `<text x="92" y="${452 + i * 40}" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#C6D2DE">${esc(line)}</text>`
    )
    .join('\n  ')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0A2540" />
  <circle cx="1040" cy="120" r="260" fill="#00B8D9" opacity="0.10" />
  <circle cx="150" cy="560" r="200" fill="#00B8D9" opacity="0.08" />
  <rect x="90" y="86" width="96" height="96" rx="20" fill="#00B8D9" />
  <text x="138" y="152" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="700" fill="#0A2540" text-anchor="middle">D</text>
  <text x="206" y="150" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="700" fill="#FFFFFF">DSouza Consultores Fiscales</text>
  <text x="92" y="262" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="#00B8D9">BOLETÍN FISCAL SEMANAL</text>
  <text x="90" y="350" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="700" fill="#FFFFFF">${esc(b.dateLabel)}</text>
  ${excerptSvg}
  <g transform="translate(92,540)">
    <circle cx="16" cy="16" r="16" fill="#00B8D9" />
    <circle cx="66" cy="16" r="16" fill="#F5A623" />
    <circle cx="116" cy="16" r="16" fill="#E5484D" />
    <text x="150" y="24" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#8FA3B5">Mapa de riesgo fiscal</text>
  </g>
  <text x="1110" y="574" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#8FA3B5" text-anchor="end">dsouzaconsultores.mx</text>
</svg>`
}

let n = 0
for (const b of manifest) {
  if (b.previewFromRepo) continue
  const out = join(root, 'public', b.preview)
  if (existsSync(out) && process.argv.includes('--keep')) continue
  const png = new Resvg(svgFor(b), { fitTo: { mode: 'width', value: 1200 }, font: { loadSystemFonts: true }, background: '#0A2540' })
    .render()
    .asPng()
  writeFileSync(out, png)
  console.log(`✓ ${b.preview} (${(png.length / 1024).toFixed(0)} KB)`)
  n++
}
console.log(`OK → ${n} preview(s) generada(s)`)
