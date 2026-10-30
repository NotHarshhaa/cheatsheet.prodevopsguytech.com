import { createFromSource } from 'fumadocs-core/search/server'
import { source } from '@/lib/source'

/** One search index for the search route and the MCP `search` tool. */
export const search = createFromSource(source)
