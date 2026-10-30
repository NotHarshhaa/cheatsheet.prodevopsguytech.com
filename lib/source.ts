import { docs } from '../.source/server'
import { loader, type InferPageType } from 'fumadocs-core/source'
import { ogRevision } from '@/lib/og'

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
})

/** Each docs page's social card, generated at build time by `app/og/docs/[...slug]`. */
export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png']
  return { segments, url: `/og/docs/${segments.join('/')}?v=${ogRevision}` }
}
