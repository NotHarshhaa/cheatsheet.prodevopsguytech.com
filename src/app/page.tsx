import { SearchBar } from "@/components/SearchBar";
import { HomeFilters } from "@/components/HomeFilters";
import { HeroTerminal } from "@/components/HeroTerminal";
import { StatusPill } from "@/components/shared/StatusPill";
import { HudEyebrow } from "@/components/shared/HudEyebrow";
import { Reveal } from "@/components/shared/Reveal";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { GlowCard } from "@/components/shared/GlowCard";
import Link from "next/link";
import { categories, categoryData } from "@/utils/categoryData";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  ShieldCheck,
  Zap,
  Github,
  Layers,
} from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { CategoryActions } from "@/components/CategoryActions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

export const dynamic = 'force-static';
export const revalidate = false;

// Sample preview tools per category for the bento tags
const CATEGORY_TAGS: Record<string, string[]> = {
  'CI-CD': ['GitHub Actions', 'GitLab CI', 'Jenkins', 'ArgoCD'],
  'Containerization': ['Docker', 'Kubernetes', 'Helm', 'Podman'],
  'Cloud': ['AWS', 'Google Cloud', 'Azure', 'Cloudflare'],
  'Infrastructure-Management': ['Terraform', 'Ansible', 'Pulumi', 'Vagrant'],
  'Version-Control': ['Git Flow', 'Branching', 'Rebase', 'Hooks'],
  'Security': ['Vault', 'Trivy', 'Falco', 'OWASP'],
  'Networking': ['Nginx', 'Envoy', 'DNS', 'Cilium'],
  'Monitoring': ['Prometheus', 'Grafana', 'ELK Stack', 'OpenTelemetry'],
};

