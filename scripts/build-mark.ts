/**
 * Regenerates the static assets derived from `lib/mark.ts`: `app/icon.svg`, `app/favicon.ico`,
 * and, if it does not exist yet, `public/readme/mark-square.png` (see `readme-asset.ts`).
 * Run with `pnpm build:mark` after changing the mark geometry.
 */
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'
import { brand, markSvg } from '../lib/mark.ts'
import { writeReadmeAsset } from './readme-asset.ts'

const root = new URL('../', import.meta.url)
const svg = markSvg(brand)

/** Rasterizes the 32-unit grid to `size` pixels. */
function render(source: string, size: number) {
  return sharp(Buffer.from(source), { density: (72 * size) / 32 }).resize(size, size)
}

/** Wraps PNG images in an ICO container, one directory entry per image. */
function ico(images: { size: number; png: Buffer }[]) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)
  const entries = Buffer.alloc(16 * images.length)
  let offset = header.length + entries.length
  images.forEach(({ size, png }, i) => {
    const entry = entries.subarray(i * 16)
    entry.writeUInt8(size === 256 ? 0 : size, 0)
    entry.writeUInt8(size === 256 ? 0 : size, 1)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(offset, 12)
    offset += png.length
  })
  return Buffer.concat([header, entries, ...images.map(({ png }) => png)])
}

await writeFile(new URL('app/icon.svg', root), `${svg}\n`)

const icoImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, png: await render(svg, size).png().toBuffer() })),
)
await writeFile(new URL('app/favicon.ico', root), ico(icoImages))

console.log('Wrote app/icon.svg and app/favicon.ico')

// The READMEs show the mark at 56px; this is the tile at 3x.
await writeReadmeAsset('mark-square.png', await render(svg, 168).png().toBuffer())
