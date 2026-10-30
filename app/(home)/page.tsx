import Link from 'next/link'
import {
  Terminal,
  Box,
  Cloud,
  Server,
  GitBranch,
  Shield,
  Network,
  BarChart2,
  ArrowRight,
  Search,
  BookOpen,
  Zap,
  Layers,
  Sparkles,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Workflow,
  Lock,
  ShieldCheck,
  Check,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { HeroTerminal } from '@/components/hero-terminal'
import { IncidentQuickCommands } from '@/components/incident-quick-commands'
import { CliCopyBox } from '@/components/cli-copy-box'
import { button } from '@/lib/button'
import { site } from '@/lib/site'

const CATEGORIES = [
  {
    code: 'MOD-01',
    slug: 'containerization',
    title: 'Containerization & K8s',
    icon: Box,
    description: 'Docker engine commands, multi-stage builds, kubectl references, and Helm package deployment.',
    tools: ['Docker', 'Kubernetes', 'Helm', 'Podman', 'CRI-O', 'OpenShift'],
    link: '/docs/containerization/docker',
  },
  {
    code: 'MOD-02',
    slug: 'ci-cd',
    title: 'CI/CD Automation',
    icon: Terminal,
    description: 'Workflow syntax, matrix testing, self-hosted runners, artifact uploads, and deploy stages.',
    tools: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI'],
    link: '/docs/ci-cd/github-actions',
  },
  {
    code: 'MOD-03',
    slug: 'cloud',
    title: 'Cloud Architecture',
    icon: Cloud,
    description: 'AWS CLI reference, Azure ARM templates, gcloud commands, EKS clusters, and Terraform on AWS.',
    tools: ['AWS', 'Microsoft Azure', 'Google Cloud', 'EKS on AWS', 'Terraform on AWS'],
    link: '/docs/cloud/aws',
  },
  {
    code: 'MOD-04',
    slug: 'infrastructure-management',
    title: 'Infrastructure as Code',
    icon: Server,
    description: 'Terraform state locking, declarative HCL modules, Ansible playbooks, Chef recipes, and Puppet.',
    tools: ['Terraform', 'Ansible', 'Chef', 'Puppet'],
    link: '/docs/infrastructure-management/terraform',
  },
  {
    code: 'MOD-05',
    slug: 'version-control',
    title: 'Version Control',
    icon: GitBranch,
    description: 'Trunk-based Git workflows, interactive rebase, branch permissions, and repository hooks.',
    tools: ['GitHub', 'GitLab', 'Bitbucket'],
    link: '/docs/version-control/github',
  },
  {
    code: 'MOD-06',
    slug: 'security',
    title: 'Security & Secrets',
    icon: Shield,
    description: 'HashiCorp Vault dynamic engines, Trivy vulnerability scanning, and SonarQube static analysis.',
    tools: ['HashiCorp Vault', 'Trivy', 'SonarQube', 'AquaSec'],
    link: '/docs/security/hashicorp-vault',
  },
  {
    code: 'MOD-07',
    slug: 'networking',
    title: 'Networking & Mesh',
    icon: Network,
    description: 'Istio traffic management, Consul service discovery, Envoy proxy filters, and Linkerd mTLS.',
    tools: ['Istio', 'Consul', 'Envoy', 'Linkerd'],
    link: '/docs/networking/istio',
  },
  {
    code: 'MOD-08',
    slug: 'monitoring',
    title: 'Observability & Metrics',
    icon: BarChart2,
    description: 'Prometheus PromQL queries, Grafana visualization dashboards, ELK stack, and AWS CloudWatch.',
    tools: ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch', 'Nagios'],
    link: '/docs/monitoring/prometheus',
  },
]

const STATS = [
  { value: '35+', label: 'Verified Tools', detail: 'Production-ready cheatsheets', tag: 'SYS.CATALOG' },
  { value: '8', label: 'Architecture Hubs', detail: 'End-to-end DevOps pillars', tag: 'SYS.PILLARS' },
  { value: '100%', label: 'Verified Syntax', detail: 'Tested commands & templates', tag: 'SYS.VERIFIED' },
  { value: 'Free', label: 'Open Source', detail: 'MIT licensed & community-backed', tag: 'LICENSE.MIT' },
]

const PIPELINE_STAGES = [
  {
    stage: '01',
    name: 'Code & VCS',
    icon: GitBranch,
    description: 'Trunk-based branching, interactive rebase, Git hooks & PR reviews.',
    tools: ['Git', 'GitLab', 'Bitbucket'],
    link: '/docs/version-control/git',
  },
  {
    stage: '02',
    name: 'CI/CD Pipelines',
    icon: Terminal,
    description: 'Matrix testing, multi-arch builds, artifact caching & CD rollouts.',
    tools: ['GitHub Actions', 'GitLab CI', 'Jenkins'],
    link: '/docs/ci-cd/github-actions',
  },
  {
    stage: '03',
    name: 'Security & Scan',
    icon: Shield,
    description: 'Container vulnerability triage, static SAST analysis & secrets rotation.',
    tools: ['Vault', 'Trivy', 'SonarQube'],
    link: '/docs/security/hashicorp-vault',
  },
  {
    stage: '04',
    name: 'IaC & Cluster',
    icon: Server,
    description: 'Declarative state provisioning, Kubernetes manifests & Helm charts.',
    tools: ['Terraform', 'Kubernetes', 'Ansible'],
    link: '/docs/containerization/kubernetes',
  },
  {
    stage: '05',
    name: 'Observability',
    icon: BarChart2,
    description: 'PromQL alerts, metric scraping, distributed tracing & log aggregation.',
    tools: ['Prometheus', 'Grafana', 'ELK'],
    link: '/docs/monitoring/prometheus',
  },
]

const FEATURES = [
  {
    title: 'Instant Search',
    description: 'Press ⌘K or Ctrl+K anywhere to find commands, flags, and templates across all 35+ tools.',
    detail: 'Full-text indexed client-side',
  },
  {
    title: 'Verified Terminal Syntax',
    description: 'Every code snippet is verified against real cloud environments and container engines.',
    detail: 'Linux · macOS · Cloud runtimes',
  },
  {
    title: 'LLM & Agent-Friendly',
    description: 'All cheatsheets are available as clean raw markdown at /docs/*.md and compiled into /llms.txt.',
    detail: 'Cursor, Claude & agent ready',
  },
  {
    title: 'Copy-Ready Manifests',
    description: 'Production Kubernetes manifests, Dockerfiles, and Terraform blocks ready for deployment.',
    detail: 'Zero boilerplate friction',
  },
]

const HERO_HIGHLIGHTS = [
  '⚡ 100% Tested Syntax',
  '☸️ Kubernetes & Multi-Cloud',
  '📋 1-Click Copy Ready',
  '🤖 Agent & LLM Native',
]

const TRENDING_TAGS = [
  { label: 'kubernetes', path: '/docs/containerization/kubernetes' },
  { label: 'docker', path: '/docs/containerization/docker' },
  { label: 'terraform', path: '/docs/infrastructure-management/terraform' },
  { label: 'github-actions', path: '/docs/ci-cd/github-actions' },
  { label: 'prometheus', path: '/docs/monitoring/prometheus' },
  { label: 'vault', path: '/docs/security/hashicorp-vault' },
  { label: 'aws', path: '/docs/cloud/aws' },
  { label: 'istio', path: '/docs/networking/istio' },
]

/** Pixel-perfect crosshair at hairline grid crossings */
function CellMark() {
  return (
    <div
      aria-hidden="true"
      className="cell-mark pointer-events-none absolute -bottom-[4.5px] -right-[4.5px] z-10 size-[9px]"
    >
      <svg
        viewBox="0 0 9 9"
        className="size-[9px] fill-none stroke-fd-muted-foreground/60"
        strokeWidth="1"
      >
        <line x1="4.5" y1="0" x2="4.5" y2="9" />
        <line x1="0" y1="4.5" x2="9" y2="4.5" />
      </svg>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[80rem] border-x border-fd-border bg-fd-background">
      {/* Top Architectural Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-fd-border bg-fd-card/40 px-6 py-2.5 font-mono text-[11px] text-fd-muted-foreground uppercase tracking-wider sm:px-10">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-fd-foreground font-semibold">SYS.STATUS // OPERATIONAL</span>
          <span className="text-fd-border">//</span>
          <span>COVERAGE: 35+ TOOLS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px]">
          <span>EDITION: v2.0.0</span>
          <span>FORMAT: RUNBOOKS & RAW MARKDOWN</span>
          <span>LICENSE: MIT</span>
        </div>
      </div>

      {/* Upgraded Hero Section with Blueprint Frame & Grid Background */}
      <section className="relative border-b border-fd-border overflow-hidden px-6 py-14 sm:px-10 sm:py-20 lg:py-24">
        {/* Subtle Blueprint Hairline Grid Texture Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.22] [background-image:linear-gradient(to_right,var(--color-fd-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-fd-border)_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,#000_60%,transparent_100%)]"
        />

        {/* Blueprint Corner Accents */}
        <div aria-hidden="true" className="pointer-events-none absolute top-3 left-4 font-mono text-[10px] text-fd-muted-foreground/40 select-none">+</div>
        <div aria-hidden="true" className="pointer-events-none absolute top-3 right-4 font-mono text-[10px] text-fd-muted-foreground/40 select-none">+</div>

        {/* Hero Eyebrow Status Badges */}
        <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
          <div className="inline-flex items-center gap-1.5 border border-fd-border bg-fd-card px-2.5 py-1 text-fd-foreground shadow-xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-fd-primary">SYS.RUNBOOKS</span>
            <span className="text-fd-border">//</span>
            <span>PRODUCTION READY</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 border border-fd-border bg-fd-card/50 px-2.5 py-1 text-fd-muted-foreground">
            <ShieldCheck className="size-3 text-emerald-500" />
            <span>35+ INFRASTRUCTURE TOOLS</span>
          </div>
        </div>

        {/* Creative Headline UI */}
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-tight text-fd-foreground leading-[1.08]">
            <span className="block tracking-[-0.03em] text-fd-foreground">
              Production DevOps
            </span>
            <span className="block mt-1.5 sm:mt-2.5 font-display font-extrabold tracking-[-0.03em] bg-gradient-to-r from-fd-primary via-amber-500 to-orange-400 dark:from-fd-primary dark:via-amber-400 dark:to-orange-400 bg-clip-text text-transparent drop-shadow-xs">
              Command Cheatsheets
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-fd-muted-foreground leading-relaxed">
            Battle-tested CLI syntax, cloud infrastructure templates, Kubernetes manifests, and incident runbooks — curated for DevOps engineers and SREs who ship to production.
          </p>

          {/* Operational Highlight Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-fd-muted-foreground">
            {HERO_HIGHLIGHTS.map((item) => (
              <span
                key={item}
                className="border border-fd-border bg-fd-card/60 px-2.5 py-1 text-fd-foreground"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Action Buttons using .ticks and blueprint style */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/docs" className={button('primary')}>
              <span>Browse All Cheatsheets</span>
              <ArrowRight className="ms-2 size-4" />
            </Link>
            <Link href="/getting-started" className={button('secondary')}>
              <Sparkles className="me-2 size-4 text-amber-500" />
              <span>DevOps Roadmap</span>
            </Link>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={button('secondary')}
            >
              <GithubIcon className="me-2 size-4" />
              <span>GitHub (3.5K+)</span>
            </a>
          </div>

          {/* Raw Agent / CLI Quick Access Bar with 1-Click Copy */}
          <div className="mt-8 max-w-2xl">
            <CliCopyBox
              command={`curl -sL ${site.url}/llms.txt`}
              label="Agent & CLI Endpoint"
            />
          </div>

          {/* Quick Trending Tags Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-fd-border pt-6 font-mono text-xs">
            <span className="text-fd-muted-foreground me-1 uppercase tracking-wider text-[11px]">Trending:</span>
            {TRENDING_TAGS.map((tag) => (
              <Link
                key={tag.label}
                href={tag.path}
                className="border border-fd-border bg-fd-card px-2 py-0.5 text-fd-muted-foreground hover:border-fd-primary/50 hover:bg-fd-accent hover:text-fd-foreground transition-colors"
              >
                #{tag.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Upgraded Interactive Hero Terminal */}
        <div className="mt-12 sm:mt-16">
          <HeroTerminal />
        </div>

        {/* Hero Bottom Hairline Feature Rail */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-px border border-fd-border bg-fd-border font-mono text-xs">
          <div className="bg-fd-background p-3 text-center sm:text-left">
            <span className="text-fd-primary font-bold me-1.5">[01]</span>
            <span className="text-fd-foreground font-medium">35+ INFRA TOOLS</span>
          </div>
          <div className="bg-fd-background p-3 text-center sm:text-left">
            <span className="text-fd-primary font-bold me-1.5">[02]</span>
            <span className="text-fd-foreground font-medium">8 ARCHITECTURE HUBS</span>
          </div>
          <div className="bg-fd-background p-3 text-center sm:text-left">
            <span className="text-fd-primary font-bold me-1.5">[03]</span>
            <span className="text-fd-foreground font-medium">100% COPY-PASTE READY</span>
          </div>
          <div className="bg-fd-background p-3 text-center sm:text-left">
            <span className="text-fd-primary font-bold me-1.5">[04]</span>
            <span className="text-fd-foreground font-medium">FULL-TEXT ⌘K SEARCH</span>
          </div>
        </div>
      </section>

      {/* Hairline Grid: Metrics & Statistics */}
      <section className="grid-cells cells-4 sm:grid-cols-2 xl:grid-cols-4 border-b border-fd-border">
        {STATS.map((stat, idx) => (
          <div key={idx} className="relative p-6 sm:p-8 bg-fd-background">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-fd-muted-foreground border border-fd-border px-1.5 py-0.5">
                {stat.tag}
              </span>
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-medium tracking-tight text-fd-foreground">
              {stat.value}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-fd-primary font-semibold">
              {stat.label}
            </div>
            <div className="mt-2 text-xs text-fd-muted-foreground">
              {stat.detail}
            </div>
            <CellMark />
          </div>
        ))}
      </section>

      {/* Section Header: Lifecycle Flow */}
      <section className="border-b border-fd-border px-6 py-10 sm:px-10 bg-fd-card/40 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold">
            DELIVERY LIFECYCLE // 5 KEY STAGES
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-medium tracking-tight text-fd-foreground">
            End-to-End DevOps Pipeline
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-fd-muted-foreground">
          Command runbooks structured by actual software delivery phases, from source control commits to production monitoring.
        </p>
      </section>

      {/* Hairline Grid: 5 Pipeline Stages */}
      <section className="grid-cells grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-b border-fd-border">
        {PIPELINE_STAGES.map((stage) => {
          const Icon = stage.icon
          return (
            <Link
              key={stage.stage}
              href={stage.link}
              className="card-link group relative p-6 bg-fd-background hover:bg-fd-accent/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-fd-primary font-bold">
                    STAGE {stage.stage}
                  </span>
                  <div className="p-1.5 border border-fd-border bg-fd-card text-fd-muted-foreground group-hover:text-fd-primary transition-colors">
                    <Icon className="size-3.5" />
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors">
                  {stage.name}
                </h3>

                <p className="mt-1.5 text-xs text-fd-muted-foreground leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-fd-border flex flex-wrap gap-1 font-mono text-[10px] text-fd-muted-foreground">
                {stage.tools.map((t) => (
                  <span key={t} className="border border-fd-border bg-fd-card px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          )
        })}
      </section>

      {/* Section Header: Architecture Hubs */}
      <section className="border-b border-fd-border px-6 py-10 sm:px-10 bg-fd-card/40 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold">
            ARCHITECTURE HUBS // 8 DISCIPLINES
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-medium tracking-tight text-fd-foreground">
            Explore DevOps Categories
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-fd-muted-foreground">
          Specialized commands, manifest definitions, and deployment blueprints organized by infrastructure pillar.
        </p>
      </section>

      {/* Hairline Grid: 8 Architecture Hubs (using .grid-cells and .cells-4) */}
      <section className="grid-cells cells-4 sm:grid-cols-2 xl:grid-cols-4 border-b border-fd-border">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.slug}
              href={cat.link}
              className="card-link group relative p-6 sm:p-8 bg-fd-background hover:bg-fd-accent/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 border border-fd-border bg-fd-card text-fd-primary">
                      <Icon className="size-4" />
                    </div>
                    <span className="font-mono text-[10px] text-fd-muted-foreground">
                      {cat.code}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-fd-muted-foreground border border-fd-border px-1.5 py-0.5">
                    {cat.tools.length} TOOLS
                  </span>
                </div>

                <h3 className="text-base font-semibold text-fd-foreground group-hover:text-fd-primary transition-colors">
                  {cat.title}
                </h3>

                <p className="mt-2 text-xs text-fd-muted-foreground leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-fd-border">
                <div className="flex flex-wrap gap-1 font-mono text-[11px] text-fd-muted-foreground">
                  {cat.tools.slice(0, 3).map((tool) => (
                    <span key={tool} className="border border-fd-border bg-fd-card px-1.5 py-0.5">
                      {tool}
                    </span>
                  ))}
                  {cat.tools.length > 3 && (
                    <span className="border border-fd-border bg-fd-card px-1.5 py-0.5 text-[10px]">
                      +{cat.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <CellMark />
            </Link>
          )
        })}
      </section>

      {/* Section Header: Incident Quick-Commands */}
      <section className="border-b border-fd-border px-6 py-10 sm:px-10 bg-fd-card/40 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold">
            EMERGENCY RUNBOOKS // FREQUENT PRODUCTION INCIDENTS
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-medium tracking-tight text-fd-foreground">
            Battle-Tested Incident Commands
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-fd-muted-foreground">
          Instant copy-paste snippets for live triage, cluster recovery, and disk reclamation when production needs immediate action.
        </p>
      </section>

      {/* Incident Quick-Commands Component */}
      <section className="border-b border-fd-border p-6 sm:p-10">
        <IncidentQuickCommands />
      </section>

      {/* Section Header: Engineering Standard */}
      <section className="border-b border-fd-border px-6 py-10 sm:px-10 bg-fd-card/40 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-fd-primary font-semibold">
            ENGINEERING SPECIFICATION // STANDARDS
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-medium tracking-tight text-fd-foreground">
            Built for High-Velocity Teams
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-fd-muted-foreground">
          Designed after real incident response and daily operations: instant recall, no broken syntax, and no fluff.
        </p>
      </section>

      {/* Hairline Grid: Core Features (using .grid-cells and .cells-4) */}
      <section className="grid-cells cells-4 sm:grid-cols-2 xl:grid-cols-4 border-b border-fd-border">
        {FEATURES.map((feat, idx) => (
          <div key={idx} className="relative p-6 sm:p-8 bg-fd-background">
            <div className="font-mono text-[11px] uppercase tracking-wider text-fd-muted-foreground">
              0{idx + 1} // CAPABILITY
            </div>
            <h3 className="mt-3 text-base font-semibold text-fd-foreground">
              {feat.title}
            </h3>
            <p className="mt-2 text-xs text-fd-muted-foreground leading-relaxed">
              {feat.description}
            </p>
            <div className="mt-6 pt-3 border-t border-fd-border font-mono text-[11px] text-fd-primary">
              {feat.detail}
            </div>
            <CellMark />
          </div>
        ))}
      </section>

      {/* Bottom Blueprint Callout Banner */}
      <section className="border-b border-fd-border px-6 py-16 sm:px-10 sm:py-20 bg-fd-card/60 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-fd-primary font-semibold mb-3">
            <Zap className="size-3 text-amber-500" />
            <span>OPEN SOURCE & COMMUNITY POWERED</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-fd-foreground">
            Accelerate Your Infrastructure Pipeline
          </h2>

          <p className="mt-4 text-sm text-fd-muted-foreground leading-relaxed">
            Bookmark this command center, share it with your engineering team, or contribute new syntax templates directly on GitHub.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/docs" className={button('primary')}>
              <span>Explore All Cheatsheets</span>
              <ArrowRight className="ms-2 size-4" />
            </Link>
            <Link href="/contribute" className={button('secondary')}>
              <span>Contribution Guidelines</span>
            </Link>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={button('secondary')}
            >
              <GithubIcon className="me-2 size-4" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
