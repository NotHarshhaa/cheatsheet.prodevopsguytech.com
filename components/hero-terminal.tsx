'use client'

import { useState } from 'react'
import { Terminal, Check, Copy, Activity, ShieldCheck } from 'lucide-react'

const TABS = [
  {
    id: 'k8s',
    label: 'k8s-pod.yaml',
    tag: 'KUBERNETES',
    command: 'kubectl apply -f deployment.yaml',
    output: [
      'deployment.apps/production-api created',
      'service/production-api-svc created',
      'horizontalpodautoscaler.autoscaling/production-api-hpa configured',
      '✓ Deployment rolled out successfully: 3/3 replicas available',
    ],
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: production-api
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: production-api
  template:
    metadata:
      labels:
        app: production-api
    spec:
      containers:
      - name: api
        image: ghcr.io/org/api:v2.4.0
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
          requests:
            cpu: "250m"
            memory: "256Mi"`,
  },
  {
    id: 'docker',
    label: 'Dockerfile',
    tag: 'DOCKER',
    command: 'docker buildx build --platform linux/amd64,linux/arm64 -t app:latest .',
    output: [
      '[+] Building 14.2s (18/18) FINISHED',
      ' => [internal] load build definition from Dockerfile',
      ' => => transferring dockerfile: 452B',
      ' => [stage-1 4/4] COPY --from=builder /app/dist ./dist',
      ' => exporting to image (multi-arch manifest)',
      '✓ Successfully built image ghcr.io/org/app:latest',
    ],
    code: `# Multi-stage hardened production Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
USER nonroot:nonroot
EXPOSE 3000
CMD ["dist/index.js"]`,
  },
  {
    id: 'terraform',
    label: 'main.tf',
    tag: 'TERRAFORM',
    command: 'terraform apply -auto-approve',
    output: [
      'aws_vpc.main: Creating...',
      'aws_eks_cluster.prod: Creating... [still creating... 1m10s]',
      'aws_eks_cluster.prod: Creation complete after 8m42s',
      'Apply complete! Resources: 18 added, 0 changed, 0 destroyed.',
      'Outputs: cluster_endpoint = "https://B4B8.gr7.us-east-1.eks.amazonaws.com"',
    ],
    code: `module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "production-cluster"
  cluster_version = "1.31"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    compute = {
      instance_types = ["t4g.xlarge"]
      min_size       = 3
      max_size       = 10
      desired_size   = 3
      capacity_type  = "SPOT"
    }
  }
}`,
  },
  {
    id: 'cicd',
    label: 'ci-cd.yml',
    tag: 'GITHUB ACTIONS',
    command: 'gh workflow run deploy-production.yml',
    output: [
      '✓ Created workflow_dispatch event for deploy-production.yml',
      'Running job: security-scan (Trivy + SonarQube)... PASS',
      'Running job: container-build-multiarch... PASS',
      'Running job: deploy-canary-kubernetes... PASS',
      '✓ All pipeline checks passed (total time: 2m 18s)',
    ],
    code: `name: Production Deployment
on:
  push:
    tags: ['v*']

jobs:
  verify-and-ship:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy Vulnerability Scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'CRITICAL,HIGH'
      - name: Deploy to Kubernetes Cluster
        uses: azure/k8s-deploy@v5
        with:
          manifests: ./k8s/production.yaml`,
  },
  {
    id: 'promql',
    label: 'alerts.yaml',
    tag: 'PROMETHEUS',
    command: 'promtool check rules alerts.yaml',
    output: [
      'Checking alerts.yaml',
      '  SUCCESS: 2 rules found',
      '  ✓ HighP99LatencyAlert: P99 > 350ms for 2m',
      '  ✓ PodCrashLooping: restarts > 5 in 15m',
      '✓ All Prometheus rules verified successfully',
    ],
    code: `groups:
- name: production-slo-alerts
  rules:
  - alert: HighP99LatencyAlert
    expr: histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) > 0.35
    for: 2m
    labels:
      severity: critical
    annotations:
      summary: "P99 latency exceeded 350ms SLA"
  - alert: PodCrashLooping
    expr: rate(kube_pod_container_status_restarts_total[15m]) * 60 > 5
    for: 5m
    labels:
      severity: warning`,
  },
]

export function HeroTerminal() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  const tab = TABS[activeTab]

  const handleCopy = () => {
    navigator.clipboard.writeText(tab.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-fd-border bg-fd-card font-mono text-xs shadow-lg">
      {/* Terminal Title Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-fd-border bg-fd-muted/40 px-3 py-2 sm:px-4">
        {/* Window Chrome / Status Dots */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-red-500/80" />
            <span className="size-2.5 rounded-full bg-amber-500/80" />
            <span className="size-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-fd-foreground flex items-center gap-1.5">
            <Terminal className="size-3.5 text-fd-primary" />
            <span>CONSOLE // {tab.label}</span>
          </span>
          <span className="hidden sm:inline border border-fd-border bg-fd-background px-1.5 py-0.2 text-[9px] uppercase tracking-wider text-fd-primary font-bold">
            {tab.tag}
          </span>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-1">
          {TABS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(idx)}
              className={`border-b-2 px-2.5 py-1 text-[11px] transition-colors cursor-pointer ${
                activeTab === idx
                  ? 'border-fd-primary text-fd-foreground font-semibold bg-fd-background'
                  : 'border-transparent text-fd-muted-foreground hover:text-fd-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            type="button"
            onClick={handleCopy}
            className="ms-2 flex items-center gap-1 border border-fd-border bg-fd-background px-2.5 py-1 text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-primary transition-colors cursor-pointer"
            title="Copy snippet"
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-500" />
                <span className="uppercase text-emerald-500 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span className="uppercase">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Command Execution Bar */}
      <div className="border-b border-fd-border bg-fd-background px-4 py-2 text-[11px] text-fd-muted-foreground flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-fd-primary font-bold select-none">$</span>
          <span className="text-fd-foreground font-semibold">{tab.command}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span className="text-fd-muted-foreground uppercase">NODE: CLOUD-EDGE-01</span>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-fd-border">
        {/* Code Content */}
        <div className="lg:col-span-7 p-4 overflow-x-auto bg-fd-card/40 max-h-[380px]">
          <pre className="text-[12px] leading-relaxed text-fd-foreground font-mono">
            <code>{tab.code}</code>
          </pre>
        </div>

        {/* Live Output Simulation */}
        <div className="lg:col-span-5 p-4 bg-fd-background max-h-[380px] overflow-y-auto">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-fd-border text-[10px] uppercase font-bold tracking-widest text-fd-muted-foreground">
            <span>LIVE EXECUTION OUTPUT</span>
            <span className="text-emerald-500">200 OK</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            {tab.output.map((line, i) => (
              <div
                key={i}
                className={
                  line.startsWith('✓') || line.includes('SUCCESS')
                    ? 'text-emerald-500 font-semibold'
                    : line.startsWith('Apply complete') || line.startsWith('Running job') || line.includes('Outputs:')
                    ? 'text-fd-primary font-medium'
                    : 'text-fd-muted-foreground'
                }
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Status Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-fd-border bg-fd-muted/30 px-4 py-1.5 text-[10px] text-fd-muted-foreground uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span>PARSER: VERIFIED</span>
          <span className="text-fd-border">//</span>
          <span>COMPLIANCE: CIS HARDENED</span>
        </div>
        <div className="flex items-center gap-3">
          <span>FORMAT: YAML / HCL / BASH</span>
          <span className="text-fd-border">//</span>
          <span>READY TO COPY</span>
        </div>
      </div>
    </div>
  )
}
