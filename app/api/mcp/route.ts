import { createMcpHandler, McpServer } from '@modelcontextprotocol/server'
import { registerSearchTool, registerSourceTools } from 'fumadocs-core/mcp'
import { docsLlms } from '@/lib/llms'
import { search } from '@/lib/search'
import { source } from '@/lib/source'
import { site } from '@/lib/site'

/**
 * A stateless MCP server over Streamable HTTP with `list_pages`, `get_page`, and `search`.
 * Each request builds a fresh server, so it needs no session storage.
 */
const handler = createMcpHandler(() => {
  const mcp = new McpServer({ name: 'devops-cheatsheet-docs', version: site.version })
  registerSourceTools(mcp, source, docsLlms)
  registerSearchTool(mcp, search)
  return mcp
})

export const GET = (request: Request) => handler.fetch(request)
export const POST = (request: Request) => handler.fetch(request)
export const DELETE = (request: Request) => handler.fetch(request)
