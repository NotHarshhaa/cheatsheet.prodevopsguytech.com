import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { remarkMarkdownExport } from './lib/markdown-export'

const codeThemes = {
  light: 'github-light-high-contrast',
  dark: 'github-dark-high-contrast',
} as const

export const docs = defineDocs({
  dir: 'content/docs',
  docs: { postprocess: { includeProcessedMarkdown: true } },
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: { themes: codeThemes },
    remarkImageOptions: false,
    remarkPlugins: [remarkMarkdownExport],
  },
})
