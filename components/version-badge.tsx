import { site } from '@/lib/site'

export function VersionBadge() {
  return (
    <a
      href={site.githubUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`DevOps Cheatsheet v${site.version}`}
      className="ms-3 rounded border border-fd-border bg-fd-muted/60 px-2 py-0.5 font-mono text-[11px] font-semibold text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground whitespace-nowrap max-md:hidden"
    >
      v{site.version}
    </a>
  )
}
