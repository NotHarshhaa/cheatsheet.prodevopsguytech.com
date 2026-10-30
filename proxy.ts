import { NextResponse, type NextRequest } from 'next/server'
import { isMarkdownPreferred } from 'fumadocs-core/negotiation'

/** Agents that ask for `text/markdown` get a docs page's Markdown at the page's own URL. */
export function proxy(request: NextRequest) {
  if (!isMarkdownPreferred(request)) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = url.pathname.replace(/^\/docs/, '/llms.mdx/docs').replace(/\/$/, '')
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/docs', '/docs/:path*'],
}
