import { notFound } from 'next/navigation'
import { ogImage } from '@/lib/og'
import { getPageImage, source } from '@/lib/source'

export const dynamic = 'force-static'

export async function GET(_request: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params
  const page = source.getPage(slug.slice(0, -1))
  if (!page) notFound()
  return ogImage({ title: page.data.title, description: page.data.description })
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({ slug: getPageImage(page).segments }))
}
