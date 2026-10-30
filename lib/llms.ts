import type * as PageTree from 'fumadocs-core/page-tree'
import { llms } from 'fumadocs-core/source/llms'
import { source } from '@/lib/source'
import { site } from '@/lib/site'

/** The Markdown URL of a page: `/docs/a/b` is `/docs/a/b.md`; the introduction is `/docs.md`. */
export function markdownUrl(slug: string[] | undefined): string {
  return slug?.length ? `/docs/${slug.join('/')}.md` : '/docs.md'
}

/**
 * Point site-relative links at absolute URLs, and docs links at their Markdown export, so an
 * agent reading one exported page can follow links without rendering HTML.
 */
function absoluteLinks(markdown: string): string {
  return markdown.replace(/\]\((\/[^)\s]*)\)/g, (_, target: string) => {
    const [path = '', hash] = target.split('#')
    const docs = /^\/docs(?:\/(.*?))?\/?$/.exec(path)
    const url = docs ? markdownUrl(docs[1]?.split('/').filter(Boolean)) : path
    return `](${site.url}${url}${hash ? `#${hash}` : ''})`
  })
}

export const docsLlms = llms(source, {
  async renderPage(page) {
    const body = await page.data.getText('processed')
    return absoluteLinks(
      `# ${page.data.title}\n\n> ${page.data.description}\n\nSource: ${site.url}${page.url}\n\n${body}`,
    )
  },
})

const summary = [
  `# ${site.name}`,
  '',
  `> ${site.name} is the open-source production command reference for DevOps engineers, cloud architects, and SREs. Instant syntax, verified commands, architecture templates, and automation patterns across 35+ tools.`,
  '',
  `Version ${site.version}. Maintained by ${site.author}.`,
  '',
  '**Architecture Hubs:** CI/CD Automation, Containerization, Cloud Platforms, Infrastructure as Code, Version Control, Security & Secrets, Networking & Mesh, Monitoring & Observability.',
  '',
  '**How to use these cheatsheets:** each tool guide provides quickstarts, core operations, production workflows, debugging recipes, and best practices. All cheatsheets in one file: ' +
    `${site.url}/llms-full.txt`,
]

/** An llms.txt index (https://llmstxt.org): one H2 section per sidebar folder. */
export function llmsIndex(): string {
  const lines = [...summary]
  const optional: string[] = []
  for (const node of source.getPageTree().children) {
    if (node.type === 'page') {
      const page = source.getNodePage(node)
      if (page) lines.push('', entry(node))
    } else if (node.type === 'folder') {
      const pages = pagesIn(node).map(entry)
      if (node.name === 'Resources') optional.push(...pages)
      else lines.push('', `## ${String(node.name)}`, '', ...pages)
    }
  }
  if (optional.length) {
    lines.push('', '## Optional', '', ...optional)
  }
  return lines.join('\n')
}

/** Pages in a folder and its sub-folders, in sidebar order. */
function pagesIn(folder: PageTree.Folder): PageTree.Item[] {
  return folder.children.flatMap((child) =>
    child.type === 'page' ? [child] : child.type === 'folder' ? pagesIn(child) : [],
  )
}

function entry(node: PageTree.Item): string {
  if (node.external || /^https?:\/\//.test(node.url)) return `- [${String(node.name)}](${node.url})`
  const page = source.getNodePage(node)
  if (!page) throw new Error(`No page for ${node.url}`)
  return `- [${page.data.title}](${site.url}${markdownUrl(page.slugs)}): ${page.data.description}`
}
