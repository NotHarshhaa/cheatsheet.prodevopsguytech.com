import Link from 'next/link'
import {
  Code,
  GitPullRequest,
  CheckCircle2,
  ArrowRight,
  Heart,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { button } from '@/lib/button'
import { site } from '@/lib/site'

const CONTRIBUTION_STEPS = [
  {
    step: '01',
    icon: GithubIcon,
    title: 'Fork the Repository',
    description:
      'Fork the official devops-cheatsheet repository to your GitHub account to create your personal working branch.',
    link: `${site.githubUrl}/fork`,
    linkText: 'Fork on GitHub',
  },
  {
    step: '02',
    icon: Code,
    title: 'Add or Improve Content',
    description:
      'Add new tools or enhance existing cheatsheets inside content/docs/. Follow the clean Markdown/MDX formatting with frontmatter and syntax blocks.',
    link: `${site.githubUrl}/tree/master/content/docs`,
    linkText: 'Browse Cheatsheets Source',
  },
  {
    step: '03',
    icon: GitPullRequest,
    title: 'Submit a Pull Request',
    description:
      'Open a pull request describing your improvements. Our automated CI checks and maintainers will review and merge quickly.',
    link: `${site.githubUrl}/pulls`,
    linkText: 'Open a Pull Request',
  },
]

const GUIDELINES = [
  'Use concise, command-first examples formatted in bash, yaml, or hcl.',
  'Include brief annotations or comments for complex flags or arguments.',
  'Avoid promotional, deprecated, or untested commands.',
  'Ensure every command is verified in a clean container or cloud environment.',
]

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-[80rem] border-x border-fd-border bg-fd-background">
      {/* Header */}
      <section className="border-b border-fd-border px-6 py-14 sm:px-10 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 border border-fd-border bg-fd-card px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fd-foreground mb-4">
          <Heart className="size-3 text-rose-500 fill-rose-500" />
          COMMUNITY & OPEN SOURCE
        </div>

        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-fd-foreground">
          Contribute to <span className="text-fd-primary font-mono font-normal">DevOps Cheatsheet</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-fd-muted-foreground leading-relaxed">
          Help thousands of engineers worldwide by adding new tools, updating deprecated flags, or improving architecture recipes.
        </p>
      </section>

      {/* Steps Section */}
      <section className="border-b border-fd-border px-6 py-12 sm:px-10 sm:py-16">
        <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold mb-2">
          WORKFLOW // STEP BY STEP
        </div>
        <h2 className="text-2xl font-medium tracking-tight text-fd-foreground mb-8">
          How to Contribute
        </h2>

        <div className="space-y-4">
          {CONTRIBUTION_STEPS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-fd-border bg-fd-card p-6 gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="size-10 border border-fd-border bg-fd-background text-fd-primary flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-xs text-fd-primary font-semibold">STEP {item.step} //</span>
                      <h3 className="text-sm font-semibold text-fd-foreground">{item.title}</h3>
                    </div>
                    <p className="mt-1 text-xs text-fd-muted-foreground max-w-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className={button('secondary')}
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="ms-2 size-3.5" />
                </a>
              </div>
            )
          })}
        </div>
      </section>

      {/* Guidelines Box */}
      <section className="border-b border-fd-border px-6 py-12 sm:px-10 sm:py-16 bg-fd-card/40">
        <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold mb-2">
          QUALITY STANDARDS // CHEAT CODES
        </div>
        <h2 className="text-xl font-medium text-fd-foreground mb-6">
          Contribution Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GUIDELINES.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-fd-muted-foreground font-mono">
              <span className="size-1.5 bg-fd-primary mt-1.5 shrink-0" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
