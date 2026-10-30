import Link from 'next/link'
import {
  Terminal,
  Server,
  GitBranch,
  Box,
  Cloud,
  Shield,
  Workflow,
  BarChart2,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { button } from '@/lib/button'

const ROADMAP_STEPS = [
  {
    step: '01',
    level: 'Beginner',
    title: 'Linux & Command Line Fundamentals',
    description: 'Master bash scripting, file permissions, process management, SSH keys, and system diagnostics.',
    icon: Terminal,
    tools: ['Bash', 'Linux CLI', 'Systemd'],
    link: '/docs/ci-cd/jenkins',
  },
  {
    step: '02',
    level: 'Beginner',
    title: 'Version Control & Collaboration',
    description: 'Learn Git branching models, rebase workflows, interactive staging, pull requests, and Git hooks.',
    icon: GitBranch,
    tools: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
    link: '/docs/version-control/github',
  },
  {
    step: '03',
    level: 'Intermediate',
    title: 'Containers with Docker & Podman',
    description: 'Build lean multi-stage images, manage volumes and networks, run compose stacks, and debug container processes.',
    icon: Box,
    tools: ['Docker', 'Podman', 'CRI-O'],
    link: '/docs/containerization/docker',
  },
  {
    step: '04',
    level: 'Intermediate',
    title: 'Continuous Integration & Delivery (CI/CD)',
    description: 'Design automated pipelines, matrix testing, secret management, Docker image publishing, and deployment gates.',
    icon: Workflow,
    tools: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI'],
    link: '/docs/ci-cd/github-actions',
  },
  {
    step: '05',
    level: 'Advanced',
    title: 'Kubernetes Orchestration & Helm',
    description: 'Deploy Pods, Deployments, StatefulSets, Services, Ingresses, RBAC, NetworkPolicies, and package apps with Helm.',
    icon: Box,
    tools: ['Kubernetes', 'Helm', 'OpenShift'],
    link: '/docs/containerization/kubernetes',
  },
  {
    step: '06',
    level: 'Advanced',
    title: 'Infrastructure as Code (IaC)',
    description: 'Provision reproducible cloud environments with Terraform state locking, modules, and configure nodes with Ansible.',
    icon: Server,
    tools: ['Terraform', 'Ansible', 'Chef', 'Puppet'],
    link: '/docs/infrastructure-management/terraform',
  },
  {
    step: '07',
    level: 'Advanced',
    title: 'Cloud Platforms (AWS, Azure, GCP)',
    description: 'Architect scalable VPC networks, manage IAM roles, configure object storage, compute clusters, and cloud databases.',
    icon: Cloud,
    tools: ['AWS', 'Azure', 'GCP', 'EKS', 'Terraform on AWS'],
    link: '/docs/cloud/aws',
  },
  {
    step: '08',
    level: 'Expert',
    title: 'Security, Secrets & Compliance',
    description: 'Implement zero-trust security with HashiCorp Vault dynamic credentials, container vulnerability scanning with Trivy, and SonarQube.',
    icon: Shield,
    tools: ['HashiCorp Vault', 'Trivy', 'SonarQube', 'AquaSec'],
    link: '/docs/security/hashicorp-vault',
  },
  {
    step: '09',
    level: 'Expert',
    title: 'Observability & Monitoring',
    description: 'Collect metrics with Prometheus, write PromQL alerts, create Grafana dashboards, aggregate logs with ELK, and trace requests.',
    icon: BarChart2,
    tools: ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch'],
    link: '/docs/monitoring/prometheus',
  },
]

export default function GettingStartedPage() {
  return (
    <div className="mx-auto max-w-[80rem] border-x border-fd-border bg-fd-background">
      {/* Header */}
      <section className="border-b border-fd-border px-6 py-14 sm:px-10 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 border border-fd-border bg-fd-card px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fd-foreground mb-4">
          <span className="size-2 bg-blue-500 animate-pulse" />
          CAREER PATH & SKILL TREE
        </div>

        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-fd-foreground">
          DevOps Engineer <span className="text-fd-primary font-mono font-normal">Learning Roadmap</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-fd-muted-foreground leading-relaxed">
          A battle-tested progression guide from terminal basics to production Kubernetes clusters, cloud architectures, and observability.
        </p>
      </section>

      {/* Roadmap List */}
      <section className="border-b border-fd-border px-6 py-12 sm:px-10 sm:py-16">
        <div className="space-y-4">
          {ROADMAP_STEPS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-fd-border bg-fd-card p-6 gap-4 hover:border-fd-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="size-10 border border-fd-border bg-fd-background text-fd-primary flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-xs text-fd-primary font-bold">STAGE {item.step} //</span>
                      <span className="text-[10px] text-fd-muted-foreground uppercase border border-fd-border px-1.5 py-0.2">
                        {item.level}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-fd-foreground mt-1">{item.title}</h3>
                    <p className="mt-1 text-xs text-fd-muted-foreground max-w-lg leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1 font-mono text-[11px]">
                      {item.tools.map((t) => (
                        <span
                          key={t}
                          className="border border-fd-border bg-fd-background px-2 py-0.5 text-fd-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={item.link}
                  className={button('secondary')}
                >
                  <span>Open Cheatsheet</span>
                  <ArrowRight className="ms-2 size-3.5" />
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="border-b border-fd-border px-6 py-12 sm:px-10 sm:py-16 bg-fd-card/40 text-center">
        <h2 className="text-2xl font-medium tracking-tight text-fd-foreground">Ready to start with the commands?</h2>
        <p className="mt-2 text-xs text-fd-muted-foreground max-w-md mx-auto leading-relaxed">
          Jump straight into any of our 35+ verified cheatsheets to get instant copy-pasteable commands and recipes.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/docs" className={button('primary')}>
            <BookOpen className="me-2 size-4" />
            <span>Explore All Cheatsheets</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
