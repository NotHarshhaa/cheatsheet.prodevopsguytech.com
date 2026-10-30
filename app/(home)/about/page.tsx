import Link from 'next/link'
import {
  ArrowRight,
  ExternalLink,
  Terminal,
  Cloud,
  Box,
  Server,
  Shield,
  Activity,
  Quote,
  MapPin,
  Briefcase,
  Star,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Layers,
  Globe,
  FileText,
  User,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons'
import { button } from '@/lib/button'
import { site } from '@/lib/site'

function CellMark() {
  return (
    <div
      aria-hidden="true"
      className="cell-mark pointer-events-none absolute -bottom-[4.5px] -right-[4.5px] z-10 size-[9px]"
    >
      <svg
        viewBox="0 0 9 9"
        className="size-full fill-none stroke-fd-muted-foreground/60 stroke-[1px]"
      >
        <path d="M 4.5 0 L 4.5 9 M 0 4.5 L 9 4.5" />
      </svg>
    </div>
  )
}

const STATS = [
  { value: '3.5K+', label: 'GitHub Stars', detail: 'Across open source repos & tools' },
  { value: '900+', label: 'Curated Resources', detail: 'Verified cheatsheets & runbooks' },
  { value: '50+', label: 'Public Repositories', detail: 'IaC modules, scripts & templates' },
  { value: '10K+', label: 'Engineers Reached', detail: 'SREs & DevOps practitioners' },
]

const SKILL_DOMAINS = [
  {
    category: 'Cloud Infrastructure',
    icon: Cloud,
    skills: ['AWS (EKS, VPC, IAM, S3, RDS)', 'Microsoft Azure (AKS, VNet)', 'Google Cloud (GKE, VPC)', 'DigitalOcean'],
  },
  {
    category: 'Containers & Orchestration',
    icon: Box,
    skills: ['Kubernetes (K8s)', 'Docker Engine', 'Helm v3 Packages', 'Podman & Buildah', 'CRI-O Runtime', 'Red Hat OpenShift'],
  },
  {
    category: 'Infrastructure as Code',
    icon: Server,
    skills: ['HashiCorp Terraform', 'Ansible Automation', 'Puppet Modules', 'Chef Infra', 'AWS CloudFormation', 'Pulumi'],
  },
  {
    category: 'CI/CD & Observability',
    icon: Activity,
    skills: ['GitHub Actions', 'GitLab CI/CD', 'Jenkins Pipelines', 'Prometheus & PromQL', 'Grafana Dashboards', 'ELK Stack'],
  },
]

const ECOSYSTEM_PORTALS = [
  {
    title: 'Docs Portal',
    url: 'https://docs.prodevopsguytech.com',
    description: '900+ curated DevOps & cloud learning guides, roadmaps, and cheat references.',
    tag: 'LEARNING HUB',
  },
  {
    title: 'Repositories Central',
    url: 'https://repos.prodevopsguytech.com',
    description: 'Production automation scripts, Terraform modules, and interview preparation repos.',
    tag: 'CODE & IAC',
  },
  {
    title: 'DevOps Jobs Portal',
    url: 'https://jobs.prodevopsguytech.com',
    description: 'Curated career opportunities and job openings for DevOps, SRE, and Cloud Engineers.',
    tag: 'CAREERS',
  },
  {
    title: 'DevOps Deep Dives',
    url: 'https://blog.prodevopsguytech.com',
    description: 'Practical architectural breakdowns, post-mortems, and production best practices.',
    tag: 'ENGINEERING BLOG',
  },
  {
    title: 'Cloud Tech Blog',
    url: 'https://cloud.prodevopsguytech.com',
    description: 'Cloud-native tutorials, AWS/Azure architectures, and cost-optimization patterns.',
    tag: 'CLOUD ARCHITECTURE',
  },
  {
    title: 'Tool Setup Guides',
    url: 'https://devopsguides.site',
    description: 'Step-by-step production setup, hardening, and configuration guides for 40+ DevOps tools.',
    tag: 'INSTALLATION RUNBOOKS',
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[80rem] border-x border-fd-border bg-fd-background">
      {/* Top Metadata Header Strip */}
      <div className="flex flex-wrap items-center justify-between border-b border-fd-border bg-fd-card/40 px-6 py-2.5 font-mono text-[11px] text-fd-muted-foreground uppercase tracking-wider sm:px-10">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span className="text-fd-foreground font-semibold">MAINTAINER IDENT</span>
          <span className="text-fd-border">//</span>
          <span>PRODEVOPSGUYTECH</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px]">
          <span>LOC: BENGALURU, IN</span>
          <span>STATUS: DEPLOYING RUNBOOKS</span>
        </div>
      </div>

      {/* Profile Hero Section */}
      <section className="border-b border-fd-border px-6 py-12 sm:px-10 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr]">
          {/* Avatar Column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative inline-block">
              <div className="relative size-32 sm:size-36 rounded-full overflow-hidden border-2 border-fd-border bg-black shadow-xl ring-4 ring-fd-muted transition-transform hover:scale-[1.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://avatars.githubusercontent.com/NotHarshhaa"
                  alt="Harshhaa Vardhan Reddy"
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-background px-2.5 py-1 shadow-sm">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-fd-foreground">
                  AUTHOR
                </span>
              </div>
            </div>

            {/* Quick Meta Chips */}
            <div className="mt-5 flex flex-wrap justify-center gap-1.5 font-mono text-[11px] text-fd-muted-foreground lg:justify-start">
              <span className="border border-fd-border bg-fd-card px-2.5 py-0.5">📍 Bengaluru, India</span>
              <span className="border border-fd-border bg-fd-card px-2.5 py-0.5">💼 DevOps Engineer</span>
            </div>
          </div>

          {/* Bio & Details Column */}
          <div>
            <div className="inline-flex items-center gap-2 border border-fd-border bg-fd-card px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-fd-foreground mb-3">
              <Sparkles className="size-3 text-fd-primary" />
              <span>THE ENGINEER BEHIND THE CHEATSHEETS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-fd-foreground">
              Harshhaa Vardhan Reddy
            </h1>

            <p className="mt-2 font-mono text-sm sm:text-base text-fd-primary font-medium">
              Cloud & DevOps Engineer • Open Source Creator • Technical Writer
            </p>

            <p className="mt-4 max-w-2xl text-base text-fd-muted-foreground leading-relaxed">
              DevOps Engineer on a mission to automate complex cloud architectures, harden Kubernetes deployments, and empower fellow engineers with rigorously verified, copy-paste ready cheat-sheets.
            </p>

            {/* Social & Action Links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/docs" className={button('primary')}>
                <span>Browse Cheatsheets</span>
                <ArrowRight className="ms-2 size-4" />
              </Link>
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
                href="https://linkedin.com/in/harshhaa-vardhan-reddy"
                target="_blank"
                rel="noreferrer"
                className={button('secondary')}
              >
                <LinkedinIcon className="me-2 size-4 text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://dev.to/prodevopsguytech"
                target="_blank"
                rel="noreferrer"
                className={button('secondary')}
              >
                <FileText className="me-2 size-4 text-emerald-500" />
                <span>Dev.to</span>
              </a>
              <a
                href="https://twitter.com/prodevopsguy"
                target="_blank"
                rel="noreferrer"
                className={button('secondary')}
              >
                <TwitterIcon className="me-2 size-4 text-sky-500" />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & Impact Strip */}
      <section className="grid-cells cells-4 border-b border-fd-border">
        {STATS.map((stat) => (
          <div key={stat.label} className="relative p-6 sm:p-8 bg-fd-background">
            <CellMark />
            <div className="font-mono text-3xl sm:text-4xl font-medium text-fd-foreground">
              {stat.value}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-fd-primary font-semibold">
              {stat.label}
            </div>
            <p className="mt-1 text-xs text-fd-muted-foreground">
              {stat.detail}
            </p>
          </div>
        ))}
      </section>

      {/* Philosophy & Mission (2-Column Grid) */}
      <section className="grid-cells cells-2 border-b border-fd-border">
        <div className="relative p-6 sm:p-10 bg-fd-background">
          <CellMark />
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold mb-2">
            01 // THE CHALLENGE
          </div>
          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-fd-foreground mb-4">
            Why Most DevOps Documentation Slows You Down
          </h2>
          <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
            When production clusters throw errors or CI/CD pipelines fail before a critical release, engineers cannot afford to read 40-page theoretical guides, navigate paywalled blogs, or sift through outdated StackOverflow answers with deprecated CLI flags.
          </p>
          <ul className="space-y-2 text-xs text-fd-muted-foreground font-mono">
            <li className="flex items-center gap-2">
              <span className="text-red-500">✕</span> Deprecated flags and broken commands in generic tutorials
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✕</span> Unhelpful boilerplate without context for real outages
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✕</span> Fragmented bookmarks scattered across dozens of vendor sites
            </li>
          </ul>
        </div>

        <div className="relative p-6 sm:p-10 bg-fd-background">
          <CellMark />
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-emerald-500 font-semibold mb-2">
            02 // THE RUNBOOK PHILOSOPHY
          </div>
          <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-fd-foreground mb-4">
            Engineered for Zero-Fluff, Production Reliability
          </h2>
          <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
            Every cheatsheet in this project is distilled from real production engineering workflows. Tested on live Kubernetes clusters, cloud environments, and pipeline runners, each command is ready to copy, paste, and run with confidence.
          </p>
          <ul className="space-y-2 text-xs text-fd-muted-foreground font-mono">
            <li className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> 100% verified syntax tested against current tool versions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> Instant copy-to-clipboard buttons and full-text ⌘K search
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span> Operational categorization from Day-0 setup to Day-2 debugging
            </li>
          </ul>
        </div>
      </section>

      {/* Core Competencies Matrix */}
      <section className="border-b border-fd-border px-6 py-12 sm:px-10 sm:py-16">
        <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold mb-2">
          TECHNICAL MATRIX // 35+ TOOLS
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-fd-foreground mb-8">
          Core Competencies & Technology Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILL_DOMAINS.map((domain) => {
            const Icon = domain.icon
            return (
              <div key={domain.category} className="border border-fd-border bg-fd-card p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex size-7 items-center justify-center border border-fd-border bg-fd-background">
                    <Icon className="size-4 text-fd-primary" />
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-fd-foreground font-semibold">
                    {domain.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-fd-border bg-fd-background px-2.5 py-1 font-mono text-xs text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-primary/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ProDevOpsGuyTech Ecosystem Portals */}
      <section className="border-b border-fd-border px-6 py-12 sm:px-10 sm:py-16">
        <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold mb-2">
          ECOSYSTEM // OPEN RESOURCES
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-fd-foreground mb-3">
          Explore The ProDevOpsGuyTech Network
        </h2>
        <p className="text-sm text-fd-muted-foreground max-w-2xl mb-8 leading-relaxed">
          Beyond the DevOps Cheatsheet, explore our sister portals dedicated to career advancement, tool installation guides, and deep-dive cloud architectures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ECOSYSTEM_PORTALS.map((portal) => (
            <a
              key={portal.title}
              href={portal.url}
              target="_blank"
              rel="noreferrer"
              className="group border border-fd-border bg-fd-card p-6 transition-all hover:border-fd-primary/60 hover:bg-fd-background"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="border border-fd-border bg-fd-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fd-primary font-semibold">
                  {portal.tag}
                </span>
                <ExternalLink className="size-3.5 text-fd-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fd-primary" />
              </div>
              <h3 className="font-mono text-sm font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors mb-2">
                {portal.title}
              </h3>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                {portal.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="border-b border-fd-border px-6 py-14 sm:px-10 sm:py-16 bg-fd-card/40 text-center">
        <Quote className="mx-auto mb-4 size-8 text-fd-primary/40" />
        <blockquote className="mx-auto max-w-2xl font-mono text-lg sm:text-xl font-medium text-fd-foreground leading-relaxed">
          &ldquo;DevOps is not a goal, but a never-ending process of continual improvement.&rdquo;
        </blockquote>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-fd-muted-foreground">
          — Jez Humble, Co-Author of Continuous Delivery
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/docs" className={button('primary')}>
            <span>Explore All 35+ Cheatsheets</span>
            <ArrowRight className="ms-2 size-4" />
          </Link>
          <a
            href="https://github.com/NotHarshhaa/devops-cheatsheet"
            target="_blank"
            rel="noreferrer"
            className={button('secondary')}
          >
            <GithubIcon className="me-2 size-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </section>
    </div>
  )
}
