'use client';

import { useCallback, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Space-separated RGB triplet for the glow, e.g. "34 211 238" for cyan. */
  glowRgb?: string;
  as?: 'div' | 'article';
}

/**
 * Card wrapper with a cursor-following radial glow. Pure CSS-variable driven,
 * so it composes with any inner content and card styling.
 */
export function GlowCard({ children, className, glowRgb = '34 211 238', as = 'div' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn('group relative overflow-hidden', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgb(${glowRgb} / 0.11), transparent 65%)`,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </Tag>
  );
}
