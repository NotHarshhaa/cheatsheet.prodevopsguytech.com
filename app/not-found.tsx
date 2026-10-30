import type { Metadata } from 'next'
import Link from 'next/link'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { baseOptions } from '@/lib/layout.shared'
import { button } from '@/lib/button'

export const metadata: Metadata = { title: 'Page not found' }

/** Unknown URLs and `notFound()` calls land here, inside the site header and frame. */
export default function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="mx-auto mb-24 w-full max-w-7xl flex-1 border-b sm:border-x">
        <section className="px-6 py-24 sm:px-10 sm:py-32">
          <h1 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            This page doesn&apos;t exist.
          </h1>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-fd-muted-foreground">
            It may have moved when the docs were reorganized. Search the docs, or start from one of
            these.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/docs" className={button('primary')}>
              Read the docs
            </Link>
            <Link href="/" className={button('secondary')}>
              Go to the home page
            </Link>
          </div>
        </section>
      </main>
    </HomeLayout>
  )
}
