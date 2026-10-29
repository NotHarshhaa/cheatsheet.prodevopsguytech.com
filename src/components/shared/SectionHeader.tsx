import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { HudEyebrow } from './HudEyebrow';

interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Consistent section heading: mono eyebrow + large title + muted description. */
export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const centered = align === 'center';
  return (
    <div className={cn('mb-10', centered && 'text-center', className)}>
      {eyebrow && (
        <HudEyebrow icon={eyebrowIcon} className={cn('mb-3', centered && 'justify-center')}>
          {eyebrow}
        </HudEyebrow>
      )}
      <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-4xl">{title}</h2>
      {description && (
        <p
          className={cn(
            'mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base',
            centered && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
