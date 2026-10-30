import type { ComponentProps } from 'react'
import { glyphPath, mark, type MarkColors } from '@/lib/mark'

type MarkProps = Partial<MarkColors> & Omit<ComponentProps<'svg'>, 'viewBox' | 'fill'>

/**
 * The mark from `lib/mark.ts` as React elements. With a `tile` color it renders the app icon
 * (the glyph drawn in `ink` on a square); without one, the bare glyph in `ink` or the current
 * text color. Colors are plain attributes so the same component renders in `next/og` images.
 */
export function Mark({ tile, ink = 'currentColor', ...props }: MarkProps) {
  const box = tile ? mark.tile.glyph : mark.glyph
  return (
    <svg
      viewBox={mark.viewBox}
      fill="none"
      aria-hidden="true"
      shapeRendering="crispEdges"
      {...props}
    >
      {tile ? <rect width={mark.tile.size} height={mark.tile.size} fill={tile} /> : null}
      <path d={glyphPath(box.x, box.y, box.size)} fill={ink} />
    </svg>
  )
}
