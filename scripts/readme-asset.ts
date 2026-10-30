/**
 * Writes an image the READMEs link to, once. Published npm READMEs are immutable and keep
 * pointing at whatever was at the URL when they shipped, so an existing file is never replaced:
 * to change a README image, write it under a new name and update both READMEs.
 */
import { existsSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const readme = new URL('../public/readme/', import.meta.url)

export async function writeReadmeAsset(name: string, png: Buffer) {
  const target = fileURLToPath(new URL(name, readme))
  if (existsSync(target)) {
    console.log(`Kept public/readme/${name}: README images never change once written`)
    return
  }
  await writeFile(target, png, { flag: 'wx' })
  console.log(`Wrote public/readme/${name}`)
}
