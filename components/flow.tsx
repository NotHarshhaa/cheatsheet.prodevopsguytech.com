import type { ReactNode } from 'react'

/**
 * A left-to-right pipeline: one row of actors joined by a single line, and under each actor
 * the stage it performs, in cells that share hairlines. Stacked on narrow screens. It renders
 * as an ordered list, so screen readers and the Markdown export (see `lib/markdown-export.ts`)
 * get the same steps the picture shows; `title` names the list for assistive technology.
 */
export function Flow({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <ol aria-label={title} className="grid-cells not-prose my-6 md:auto-cols-fr md:grid-flow-col">
      {children}
    </ol>
  )
}

export function FlowStep({
  title,
  actor,
  children,
}: {
  title: string
  actor?: string
  children?: ReactNode
}) {
  return (
    <li className="group flex flex-col">
      {/* The track: one line through every actor, entering each with an arrowhead. It overlaps
          the 1px gap to the next cell so the line and fill run unbroken across the row. */}
      <div className="relative flex items-center bg-fd-card px-5 pt-5 md:h-16 md:border-b md:px-0 md:pt-0 md:group-not-last:-mr-px">
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-fd-border group-first:invisible max-md:hidden"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 6 8"
          className="h-2 w-1.5 shrink-0 text-fd-muted-foreground group-first:hidden max-md:hidden"
        >
          <path d="M0 0L6 4L0 8Z" fill="currentColor" />
        </svg>
        {actor ? (
          <span className="shrink-0 border bg-fd-background px-2.5 py-1 font-mono text-xs text-fd-foreground">
            {actor}
          </span>
        ) : null}
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-fd-border group-last:invisible max-md:hidden"
        />
      </div>
      <div className="flex flex-col gap-1.5 bg-fd-card p-5 md:bg-fd-background">
        <span className="text-sm font-medium text-fd-foreground">{title}</span>
        {children ? (
          <span className="text-sm leading-relaxed text-fd-muted-foreground [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-fd-foreground">
            {children}
          </span>
        ) : null}
      </div>
    </li>
  )
}
