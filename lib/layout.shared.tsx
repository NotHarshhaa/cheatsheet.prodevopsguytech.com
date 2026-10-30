import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { site } from '@/lib/site'
import { Logo } from '@/components/logo'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2.5 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.08em]">
          <Logo className="size-[20px]" />
          {site.name}
        </span>
      ),
      url: '/',
    },
    githubUrl: site.githubUrl,
    links: [
      { text: 'Cheatsheets', url: '/docs', active: 'nested-url' },
      { text: 'Roadmap', url: '/getting-started' },
      { text: 'Contribute', url: '/contribute' },
      { text: 'About', url: '/about' },
    ],
  }
}
