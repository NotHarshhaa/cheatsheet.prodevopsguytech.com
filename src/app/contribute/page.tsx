"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Code,
  Star,
  Users,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Rocket,
  Heart,
  Smile,
  MessageSquare,
  ArrowRight,
  Check,
  GitPullRequest,
  Quote,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { HudEyebrow } from "@/components/shared/HudEyebrow";
import { StatusPill } from "@/components/shared/StatusPill";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Reveal } from "@/components/shared/Reveal";
import { GlowCard } from "@/components/shared/GlowCard";
import { cn } from "@/lib/utils";

const GITHUB_REPO = "https://github.com/NotHarshhaa/devops-cheatsheet";

const CONTRIBUTION_STEPS = [
  {
    icon: Github,
    title: "Fork the Repository",
    description:
      "Start by forking the DevOps Cheatsheet repository to your GitHub account. This creates your own copy of the project to work with.",
    link: `${GITHUB_REPO}/fork`,
    linkText: "Fork Now",
    accent: "border-cyan-500/30 bg-cyan-500/10 text-cyan-500",
    dot: "border-cyan-500",
  },
  {
    icon: Code,
    title: "Make Your Changes",
    description:
      "Add new tools, update existing content, or fix issues in your forked repository. Follow our contribution guidelines for best results.",
    link: `${GITHUB_REPO}/blob/master/CONTRIBUTING.md`,
    linkText: "View Guidelines",
    accent: "border-purple-500/30 bg-purple-500/10 text-purple-500",
    dot: "border-purple-500",
  },
  {
    icon: GitPullRequest,
    title: "Submit a Pull Request",
    description:
      "Create a pull request with your changes for review by the maintainers. We'll help you get your contribution ready to merge.",
    link: `${GITHUB_REPO}/pulls`,
    linkText: "Create PR",
    accent: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
    dot: "border-emerald-500",
  },
] as const;