// Rotating glow colors for the category bento grid (RGB triplets)
const GLOW_COLORS = ['34 211 238', '59 130 246', '168 85 247'];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-cyber-grid mask-fade-b relative pb-16 pt-8 sm:pb-24 sm:pt-14">
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Status telemetry pill */}
          <Reveal className="mb-6 flex justify-center">
            <StatusPill label="DEVOPS COMMAND CENTER // PRODUCTION CHEATSHEETS" />
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={0.05} className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Production DevOps <br />
              <span className="text-gradient-animated font-mono">Command Cheatsheets</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-base font-normal leading-relaxed text-muted-foreground sm:text-xl">
              Instant syntax, cloud architecture templates, container commands, and automation scripts curated for engineers who build fast.
            </p>

            {/* Elevated Search Bar */}
            <div className="mx-auto mb-6 max-w-2xl">
              <Suspense fallback={<div className="h-14 animate-pulse rounded-2xl bg-muted" />}>
                <SearchBar />
              </Suspense>
            </div>

            {/* Quick Filter Tag Pills */}
            <div className="mx-auto mb-14 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-xs">
              <span className="mr-1 font-mono text-[11px] text-muted-foreground">Trending:</span>
              {[
                { label: 'kubernetes', path: '/Containerization/Kubernetes' },
                { label: 'docker', path: '/Containerization/Docker' },
                { label: 'terraform', path: '/Infrastructure-Management/Terraform' },
                { label: 'github-actions', path: '/CI-CD/GitHub-Actions' },
                { label: 'prometheus', path: '/Monitoring/Prometheus' },
                { label: 'security', path: '/Security' },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.path}
                  className="rounded-lg border border-border/60 bg-secondary/80 px-2.5 py-1 font-mono text-xs transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  #{tag.label}
                </Link>
              ))}
            </div>

            {/* Live Interactive Terminal */}
            <Reveal delay={0.1} className="relative mx-auto max-w-3xl text-left">
              <div className="group relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-80 blur-xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <HeroTerminal />
                </div>
              </div>
            </Reveal>
          </Reveal>

          {/* Metrics Strip */}
          <Reveal delay={0.15}>
            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {[
                { value: 200, suffix: '+', label: 'Curated Guides', icon: Zap, color: 'text-amber-500' },
                { value: 8, suffix: '', label: 'Core Hubs', icon: Layers, color: 'text-cyan-500' },
                { value: 100, suffix: '%', label: 'Free & Open Source', icon: ShieldCheck, color: 'text-emerald-500' },
                { value: 35, suffix: '+', label: 'Ready Cheatsheets', icon: Terminal, color: 'text-purple-500' },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative rounded-2xl border border-border/80 bg-card p-4 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md sm:p-5"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                      </span>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <div className="font-mono text-2xl font-black text-foreground sm:text-3xl">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter / Explore Section */}
      <section className="border-y border-border/60 bg-muted/20 py-14">
        <HomeFilters />
      </section>

      {/* Bento Grid Categories Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <HudEyebrow icon={Terminal} className="mb-2 uppercase">
                  Architectural Domains
                </HudEyebrow>
                <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  Explore DevOps Categories
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground sm:text-base">
                Specialized cheatsheets, command tables, and best practices organized by infrastructure pillar.
              </p>
            </div>
          </Reveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const data = categoryData[category];
              const tags = CATEGORY_TAGS[category] || [];
              const isFeatured = index === 1 || index === 3; // Containerization and Infrastructure

              return (
                <Reveal key={category} delay={(index % 3) * 0.08} className={isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}>
                  <GlowCard glowRgb={GLOW_COLORS[index % GLOW_COLORS.length]} className="h-full">
                    <Link href={`/${category}`} className="block h-full">
                      <Card className="group/card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-border/80 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                        {/* Corner glow on hover */}
                        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover/card:bg-primary/15" />

                        <CardContent className="z-[1] flex h-full flex-col p-6 sm:p-7">
                          {/* Top bar with icon and count */}
                          <div className="mb-5 flex items-start justify-between gap-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-primary group-hover/card:text-primary-foreground">
                              <CategoryIcon category={category} />
                            </div>
                            <Badge variant="secondary" className="gap-1 font-mono text-xs font-medium">
                              {data.toolCount}+ Cheatsheets
                            </Badge>
                          </div>

                          {/* Title & Description */}
                          <h3 className="mb-2 text-xl font-bold capitalize text-foreground transition-colors group-hover/card:text-primary">
                            {category.replace(/-/g, ' ')}
                          </h3>

                          <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {data.description}
                          </p>

                          {/* Tool Tags */}
                          <div className="mb-6 flex flex-wrap gap-1.5">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md border border-border/40 bg-secondary/80 px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Bottom action bar */}
                          <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-transform group-hover/card:translate-x-0.5">
                              <span>Browse Hub</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>

                            <CategoryActions category={category} />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </GlowCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="relative border-t border-border/60 bg-muted/10 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="gradient-border relative overflow-hidden rounded-3xl p-8 shadow-2xl sm:p-12">
              {/* Glow orbs */}
              <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 bg-gradient-to-tr from-blue-500/10 to-transparent blur-3xl" />

              <div className="relative z-[1] flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="max-w-xl text-left">
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-semibold uppercase text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Open Source Initiative</span>
                  </div>
                  <h2 className="mb-4 text-2xl font-black text-foreground sm:text-4xl">
                    Contribute New Tools & Command Cheatsheets
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    DevOps Cheatsheet Hub is built by engineers for engineers. Add new tools, enhance existing commands, or share your production workflows with the global DevOps community.
                  </p>
                </div>

                <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row md:flex-col">
                  <Link href="/contribute">
                    <Button
                      size="lg"
                      className="w-full cursor-pointer gap-2 rounded-xl border-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-purple-700"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Submit a Cheatsheet</span>
                    </Button>
                  </Link>
                  <a
                    href="https://github.com/NotHarshhaa/devops-cheatsheet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full cursor-pointer gap-2 rounded-xl border-border/80 font-mono text-xs hover:bg-accent"
                    >
                      <Github className="h-4 w-4" />
                      <span>Star on GitHub</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
