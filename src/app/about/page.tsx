"use client";

import { useState } from "react";
import {
  Github,
  Globe,
  FileText,
  BookOpen,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  ArrowRight,
  Star,
  Code,
  Server,
  Activity,
  Zap,
  Quote,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HudEyebrow } from "@/components/shared/HudEyebrow";
import { StatusPill } from "@/components/shared/StatusPill";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { GlowCard } from "@/components/shared/GlowCard";
import { cn } from "@/lib/utils";

// Explicit Tailwind classes per skill category — dynamic `text-${color}-*`
// strings never compile with Tailwind's static extraction.
const SKILL_SETS = [
  {
    category: "Cloud Platforms",
    skills: ["AWS", "Azure", "GCP", "Digital Ocean"],
    classes: "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    category: "Containers & Orchestration",
    skills: ["Docker", "Kubernetes", "Helm", "Podman"],
    classes: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    category: "Infrastructure as Code",
    skills: ["Terraform", "Ansible", "CloudFormation", "Pulumi"],
    classes: "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    category: "CI/CD & Monitoring",
    skills: ["Jenkins", "GitHub Actions", "Prometheus", "Grafana"],
    classes: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] as const;

const TABS = [
  { id: "about", label: "About Me" },
  { id: "expertise", label: "Expertise" },
  { id: "resources", label: "Resources" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabId>("about");

  const stats = [
    { label: "GitHub Stars", value: 3.5, suffix: "K+", decimals: 1 },
    { label: "Resources", value: 900, suffix: "+", decimals: 0 },
    { label: "Projects", value: 50, suffix: "+", decimals: 0 },
    { label: "Happy Users", value: 10, suffix: "K+", decimals: 0 },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-cyber-grid mask-fade-b relative pb-14 pt-16 sm:pt-20">
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex justify-center">
              <StatusPill label="AUTHOR PROFILE // PRODEVOPSGUYTECH" badge="ONLINE" />
            </div>

            <div className="relative mb-8 inline-block">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-70 blur-md" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://avatars.githubusercontent.com/NotHarshhaa"
                alt="Harshhaa"
                className="relative h-36 w-36 rounded-full border-4 border-card shadow-xl"
              />
            </div>

            <HudEyebrow icon={User} className="mb-3 justify-center uppercase">
              The Engineer Behind The Hub
            </HudEyebrow>
            <h1 className="mb-4 font-mono text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Hey there! <span className="text-gradient">I&apos;m Harshhaa</span> 👋
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
              A passionate DevOps Engineer on a mission to automate everything and scale cloud
              infrastructures efficiently.
            </p>

            {/* Stats */}
            <div className="mx-auto mb-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="font-mono text-2xl font-black text-primary">
                    {stat.decimals > 0 ? (
                      <>{stat.value}{stat.suffix}</>
                    ) : (
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mb-4 inline-flex rounded-2xl border border-border/80 bg-secondary/60 p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "about" && (
              <div className="grid gap-8 md:grid-cols-2">
                <div className="hud-panel h-full rounded-2xl p-8 shadow-md">
                  <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                    <Server className="h-6 w-6 text-primary" />
                    My Journey
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    <p>
                      I&apos;m a seasoned DevOps Engineer passionate about building efficient,
                      scalable systems. My journey began with a curiosity about how things work
                      behind the scenes in software development.
                    </p>
                    <p>
                      Today, I specialize in cloud infrastructure, automation, and helping teams
                      deliver software faster and more reliably through DevOps practices.
                    </p>
                    <p>
                      I believe in sharing knowledge and creating resources that help others grow
                      in their DevOps journey. That&apos;s why I&apos;ve built this DevOps
                      Cheatsheet Hub!
                    </p>
                  </div>
                </div>

                <div className="hud-panel rounded-2xl p-8 shadow-md">
                  <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                    <Code className="h-6 w-6 text-purple-500" />
                    Connect With Me
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Globe, title: "Portfolio", url: "https://notharshhaa.site/" },
                      { icon: FileText, title: "Resume", url: "https://cv.notharshhaa.site/" },
                      { icon: BookOpen, title: "Blog", url: "https://blog.notharshhaa.site/" },
                      { icon: LinkIcon, title: "Links", url: "https://link.notharshhaa.site/" },
                    ].map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.title}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 p-4 transition-all hover:border-primary/40 hover:bg-primary/5"
                        >
                          <div className="text-primary transition-transform group-hover:scale-110">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{link.title}</span>
                          <ArrowRight className="ml-auto h-4 w-4 -translate-x-2 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-8 border-t border-border/60 pt-6">
                    <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Follow me on social media
                    </h3>
                    <div className="flex gap-3">
                      {[
                        { icon: Github, url: "https://github.com/NotHarshhaa" },
                        { icon: Twitter, url: "https://twitter.com/NotHarshhaa" },
                        { icon: Linkedin, url: "https://linkedin.com/in/harshhaa-vardhan-reddy" },
                      ].map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-secondary/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "expertise" && (
              <div className="grid gap-8 md:grid-cols-2">
                <div className="hud-panel rounded-2xl p-8 shadow-md">
                  <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                    <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                    Core Expertise
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        icon: Server,
                        color: "bg-cyan-500/10 text-cyan-500",
                        title: "Cloud & DevOps Architecture",
                        text: "Architecting scalable, secure, and high-performance infrastructures using AWS, Azure, Kubernetes, Terraform, and more.",
                      },
                      {
                        icon: Activity,
                        color: "bg-emerald-500/10 text-emerald-500",
                        title: "Automation & CI/CD",
                        text: "Building robust automation pipelines, Infrastructure as Code (IaC), and making deployments seamless with Jenkins, GitHub Actions, and GitLab CI.",
                      },
                      {
                        icon: Zap,
                        color: "bg-purple-500/10 text-purple-500",
                        title: "Content Creation",
                        text: "Creating educational content, writing technical blogs, and building projects to help others learn DevOps concepts and tools.",
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex items-start gap-4">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm ${item.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="gradient-border rounded-2xl p-8 shadow-md">
                  <h2 className="mb-6 font-mono text-2xl font-bold text-foreground">
                    Skills & Technologies
                  </h2>
                  <div className="space-y-6">
                    {SKILL_SETS.map((skillSet) => (
                      <div key={skillSet.category}>
                        <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {skillSet.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {skillSet.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`rounded-lg border px-3 py-1 font-mono text-xs font-medium ${skillSet.classes}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-8">
                <div className="hud-panel rounded-2xl p-8 shadow-md">
                  <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                    <Globe className="h-6 w-6 text-primary" />
                    DevOps Learning Ecosystem
                  </h2>
                  <p className="mb-8 text-sm text-muted-foreground sm:text-base">
                    I&apos;ve created an ecosystem for DevOps enthusiasts, job-seekers, and
                    practitioners — designed to make learning practical and accessible:
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[
                      {
                        title: "Projects Hub",
                        emoji: "💻",
                        url: "https://projects.prodevopsguytech.com",
                        desc: "Work on real-world DevOps/Cloud projects",
                      },
                      {
                        title: "Docs Portal",
                        emoji: "📚",
                        url: "https://docs.prodevopsguytech.com",
                        desc: "900+ curated learning materials",
                      },
                      {
                        title: "Repositories Central",
                        emoji: "📦",
                        url: "https://repos.prodevopsguytech.com",
                        desc: "Scripts, infra, prep content, and more",
                      },
                      {
                        title: "Jobs Portal",
                        emoji: "🧭",
                        url: "https://jobs.prodevopsguytech.com",
                        desc: "Find your next opportunity in DevOps or Cloud",
                      },
                      {
                        title: "DevOps Blog",
                        emoji: "📰",
                        url: "https://blog.prodevopsguytech.com",
                        desc: "Learn from deep dives and practical guides",
                      },
                      {
                        title: "Cloud Blog",
                        emoji: "☁️",
                        url: "https://cloud.prodevopsguytech.com",
                        desc: "Cloud-focused tutorials and insights",
                      },
                    ].map((resource) => (
                      <GlowCard key={resource.title} className="rounded-xl">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block rounded-xl border border-border/60 bg-background/60 p-5 transition-all hover:border-primary/40"
                        >
                          <h3 className="mb-2 font-mono text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                            <span className="mr-1.5">{resource.emoji}</span>
                            {resource.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{resource.desc}</p>
                          <div className="mt-4 flex justify-end">
                            <ArrowRight className="h-4 w-4 translate-x-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                          </div>
                        </a>
                      </GlowCard>
                    ))}
                  </div>
                </div>

                <div className="gradient-border rounded-2xl p-8 shadow-md">
                  <div className="md:flex items-center justify-between gap-6">
                    <div className="mb-6 md:mb-0">
                      <h2 className="mb-2 font-mono text-2xl font-bold text-foreground">
                        DevOps Tools Setup/Installations
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Step-by-step guides for setting up all the popular DevOps tools
                      </p>
                    </div>
                    <a
                      href="https://devopsguides.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-cyan-600 hover:to-purple-700"
                    >
                      <span>Check it out</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quote */}
      <section className="border-t border-border/60 bg-muted/20 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Quote className="mx-auto mb-4 h-10 w-10 text-primary/40" />
            <blockquote className="mx-auto mb-6 max-w-3xl font-mono text-2xl font-medium text-foreground md:text-3xl">
              &ldquo;DevOps is not a goal, but a never-ending process of continual
              improvement.&rdquo;
            </blockquote>
            <p className="font-mono text-sm text-muted-foreground">— Jez Humble</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
