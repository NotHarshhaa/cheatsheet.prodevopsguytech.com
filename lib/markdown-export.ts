import { replaceSource, type Stringifier } from 'fumadocs-core/mdx-plugins/stringifier'

// mdast and vfile are not direct dependencies; take their types from the stringifier API.
type File = Parameters<typeof replaceSource>[0]
type Nodes = Parameters<typeof replaceSource>[1]
type Root = Extract<Nodes, { type: 'root' }>

type Attribute = {
  type: string
  name?: string
  value?: string | { value: string } | null
}
type Element = {
  type: 'mdxJsxFlowElement' | 'mdxJsxTextElement'
  name: string | null
  attributes: Attribute[]
  children: Nodes[]
}

function isElement(node: Nodes): node is Nodes & Element {
  return node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement'
}

/**
 * Markdown forms for the MDX components the docs use, so the `.md` exports, `llms-full.txt`,
 * and "Copy Markdown" carry plain Markdown instead of JSX: tab labels, card links, callout
 * titles, diagram text, and type tables survive as text an agent can read.
 *
 * Fumadocs generates that Markdown from the authored source (`remarkLLMs`), and this plugin
 * registers a replacement for each component through `replaceSource()`. `remarkAutoTypeTable`
 * turns each `<auto-type-table>` into generated `TypeTable` elements without a source position,
 * so the authored node (now a nested root) is replaced with their tables instead.
 */
export function remarkMarkdownExport(): (tree: Root, file: File) => void {
  return (tree, file) => {
    const visit = (nodes: Nodes[]) => {
      for (const node of nodes) {
        if (isElement(node)) {
          const markdown = replacement(node)
          if (markdown) replaceSource(file, node, markdown)
        } else if (node.type === 'root') {
          const tables = node.children
            .filter(isElement)
            .filter((child) => child.name === 'TypeTable')
          if (tables.length) replaceSource(file, node, tables.map(typeTable).join('\n\n'))
        }
        if ('children' in node) visit(node.children as Nodes[])
      }
    }
    visit(tree.children)
  }
}

function replacement(node: Element): ((s: Stringifier) => string) | undefined {
  switch (node.name) {
    case 'Tabs':
      return (s) => tabs(node, s)
    case 'Cards':
      return () => cards(node)
    case 'Callout':
      return (s) => callout(node, s)
    case 'Flow':
      return (s) => flow(node, s)
    case 'Steps':
    case 'Step':
    case 'Accordions':
      return (s) => s.inner(node as Nodes)
    case 'AgentPrompt':
      return () => ''
    case 'Accordion':
      return (s) => `**${attribute(node, 'title') ?? ''}**\n\n${s.inner(node as Nodes)}`
  }
}

function attribute(node: Element, name: string): string | undefined {
  const found = node.attributes.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === name,
  )
  if (!found || found.value == null) return
  return typeof found.value === 'string' ? found.value : found.value.value
}

function childElements(node: Element, name: string): Element[] {
  return node.children.filter(
    (child): child is Nodes & Element => isElement(child) && child.name === name,
  )
}

/** `items={['A', 'B']}` is an expression; read the string literals without evaluating it. */
function stringList(source: string | undefined): string[] {
  return [...(source ?? '').matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)].map(
    (match) => match[1] ?? match[2] ?? '',
  )
}

function tabs(node: Element, s: Stringifier): string {
  const labels = stringList(attribute(node, 'items'))
  return childElements(node, 'Tab')
    .map((tab, index) => {
      const label = attribute(tab, 'value') ?? labels[index] ?? `Option ${index + 1}`
      return `**${label}**\n\n${s.inner(tab as Nodes)}`
    })
    .join('\n\n')
}

function cards(node: Element): string {
  return childElements(node, 'Card')
    .map((card) => {
      const title = attribute(card, 'title') ?? ''
      const href = attribute(card, 'href')
      const text = plainText(card).trim()
      const link = href ? `[${title}](${href})` : title
      return `- ${link}${text ? `: ${text}` : ''}`
    })
    .join('\n')
}

const calloutLabels: Record<string, string> = {
  warn: 'Warning',
  warning: 'Warning',
  error: 'Important',
  idea: 'Tip',
  success: 'Note',
  info: 'Note',
}

function callout(node: Element, s: Stringifier): string {
  const label = calloutLabels[attribute(node, 'type') ?? 'info'] ?? 'Note'
  const title = attribute(node, 'title')
  const body = s.inner(node as Nodes)
  const lead = `**${label}${title ? `: ${title}` : ''}.**`
  return `${lead} ${body}`
    .split('\n')
    .map((line) => (line ? `> ${line}` : '>'))
    .join('\n')
}

function flow(node: Element, s: Stringifier): string {
  const title = attribute(node, 'title')
  const steps = childElements(node, 'FlowStep').map((step, index) => {
    const name = attribute(step, 'title') ?? ''
    const actor = attribute(step, 'actor')
    const body = s.inner(step as Nodes).replace(/\s*\n\s*/g, ' ')
    return `${index + 1}. **${name}**${actor ? ` (${actor})` : ''}: ${body.trim()}`
  })
  return [title ? `${title}:\n\n` : '', steps.join('\n')].join('')
}

type TypeEntry = {
  name: string
  description?: string
  type?: string
  simplifiedType?: string
  required?: boolean
  tags?: { name: string; text: string }[]
}

function typeTable(node: Element): string {
  const raw = attribute(node, 'type')
  if (!raw) return ''
  let parsed: { name?: string; entries?: TypeEntry[] }
  try {
    parsed = JSON.parse(raw)
  } catch {
    return ''
  }
  const cell = (value: string) => value.replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim()
  const rows = (parsed.entries ?? []).map((entry) => {
    const fallback = entry.tags?.find((tag) => tag.name === 'default')?.text ?? ''
    const name = `\`${entry.name}${entry.required ? '' : '?'}\``
    const type = `\`${cell((entry.type ?? entry.simplifiedType ?? '').replace(/ \| undefined$/, ''))}\``
    return `| ${name} | ${type} | ${fallback ? `\`${cell(fallback)}\`` : ''} | ${cell(entry.description ?? '')} |`
  })
  return ['| Field | Type | Default | Description |', '| --- | --- | --- | --- |', ...rows].join(
    '\n',
  )
}

function plainText(node: { children?: unknown[]; value?: unknown }): string {
  if (typeof node.value === 'string') return node.value
  return (node.children ?? []).map((child) => plainText(child as never)).join('')
}
