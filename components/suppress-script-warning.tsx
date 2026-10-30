'use client'

/**
 * Filter out the false-positive React 19 / Next.js script tag warning.
 * next-themes (used internally by Fumadocs RootProvider) renders an inline <script>
 * during SSR to prevent theme flicker (FOUC). React 19 warns against rendering raw <script>
 * tags inside components during client-side hydration, which triggers a false-positive dev error.
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Encountered a script tag')
    ) {
      return
    }
    originalError.apply(console, args)
  }
}

export function SuppressScriptWarning() {
  return null
}
