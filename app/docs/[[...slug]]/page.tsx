import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page'
import { getPageImage, source } from '@/lib/source'
import { markdownUrl } from '@/lib/llms'
import { site } from '@/lib/site'
import { getMDXComponents } from '@/mdx-components'

type Props = { params: Promise<{ slug?: string[] }> }

export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  const image = getPageImage(page).url
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: { siteName: site.name, type: 'article', url: page.url, images: image },
    twitter: { images: image },
    alternates: {
      canonical: page.url,
      types: { 'text/markdown': markdownUrl(slug) },
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()
  const MDX = page.data.body
  const markdown = markdownUrl(slug)
  const sourceUrl = `${site.contentUrl}/${page.path}`

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      footer={{ className: 'page-footer grid-cells gap-px' }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-4">{page.data.description}</DocsDescription>
      <div className="mb-6 flex flex-row flex-wrap items-center gap-2 border-b pb-6 [&_button]:font-mono [&_button]:text-[11px] [&_button]:uppercase [&_button]:tracking-wider">
        <MarkdownCopyButton markdownUrl={markdown} />
        <ViewOptionsPopover
          markdownUrl={markdown}
          githubUrl={sourceUrl}
          pageUrl={`${site.url}${page.url}`}
        />
      </div>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
      <div className="mt-8">
        <EditOnGitHub href={sourceUrl} />
      </div>
    </DocsPage>
  )
}
