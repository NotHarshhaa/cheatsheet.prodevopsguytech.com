export const mark = {
  viewBox: '0 0 32 32',
  glyph: { x: 4, y: 4, size: 24 },
  tile: { size: 32, glyph: { x: 4, y: 4, size: 24 } },
} as const

export function glyphPath(x: number, y: number, size: number): string {
  return `M${x + 2} ${y + 4} L${x + 10} ${y + 12} L${x + 2} ${y + 20} L${x + 6} ${y + 20} L${x + 14} ${y + 12} L${x + 6} ${y + 4} Z M${x + 14} ${y + 17} H${x + 22} V${y + 20} H${x + 14} Z`
}

export type MarkColors = { tile: string; ink: string }

export const brand: MarkColors = { tile: '#f4a261', ink: '#0a0a0a' }

export function markSvg({ tile, ink }: MarkColors): string {
  const { size, glyph } = mark.tile
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.viewBox}">`,
    `<rect width="${size}" height="${size}" rx="6" fill="${tile}"/>`,
    `<path d="${glyphPath(glyph.x, glyph.y, glyph.size)}" fill="${ink}"/>`,
    '</svg>',
  ].join('')
}
