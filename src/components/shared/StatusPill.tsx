import { cn } from '@/lib/utils';

interface StatusPillProps {
  label: string;
  badge?: string;
  className?: string;
}

/** Pinging status indicator pill — the site's live/telemetry signature. */
export function StatusPill({ label, badge = 'ACTIVE', className }: StatusPillProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md',
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      {badge && (
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          {badge}
        </span>
      )}
    </div>
  );
}
