'use client'

import { useState } from 'react'
import { Copy, Check, Terminal, AlertCircle } from 'lucide-react'

interface IncidentCommand {
  tool: string
  title: string
  command: string
  description: string
  tag: string
}

const COMMANDS: IncidentCommand[] = [
  {
    tool: 'Kubernetes',
    title: 'Identify Crashing Pods',
    command: 'kubectl get pods -A --field-selector=status.phase!=Running',
    description: 'Filter across all namespaces to pinpoint CrashLoopBackOff and Pending pods.',
    tag: 'TRIAGE',
  },
  {
    tool: 'Docker',
    title: 'Emergency Disk Reclamation',
    command: 'docker system prune -a --volumes -f',
    description: 'Remove stopped containers, unused networks, dangling images, and build cache.',
    tag: 'CLEANUP',
  },
  {
    tool: 'Terraform',
    title: 'Force Release State Lock',
    command: 'terraform force-unlock <LOCK_ID>',
    description: 'Override stuck DynamoDB or remote state lock after an interrupted pipeline.',
    tag: 'STATE',
  },
  {
    tool: 'Prometheus',
    title: 'Pod CPU Throttling Rate',
    command: 'sum(increase(container_cpu_cfs_throttled_periods_total[5m])) by (pod)',
    description: 'Calculate throttling frequency across Kubernetes pods to tune CPU limits.',
    tag: 'PROMQL',
  },
]

export function IncidentQuickCommands() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {COMMANDS.map((item, idx) => {
        const isCopied = copiedIdx === idx
        return (
          <div
            key={item.title}
            className="group relative border border-fd-border bg-fd-card p-5 transition-colors hover:border-fd-primary/50 hover:bg-fd-background"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-fd-primary font-semibold border border-fd-border bg-fd-background px-1.5 py-0.5">
                {item.tool} // {item.tag}
              </span>
              <button
                type="button"
                onClick={() => copyCommand(item.command, idx)}
                className="flex items-center gap-1 border border-fd-border bg-fd-background px-2 py-0.5 font-mono text-[10px] text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-primary transition-colors cursor-pointer"
                title="Copy command"
              >
                {isCopied ? (
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

            <h3 className="font-mono text-sm font-semibold text-fd-foreground mb-1">
              {item.title}
            </h3>

            <p className="text-xs text-fd-muted-foreground leading-relaxed mb-3">
              {item.description}
            </p>

            <div className="overflow-x-auto border border-fd-border bg-fd-muted/30 px-3 py-2 font-mono text-xs text-fd-foreground">
              <code>
                <span className="text-fd-primary select-none me-1.5">$</span>
                {item.command}
              </code>
            </div>
          </div>
        )
      })}
    </div>
  )
}
