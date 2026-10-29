import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HudEyebrowProps {
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

/** Small mono uppercase eyebrow label with optional icon. */
export function HudEyebrow({ icon: Icon, children, className }: HudEyebrowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 font-mono text-xs font-semibold tracking-wide text-primary',
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span>{children}</span>
    </div>
  );
}
