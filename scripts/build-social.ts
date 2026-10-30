/**
 * Draws the repository's GitHub social preview, `.github/social-preview.png`, at GitHub's
 * recommended 1280 by 640: the same framed card as the site's social images (`lib/og.tsx`),
 * with hairline rails and rules, crosshairs where they cross, the mark and wordmark, then the
 * tagline centered between the rules. GitHub has no API for this image, so upload the file under Settings, General, Social
 * preview. Run with `pnpm build:social`; text uses Geist when installed.
 */
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'
import { glyphPath } from '../lib/mark.ts'
import { site } from '../lib/site.ts'

const width = 1280
const height = 640
const colors = { background: '#0f0f0f', line: '#252525', mark: '#8f8f8f', ink: '#ededed' }
const sans = "Geist, 'Helvetica Neue', Helvetica, Arial, sans-serif"
const left = 72
const right = width - 72
const top = 120
const bottom = height - 80
// First tagline baseline that centers the tagline and description between the rules.
const baseline = (top + bottom) / 2 - 50

/** The tagline on two lines, broken at the word nearest its middle. */
function twoLines(text: string): [string, string] {
  const words = text.split(' ')
  let best = 1
  for (let index = 1; index < words.length; index++) {
    const head = words.slice(0, index).join(' ').length
    const bestHead = words.slice(0, best).join(' ').length
    if (Math.abs(head - text.length / 2) < Math.abs(bestHead - text.length / 2)) best = index
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
}

const [first, second] = twoLines(site.description)
// The same description as the site's root social card, app/og/image.png/route.tsx.
const description =
  'Typed events, Standard Webhooks signing, and transactional publish on PostgreSQL.'

const plus = (x: number, y: number) =>
  `<path d="M${x + 0.5} ${y - 8}V${y + 9}M${x - 8} ${y + 0.5}H${x + 9}" stroke="${colors.mark}"/>`

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${colors.background}"/>
  <path d="M${left + 0.5} 0V${height}M${right + 0.5} 0V${height}M0 ${top + 0.5}H${width}M0 ${bottom + 0.5}H${width}" stroke="${colors.line}"/>
  ${plus(left, top)}${plus(right, top)}${plus(left, bottom)}${plus(right, bottom)}
  <path d="${glyphPath(left + 40, 44, 36)}" fill="${colors.ink}"/>
  <text x="${left + 96}" y="72" font-family="${sans}" font-size="26" font-weight="600" letter-spacing="2" fill="${colors.ink}">${site.name.toUpperCase()}</text>
  <text x="${right - 40}" y="72" text-anchor="end" font-family="${sans}" font-size="22" letter-spacing="3" fill="${colors.mark}">${new URL(site.url).host.toUpperCase()}</text>
  <text font-family="${sans}" font-size="72" font-weight="500" letter-spacing="-2" fill="${colors.ink}">
    <tspan x="${left + 40}" y="${baseline}">${first}</tspan>
    <tspan x="${left + 40}" y="${baseline + 80}">${second}</tspan>
  </text>
  <text x="${left + 40}" y="${baseline + 146}" font-family="${sans}" font-size="25" fill="${colors.mark}">${description}</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
await writeFile(new URL('../../../.github/social-preview.png', import.meta.url), png)
console.log('Wrote .github/social-preview.png; upload it under Settings, General, Social preview')
