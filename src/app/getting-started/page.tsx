import Link from "next/link";
import {
  Code,
  BarChart2,
  Database,
  Terminal,
  GitBranch,
  Server,
  Workflow,
  BookOpen,
  Puzzle,
  Award,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Route,
} from "lucide-react";
import { StatusPill } from "@/components/shared/StatusPill";
import { HudEyebrow } from "@/components/shared/HudEyebrow";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Explicit Tailwind classes per level — dynamic `bg-${color}-*` strings never
// compile with Tailwind's static extraction.
const LEVEL_STYLES = {
  Beginner: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: "bg-emerald-500/10 text-emerald-500",
    dot: "border-emerald-500",
  },
  Intermediate: {
    badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    icon: "bg-cyan-500/10 text-cyan-500",
    dot: "border-cyan-500",
  },
  Advanced: {
    badge: "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    icon: "bg-purple-500/10 text-purple-500",
    dot: "border-purple-500",
  },
  Expert: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: "bg-amber-500/10 text-amber-500",
    dot: "border-amber-500",
  },
} as const;

const ROADMAP = [
  {
    position: "left",
    level: "Beginner",
    title: "Linux & Command Line Basics",
    description: "Learn the fundamentals of Linux operating system and shell scripting.",
    icon: Terminal,
    link: "/categories",
  },
  {
    position: "right",
    level: "Beginner",
    title: "Version Control with Git",
    description: "Master Git workflow, branching strategies, and collaboration.",
    icon: GitBranch,
    link: "/Version-Control",
  },
  {
    position: "left",
    level: "Intermediate",
    title: "Containerization with Docker",
    description: "Learn to build, deploy and manage containers.",
    icon: Puzzle,
    link: "/Containerization/Docker",
  },
  {
    position: "right",
    level: "Intermediate",
    title: "CI/CD Pipelines",
    description: "Implement continuous integration and delivery workflows.",
    icon: Workflow,
    link: "/CI-CD",
  },
  {
    position: "left",
    level: "Advanced",
    title: "Infrastructure as Code",
    description: "Automate infrastructure provisioning with Terraform and Ansible.",
    icon: Code,
    link: "/Infrastructure-Management",
  },
  {
    position: "right",
    level: "Advanced",
    title: "Kubernetes Orchestration",
    description: "Deploy and scale containerized applications with Kubernetes.",
    icon: Server,
    link: "/Containerization/Kubernetes",
  },
  {
    position: "left",
    level: "Expert",
    title: "Monitoring & Observability",
    description: "Implement logging, monitoring, and alerting solutions.",
    icon: BarChart2,
    link: "/Monitoring",
  },
  {
    position: "right",
    level: "Expert",
    title: "Cloud Platforms",
    description: "Master AWS, Azure, or GCP cloud services and architecture.",
    icon: Database,
    link: "/Cloud",
  },
] as const;

const LIFECYCLE = [
  { step: "1", title: "Plan", description: "Define requirements and create roadmap", color: "text-red-500 bg-red-500/10" },
  { step: "2", title: "Code", description: "Write and review code", color: "text-cyan-500 bg-cyan-500/10" },
  { step: "3", title: "Build", description: "Compile and build artifacts", color: "text-emerald-500 bg-emerald-500/10" },
  { step: "4", title: "Test", description: "Automated testing and quality checks", color: "text-amber-500 bg-amber-500/10" },
  { step: "5", title: "Deploy", description: "Release to production environment", color: "text-purple-500 bg-purple-500/10" },
  { step: "6", title: "Monitor", description: "Observe and improve continuously", color: "text-blue-500 bg-blue-500/10" },
] as const;

const FAQS = [
  {
    question: "What skills do I need to become a DevOps engineer?",
    answer:
      "A good DevOps engineer should have skills in Linux administration, networking basics, programming/scripting (Python, Bash), cloud platforms, containers, CI/CD, infrastructure as code, and monitoring tools. Strong problem-solving and communication skills are also essential.",
  },
  {
    question: "How long does it take to learn DevOps?",
    answer:
      "The time to learn DevOps varies depending on your background and dedication. With a technical background, you can grasp the basics in 3-6 months. Becoming proficient typically takes 1-2 years of continuous learning and practical experience.",
  },
  {
    question: "Should I learn Docker or Kubernetes first?",
    answer:
      "You should start with Docker before moving to Kubernetes. Docker teaches you containerization concepts, which are fundamental to understanding Kubernetes. Once you are comfortable with Docker, Kubernetes will be easier to grasp as it builds upon those concepts.",
  },
  {
    question: "Which cloud provider should I learn first - AWS, Azure, or GCP?",
    answer:
      "AWS is often recommended for beginners due to its market dominance and extensive documentation. However, the best choice depends on your career goals and local job market. The core concepts you learn will be transferable between cloud providers.",
  },
  {
    question: "Is DevOps a good career path?",
    answer:
      "Yes, DevOps is an excellent career path with strong demand, competitive salaries, and opportunities for growth. As organizations continue to adopt cloud and automation technologies, the need for skilled DevOps professionals continues to increase.",
  },
] as const;

