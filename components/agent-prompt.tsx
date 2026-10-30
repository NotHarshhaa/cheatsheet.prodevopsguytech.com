import Link from 'next/link'
import { CopyButton } from '@/components/copy-button'
import { quickStartPrompt } from '@/lib/prompts'

export function AgentPrompt() {
  return (
    <aside className="not-prose my-6 first:mt-0 border border-fd-border bg-fd-card p-5 rounded-lg">
      <p className="text-sm font-medium">Using an AI coding agent?</p>
      <p className="mt-1 text-sm text-fd-muted-foreground">
        Paste this prompt to query cheatsheets via the agentic MCP interface.
      </p>
      <div className="mt-4 flex items-start gap-2 border border-fd-border bg-fd-background py-3 pl-4 pr-2.5 rounded">
        <p className="flex-1 pt-1 font-mono text-[13px] leading-relaxed">{quickStartPrompt}</p>
        <CopyButton text={quickStartPrompt} label="Copy prompt" />
      </div>
    </aside>
  )
}
