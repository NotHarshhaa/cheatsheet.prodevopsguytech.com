import { notFound } from 'next/navigation'
import { docsLlms } from '@/lib/llms'
import { source } from '@/lib/source'

export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

/** Served at `/docs/<page>.md` through the rewrites in `next.config.mjs` and `proxy.ts`. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  return new Response(await docsLlms.page(page), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  })
}
