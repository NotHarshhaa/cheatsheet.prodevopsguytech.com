import type { ReactNode } from 'react'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import { source } from '@/lib/source'
import { baseOptions } from '@/lib/layout.shared'
import { VersionBadge } from '@/components/version-badge'

export default function Layout({ children }: { children: ReactNode }) {
  const { nav, ...base } = baseOptions()
  return (
    <DocsLayout
      {...base}
      // A full-width header carries the title, search, links, GitHub, and the theme switch.
      nav={{ ...nav, mode: 'top', children: <VersionBadge /> }}
      tree={source.getPageTree()}
      sidebar={{
        collapsible: false,
        defaultOpenLevel: 0,
      }}
    >
      {children}
    </DocsLayout>
  )
}
