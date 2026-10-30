'use client'

import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

export function CliCopyBox({
  command = 'curl -sL https://cheatsheet.prodevopsguytech.com/llms.txt',
  label = 'Agent & CLI Endpoint',
}: {
  command?: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border border-fd-border bg-fd-card px-4 py-2.5 font-mono text-xs transition-colors hover:border-fd-primary/40">
      <div className="flex items-center gap-2 text-fd-foreground">
        <span className="text-fd-primary font-bold select-none">$</span>
        <span className="font-semibold select-all">{command}</span>
      </div>

      <div className="ms-auto flex items-center gap-3">
        <span className="hidden sm:inline border border-fd-border bg-fd-background px-2 py-0.5 text-[10px] text-fd-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 border border-fd-border bg-fd-background px-2 py-1 text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-primary transition-colors cursor-pointer"
          title="Copy command to clipboard"
        >
          {copied ? (
            <>
              <Check className="size-3 text-emerald-500" />
              <span className="text-emerald-500 uppercase font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span className="uppercase">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
