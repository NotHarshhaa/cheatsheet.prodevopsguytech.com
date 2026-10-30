import { ImageResponse } from 'next/og'
import { Mark } from '@/components/mark'
import { site } from '@/lib/site'

export const ogSize = { width: 1200, height: 630 }

/**
 * Part of every card URL. X, LinkedIn, and Slack cache card images by URL for days, so bump this
 * whenever the card design changes or they keep showing the old one.
 */
export const ogRevision = 3

const line = '#252525'
const mute = '#8f8f8f'

/** A crosshair centered on (x, y), where two frame lines meet. */
function Plus({ x, y }: { x: number; y: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 8,
        top: y - 8,
        width: 17,
        height: 17,
        display: 'flex',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 8,
          top: 0,
          width: 1,
          height: 17,
          backgroundColor: mute,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 8,
          width: 17,
          height: 1,
          backgroundColor: mute,
        }}
      />
    </div>
  )
}

/**
 * A monochrome social card in the site's frame: hairline rails and rules with crosshairs where
 * they cross, the mark and wordmark, then the title centered between the rules. X overlays the
 * page title along the bottom edge, so text stays clear of it. No version number: platforms cache
 * these images for weeks.
 */
export function ogImage({ title, description }: { title: string; description?: string }) {
  const left = 64
  const right = ogSize.width - 64
  const top = 112
  const bottom = ogSize.height - 72
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#0f0f0f',
        color: '#ededed',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left,
          top: 0,
          width: 1,
          height: '100%',
          backgroundColor: line,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: right,
          top: 0,
          width: 1,
          height: '100%',
          backgroundColor: line,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top,
          width: '100%',
          height: 1,
          backgroundColor: line,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: bottom,
          width: '100%',
          height: 1,
          backgroundColor: line,
        }}
      />
      <Plus x={left} y={top} />
      <Plus x={right} y={top} />
      <Plus x={left} y={bottom} />
      <Plus x={right} y={bottom} />

      <div
        style={{
          position: 'absolute',
          left: left + 40,
          right: ogSize.width - right + 40,
          top: 34,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Mark ink="#ededed" width={40} height={40} />
          <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: 2 }}>
            {site.name.toUpperCase()}
          </span>
        </div>
        <span style={{ fontSize: 22, color: mute, letterSpacing: 3 }}>
          {new URL(site.url).host.toUpperCase()}
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: left + 40,
          right: ogSize.width - right + 40,
          top: top + 40,
          bottom: ogSize.height - bottom + 40,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </span>
        {description && (
          <span style={{ fontSize: 30, lineHeight: 1.35, color: mute, marginTop: 20 }}>
            {description}
          </span>
        )}
      </div>
    </div>,
    ogSize,
  )
}
