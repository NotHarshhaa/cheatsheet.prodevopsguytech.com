'use client'

import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button'

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [checked, onClick] = useCopyButton(() => navigator.clipboard.writeText(text))
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={checked ? 'Copied' : label}
      className="inline-flex size-7 shrink-0 items-center justify-center text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {checked ? (
          <path d="M20 6 9 17l-5-5" />
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>
    </button>
  )
}