export default function GettingStartedPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-cyber-grid mask-fade-b relative pb-16 pt-14 sm:pt-20">
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal className="mb-6 flex justify-center">
              <StatusPill label="LEARNING PATH // FUNDAMENTALS TO EXPERT" badge="GUIDED" />
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mb-6 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
                Getting Started with <span className="text-gradient">DevOps</span>
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
                A step-by-step guide to modern DevOps practices, tools, and workflows
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#roadmap">
                  <Button size="lg" className="w-full cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-purple-700 sm:w-auto">
                    <Route className="h-4 w-4" />
                    View Roadmap
                  </Button>
                </a>
                <Link href="/categories">
                  <Button size="lg" variant="outline" className="w-full cursor-pointer rounded-xl border-border/80 font-mono text-xs sm:w-auto">
                    Explore Categories
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What is DevOps */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <HudEyebrow className="mb-4 uppercase">DevOps Fundamentals</HudEyebrow>
            <h2 className="mb-6 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              What is DevOps?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
              DevOps is a set of practices that combines software development (Dev) and IT
              operations (Ops). It aims to shorten the systems development life cycle and provide
              continuous delivery with high quality.
            </p>

            <div className="space-y-4">
              {[
                { text: "Improved collaboration between development and operations teams", icon: Users },
                { text: "Faster delivery of features and fixes", icon: Zap },
                { text: "More stable operating environments", icon: Server },
                { text: "Better resource utilization", icon: BarChart2 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Lifecycle card */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute inset-0 rotate-3 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
              <div className="hud-panel relative -rotate-2 rounded-3xl p-8 shadow-lg transition-transform duration-500 hover:rotate-0">
                <div className="mb-6 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  The DevOps Lifecycle
                </div>
                <div className="space-y-5">
                  {LIFECYCLE.map((phase) => (
                    <div key={phase.step} className="flex items-center gap-4 border-b border-border/60 pb-5 last:border-0 last:pb-0">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${phase.color}`}>
                        {phase.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{phase.title}</h3>
                        <p className="text-sm text-muted-foreground">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section id="roadmap" className="scroll-mt-24 border-y border-border/60 bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Step-by-Step Guide"
              eyebrowIcon={Route}
              title={<>DevOps Learning <span className="text-gradient">Roadmap</span></>}
              description="Follow this guided path to master DevOps skills from fundamentals to advanced topics"
            />
          </Reveal>

          <div className="relative">
            {/* Timeline spine */}
            <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/40 to-purple-500/50 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {ROADMAP.map((item, index) => {
                const styles = LEVEL_STYLES[item.level];
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={Math.min(index * 0.04, 0.2)}>
                    <div
                      className={`relative flex flex-col items-start md:flex-row md:items-center ${
                        item.position === "left" ? "md:justify-start" : "md:justify-end"
                      }`}
                    >
                      {/* Timeline node */}
                      <div
                        className={`absolute left-4 top-6 z-10 h-8 w-8 -translate-x-1/2 rounded-full border-4 bg-background shadow-md md:left-1/2 md:top-1/2 md:-translate-y-1/2 ${styles.dot}`}
                      />

                      <div
                        className={`relative ml-12 w-full max-w-xl md:ml-0 md:w-[calc(50%-2rem)] ${
                          item.position === "right" ? "md:ml-12" : "md:mr-12"
                        }`}
                      >
                        <GlowCard className="rounded-2xl">
                          <div className="hud-panel rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                            <Badge variant="outline" className={`mb-4 font-mono text-[10px] ${styles.badge}`}>
                              {item.level}
                            </Badge>
                            <div className="flex items-start gap-4">
                              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="mb-2 font-mono text-lg font-bold text-foreground">
                                  {item.title}
                                </h3>
                                <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>
                                <Link
                                  href={item.link}
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                                >
                                  <span>Learn more</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </GlowCard>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Essential Tools */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Essential Resources"
              eyebrowIcon={Puzzle}
              title={<>DevOps Toolkit: <span className="text-gradient">Must-Have Tools</span></>}
              description="Explore these essential tools that every DevOps engineer should be familiar with"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Git",
                category: "Version Control",
                icon: GitBranch,
                description: "Distributed version control system for tracking changes in source code.",
                link: "/Version-Control/GitHub",
              },
              {
                name: "Docker",
                category: "Containerization",
                icon: Puzzle,
                description: "Platform for developing, shipping, and running applications in containers.",
                link: "/Containerization/Docker",
              },
              {
                name: "Jenkins",
                category: "CI/CD",
                icon: Workflow,
                description: "Open-source automation server for building, testing, and deploying code.",
                link: "/CI-CD/Jenkins",
              },
              {
                name: "Kubernetes",
                category: "Orchestration",
                icon: Server,
                description: "Container orchestration system for automating deployment and scaling.",
                link: "/Containerization/Kubernetes",
              },
              {
                name: "Terraform",
                category: "Infrastructure as Code",
                icon: Code,
                description: "Tool for building, changing, and versioning infrastructure safely.",
                link: "/Infrastructure-Management/Terraform",
              },
              {
                name: "Prometheus",
                category: "Monitoring",
                icon: BarChart2,
                description: "Monitoring and alerting toolkit designed for reliability and scalability.",
                link: "/Monitoring/Prometheus",
              },
            ].map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Reveal key={tool.name} delay={(index % 3) * 0.06}>
                  <GlowCard className="h-full">
                    <Link href={tool.link} className="group block h-full">
                      <div className="h-full rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="rounded-lg border border-border/40 bg-secondary/80 px-2.5 py-1 font-mono text-[11px] text-secondary-foreground">
                            {tool.category}
                          </span>
                        </div>

                        <h3 className="mb-2 font-mono text-xl font-bold text-foreground group-hover:text-primary">
                          {tool.name}
                        </h3>
                        <p className="mb-5 text-sm text-muted-foreground">{tool.description}</p>

                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                          <span>Open cheatsheet</span>
                          <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                        </span>
                      </div>
                    </Link>
                  </GlowCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="border-y border-border/60 bg-muted/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="gradient-border overflow-hidden rounded-3xl shadow-xl">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <HudEyebrow className="mb-4 uppercase">Need Help?</HudEyebrow>
                  <h2 className="mb-6 text-3xl font-black tracking-tight text-foreground">
                    Join our DevOps Community
                  </h2>
                  <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Connect with fellow DevOps engineers, ask questions, share knowledge, and grow
                    together.
                  </p>

                  <div className="mb-8 space-y-4">
                    {[
                      { text: "Access to exclusive resources and guides", icon: BookOpen },
                      { text: "Direct help from experienced professionals", icon: HelpCircle },
                      { text: "Regular webinars and learning sessions", icon: Award },
                      { text: "Network with industry experts", icon: Users },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.text} className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                          <p className="text-sm text-foreground/90">{item.text}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a href="https://discord.gg/devops" target="_blank" rel="noopener noreferrer">
                      <Button className="cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-white shadow-md hover:from-cyan-600 hover:to-purple-700">
                        Join Discord Community
                      </Button>
                    </a>
                    <Link href="/contribute">
                      <Button variant="outline" className="cursor-pointer rounded-xl border-border/80 font-mono text-xs">
                        Contribute to Cheatsheet
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-cyber-grid relative hidden bg-zinc-950 md:block">
                  <div className="hero-glow absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-4xl font-black text-cyan-400 backdrop-blur-sm">
                        5k
                      </div>
                      <h3 className="mb-2 font-mono text-2xl font-bold text-white">5000+ Members</h3>
                      <p className="text-sm text-zinc-400">
                        Join our growing community of DevOps professionals
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Common Questions"
              eyebrowIcon={HelpCircle}
              title="Frequently Asked Questions"
              description="Find answers to the most common questions about getting started with DevOps"
            />
          </Reveal>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.04}>
                <details className="group rounded-2xl border border-border/80 bg-card shadow-sm transition-all open:shadow-md [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-semibold text-foreground marker:content-none">
                    <span className="text-base">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="border-t border-border/60 px-6 py-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Still have questions? We&apos;re here to help!
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-6 py-3 font-mono text-xs font-semibold text-primary transition-all hover:border-primary/40 hover:shadow-md"
            >
              <span>Contact our team</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
