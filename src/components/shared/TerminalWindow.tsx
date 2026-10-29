'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TerminalWindowProps {
  title?: ReactNode;
  /** When provided, a copy button renders in the chrome and copies this text. */
  copyText?: string;
  statusRight?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

/**
 * Shared macOS-style terminal chrome. Every code/output block on the site
 * renders inside this so the window dressing stays identical everywhere.
 */
export function TerminalWindow({
  title = 'terminal',
  copyText,
  statusRight,
  children,
  className,
  bodyClassName,
}: TerminalWindowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — nothing to do.
    }
  };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 font-mono text-zinc-200 shadow-2xl',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500/80" />
          <span className="ml-1 truncate font-sans text-xs text-zinc-400">{title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {statusRight}
          {copyText && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex h-7 cursor-pointer items-center gap-1.5 rounded-lg px-2 font-sans text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
      <div className={cn('p-4 sm:p-5', bodyClassName)}>{children}</div>
    </div>
  );
}
