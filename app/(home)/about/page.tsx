import Link from 'next/link'
import {
  Globe,
  FileText,
  BookOpen,
  ArrowRight,
  Star,
  Code,
  Server,
  Zap,
  User,
  CheckCircle2,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons'
import { button } from '@/lib/button'
import { site } from '@/lib/site'

const SKILL_SETS = [
  {
    category: 'Cloud Platforms',
    skills: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'DigitalOcean'],
  },
  {
    category: 'Containers & Orchestration',
    skills: ['Docker', 'Kubernetes', 'Helm', 'Podman', 'CRI-O', 'OpenShift'],
  },
  {
    category: 'Infrastructure as Code',
    skills: ['Terraform', 'Ansible', 'Puppet', 'Chef', 'CloudFormation'],
  },
  {
    category: 'CI/CD & Monitoring',
    skills: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Prometheus', 'Grafana', 'ELK Stack'],
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[80rem] border-x border-fd-border bg-fd-background">
      {/* Profile Header */}
      <section className="border-b border-fd-border px-6 py-14 sm:px-10 sm:py-20 text-center">
        <div className="relative mb-6 inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://avatars.githubusercontent.com/NotHarshhaa"
            alt="Harshhaa"
            className="size-28 border border-fd-border mx-auto"
          />
        </div>

        <div className="inline-flex items-center gap-2 border border-fd-border bg-fd-card px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fd-foreground mb-4">
          <span className="size-2 bg-emerald-500 animate-pulse" />
          AUTHOR & MAINTAINER
        </div>

        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-fd-foreground">
          Hey there! <span className="text-fd-primary font-mono font-normal">I&apos;m Harshhaa</span> 👋
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-fd-muted-foreground leading-relaxed">
          A passionate DevOps Engineer on a mission to automate everything, scale cloud infrastructures, and share verified production commands with the global community.
        </p>

        {/* Social Links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/NotHarshhaa"
            target="_blank"
            rel="noreferrer"
            className={button('secondary')}
          >
            <GithubIcon className="me-2 size-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://dev.to/prodevopsguytech"
            target="_blank"
            rel="noreferrer"
            className={button('secondary')}
          >
            <FileText className="me-2 size-4" />
            <span>Dev.to</span>
          </a>
          <a
            href="https://linkedin.com/in/harshhaa-vardhan-reddy"
            target="_blank"
            rel="noreferrer"
            className={button('secondary')}
          >
            <LinkedinIcon className="me-2 size-4 text-blue-500" />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid-cells cells-4 sm:grid-cols-2 xl:grid-cols-4 border-b border-fd-border">
        <div className="relative p-6 sm:p-8 bg-fd-background text-center">
          <div className="font-mono text-3xl sm:text-4xl font-medium text-fd-primary">3.5K+</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-fd-muted-foreground">GitHub Stars</div>
        </div>
        <div className="relative p-6 sm:p-8 bg-fd-background text-center">
          <div className="font-mono text-3xl sm:text-4xl font-medium text-fd-foreground">900+</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-fd-muted-foreground">Resources Shared</div>
        </div>
        <div className="relative p-6 sm:p-8 bg-fd-background text-center">
          <div className="font-mono text-3xl sm:text-4xl font-medium text-emerald-500">50+</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-fd-muted-foreground">Open Source Repos</div>
        </div>
        <div className="relative p-6 sm:p-8 bg-fd-background text-center">
          <div className="font-mono text-3xl sm:text-4xl font-medium text-fd-foreground">10K+</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-fd-muted-foreground">Community Engineers</div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="border-b border-fd-border px-6 py-12 sm:px-10 sm:py-16">
        <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold mb-2">
          DOMAINS // TECHNICAL EXPERTISE
        </div>
        <h2 className="text-2xl font-medium tracking-tight text-fd-foreground mb-8">
          Core Competencies & Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILL_SETS.map((set) => (
            <div key={set.category} className="border border-fd-border bg-fd-card p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-fd-foreground font-semibold mb-4">
                {set.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {set.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-fd-border bg-fd-background px-2.5 py-1 font-mono text-xs text-fd-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="border-b border-fd-border px-6 py-12 sm:px-10 sm:py-16 bg-fd-card/40">
        <h2 className="text-xl font-medium text-fd-foreground">The DevOps Cheatsheet Mission</h2>
        <p className="mt-3 text-sm text-fd-muted-foreground leading-relaxed max-w-2xl">
          The DevOps Cheatsheet was created to solve a universal pain point: when production is on the line, no engineer wants to browse endless pages of documentation or unverified StackOverflow snippets. Every cheatsheet in this project is rigorously tested, formatted for instant copy-pasting, and organized by real operational workflows.
        </p>
        <div className="mt-6">
          <Link href="/docs" className={button('primary')}>
            <span>Explore The Cheatsheets</span>
            <ArrowRight className="ms-2 size-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