const CONTRIBUTION_AREAS = [
  {
    title: "Add New Tools",
    description:
      "Share your knowledge about DevOps tools not yet covered in the cheatsheet. Expand our resources to help others discover new technologies.",
    icon: BookOpen,
    accent: "bg-cyan-500/10 text-cyan-500",
  },
  {
    title: "Improve Documentation",
    description:
      "Help make our documentation more comprehensive and easier to understand. Clear explanations and examples make learning DevOps more accessible.",
    icon: MessageSquare,
    accent: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Fix Issues",
    description:
      "Help resolve open issues and improve the quality of the cheatsheet. Every bug fix and enhancement makes the project more valuable to the community.",
    icon: CheckCircle2,
    accent: "bg-emerald-500/10 text-emerald-500",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Contributing to this project helped me solidify my DevOps knowledge while helping others.",
    author: "Sarah K.",
    role: "Senior DevOps Engineer",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    quote:
      "The maintainers were so helpful in guiding me through my first open-source contribution!",
    author: "Michael T.",
    role: "Cloud Architect",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    quote:
      "I've learned so much by collaborating with this amazing community of DevOps professionals.",
    author: "Jamie L.",
    role: "SRE Lead",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
] as const;

const GUIDELINES = [
  "Ensure your contribution follows our code of conduct and style guidelines",
  "Test your changes locally before submitting a pull request",
  "Include clear commit messages and documentation updates",
  "Be responsive to feedback and questions about your contribution",
  "Help review other contributions when possible",
  "Follow the pull request template for better documentation",
  "Add appropriate tests when implementing new features",
  "Update documentation when necessary",
] as const;

export default function ContributePage() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance the step spotlight unless the user prefers reduced motion.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === CONTRIBUTION_STEPS.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-cyber-grid mask-fade-b relative pb-16 pt-14 sm:pt-20">
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-6 flex justify-center">
              <StatusPill label="OPEN SOURCE // COMMUNITY DRIVEN" badge="JOIN US" />
            </div>

            <HudEyebrow icon={Heart} className="mb-3 justify-center uppercase">
              Join our community
            </HudEyebrow>
            <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-6xl">
              Contribute to <span className="text-gradient">DevOps Cheatsheet</span>
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-xl">
              Help us make DevOps knowledge more accessible to everyone. Your contributions, big
              or small, make a significant difference!
            </p>

            <div className="mb-10 flex flex-wrap justify-center gap-8 font-mono text-xs">
              {[
                { icon: Users, label: "Contributors", value: 100, suffix: "+" },
                { icon: Star, label: "Stars", value: 500, suffix: "+" },
                { icon: GitPullRequest, label: "PRs Merged", value: 200, suffix: "+" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-foreground">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span>{stat.label}</span>
                  </div>
                );
              })}
            </div>

            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-purple-700 hover:shadow-xl"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
          </Reveal>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* How to Contribute */}
        <section className="mb-24">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Simple Process"
              eyebrowIcon={Rocket}
              title="How to Contribute"
              description="Follow these steps to make your first contribution to our DevOps Cheatsheet"
            />
          </Reveal>

          <div className="relative flex flex-col gap-10 md:flex-row md:gap-8">
            {/* Step spine */}
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-cyan-500/50 via-purple-500/40 to-emerald-500/50 md:block" />

            {CONTRIBUTION_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              return (
                <Reveal key={step.title} delay={index * 0.08} className="flex-1">
                  <div
                    className={cn(
                      "relative h-full transition-all duration-300 md:scale-100",
                      isActive && "md:scale-105"
                    )}
                  >
                    {/* Step node */}
                    <div
                      className={cn(
                        "absolute -top-4 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-4 bg-background font-mono text-xs font-bold shadow-md",
                        step.dot,
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </div>

                    <GlowCard
                      className="h-full rounded-2xl"
                      glowRgb={index === 0 ? "34 211 238" : index === 1 ? "168 85 247" : "16 185 129"}
                    >
                      <div
                        className={cn(
                          "flex h-full flex-col items-center rounded-2xl border bg-card p-8 pt-10 text-center shadow-md transition-all",
                          isActive ? "border-primary/50 shadow-lg" : "border-border/80"
                        )}
                      >
                        <div className={cn("mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border", step.accent)}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="mb-4 font-mono text-xl font-bold text-foreground">
                          {step.title}
                        </h3>
                        <p className="mb-6 min-h-20 text-sm text-muted-foreground">
                          {step.description}
                        </p>
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 font-mono text-xs font-semibold transition-all hover:shadow-md",
                            step.accent
                          )}
                        >
                          {step.linkText}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </GlowCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* What You Can Contribute */}
        <section className="mb-24">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Opportunities"
              eyebrowIcon={Lightbulb}
              title="What You Can Contribute"
              description="There are many ways to help improve the DevOps Cheatsheet"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {CONTRIBUTION_AREAS.map((area, index) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.title} delay={index * 0.08}>
                  <GlowCard className="h-full rounded-2xl">
                    <div className="h-full rounded-2xl border border-border/80 bg-card p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                      <div className={cn("mb-6 flex h-16 w-16 items-center justify-center rounded-2xl", area.accent)}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-4 font-mono text-xl font-bold text-foreground">{area.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{area.description}</p>
                    </div>
                  </GlowCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-24">
          <Reveal>
            <div className="hud-panel rounded-3xl p-8 shadow-lg lg:p-12">
              <div className="mb-12 text-center">
                <HudEyebrow icon={Smile} className="mb-3 justify-center uppercase">
                  Contributor Stories
                </HudEyebrow>
                <h2 className="text-3xl font-black tracking-tight text-foreground">
                  Hear From Our Contributors
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {TESTIMONIALS.map((testimonial) => (
                  <div
                    key={testimonial.author}
                    className="relative rounded-2xl border border-border/60 bg-background/60 p-6"
                  >
                    <Quote className="absolute -left-2 -top-2 h-7 w-7 rounded-full bg-card p-1.5 text-primary" />
                    <blockquote className="mb-6 text-sm italic leading-relaxed text-foreground/90">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="h-11 w-11 rounded-full border border-border/60 object-cover"
                        width={44}
                        height={44}
                      />
                      <div>
                        <div className="text-sm font-semibold text-foreground">{testimonial.author}</div>
                        <div className="font-mono text-xs text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl shadow-xl">
            <div className="bg-cyber-grid relative bg-zinc-950 p-12 text-center md:p-16">
              <div className="hero-glow pointer-events-none absolute inset-0" />

              <div className="relative z-[1]">
                <UserRound className="mx-auto mb-6 h-14 w-14 text-cyan-400" />
                <h2 className="mb-6 font-mono text-3xl font-bold text-white">
                  Ready to Make Your First Contribution?
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-sm text-zinc-400 sm:text-base">
                  Whether you&apos;re fixing a typo or adding a new tool guide, every contribution
                  helps make DevOps Cheatsheet better for everyone. Join our growing community
                  today!
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={GITHUB_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-zinc-900 shadow-md transition-colors hover:bg-zinc-100"
                  >
                    <Github className="h-5 w-5" />
                    View on GitHub
                  </a>
                  <Link
                    href="/categories"
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-6 py-3 font-medium text-zinc-100 shadow-md backdrop-blur-sm transition-colors hover:bg-zinc-800"
                  >
                    <BookOpen className="h-5 w-5" />
                    Browse Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Guidelines */}
        <Reveal className="mt-24">
          <div className="hud-panel relative overflow-hidden rounded-3xl p-8 shadow-md">
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <h2 className="mb-6 flex items-center font-mono text-2xl font-bold text-foreground">
              <BookOpen className="mr-3 h-6 w-6 text-primary" />
              Contribution Guidelines
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {GUIDELINES.map((guideline) => (
                <div key={guideline} className="flex items-start gap-3">
                  <div className="mt-0.5 flex shrink-0 rounded-full bg-emerald-500/10 p-1 text-emerald-500">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-foreground/90">{guideline}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border/60 pt-8">
              <a
                href={`${GITHUB_REPO}/blob/master/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/60 px-6 py-3 font-mono text-xs font-semibold text-primary transition-all hover:border-primary/40 hover:shadow-md"
              >
                Read full guidelines
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
