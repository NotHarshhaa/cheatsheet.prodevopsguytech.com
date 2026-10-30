import { ImageResponse } from 'next/og'
import { Mark } from '@/components/mark'
import { brand } from '@/lib/mark'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** iOS rounds the corners itself, so the tile fills the whole canvas. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Mark tile={brand.tile} ink={brand.ink} width={180} height={180} />
    </div>,
    size,
  )
}
