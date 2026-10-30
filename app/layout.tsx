import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import SearchDialog from '@/components/search'
import { SuppressScriptWarning } from '@/components/suppress-script-warning'
import { ogRevision, ogSize } from '@/lib/og'
import { site } from '@/lib/site'
import './global.css'

if (process.env.NODE_ENV === 'development') {
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

const sans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })
const image = { url: `/og/image.png?v=${ogRevision}`, ...ogSize, alt: site.name }

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: ${site.description}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: { siteName: site.name, type: 'website', locale: 'en_US', url: '/', images: image },
  twitter: { card: 'summary_large_image', images: image },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <SuppressScriptWarning />
        <RootProvider search={{ SearchDialog }}>{children}</RootProvider>
        {process.env.VERCEL_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
