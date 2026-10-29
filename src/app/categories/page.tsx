import { Layers, Terminal, Grid3x3, Users } from "lucide-react";
import { categories, categoryData } from "@/utils/categoryData";
import { CategoryCard } from "@/components/CategoryCard";
import { cheatsheets } from "@/data/cheatsheets";
import { HudEyebrow } from "@/components/shared/HudEyebrow";
import { StatusPill } from "@/components/shared/StatusPill";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { Reveal } from "@/components/shared/Reveal";
import { GlowCard } from "@/components/shared/GlowCard";

export default function CategoriesPage() {
  const categoriesMap = cheatsheets.reduce(
    (acc, cheatsheet) => {
      if (!acc[cheatsheet.category]) {
        acc[cheatsheet.category] = [];
      }
      acc[cheatsheet.category].push(cheatsheet);
      return acc;
    },
    {} as Record<string, typeof cheatsheets>,
  );

  const totalTools = Object.values(categoriesMap).reduce(
    (acc, curr) => acc + curr.length,
    0,
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-cyber-grid mask-fade-b relative pb-16 pt-14 sm:pt-20">
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal className="mb-6 flex justify-center">
              <StatusPill label="ALL ARCHITECTURE HUBS // ONLINE" />
            </Reveal>
            <Reveal delay={0.05}>
              <HudEyebrow icon={Grid3x3} className="mb-3 justify-center uppercase">
                Explore & Discover
              </HudEyebrow>
              <h1 className="mb-6 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
                DevOps <span className="text-gradient">Categories</span>
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
                Explore our comprehensive collection of DevOps tools and resources,
                organized by category to supercharge your workflow.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const info = categoryData[category];
            return (
              <Reveal key={category} delay={(index % 3) * 0.06}>
                <GlowCard className="h-full" glowRgb={['34 211 238', '59 130 246', '168 85 247'][index % 3]}>
                  <CategoryCard
                    title={category === 'CI-CD' ? 'CI/CD' : category.replace(/-/g, ' ')}
                    description={info.description}
                    toolCount={info.toolCount}
                    category={category}
                  />
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-t border-border/60 bg-muted/10 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 text-center">
              <HudEyebrow icon={Terminal} className="mb-3 justify-center uppercase">
                Hub Telemetry
              </HudEyebrow>
              <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                Collection at a Glance
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                value: totalTools,
                suffix: '+',
                label: 'Indexed Cheatsheets',
                icon: Layers,
                color: 'text-cyan-500',
                note: 'Curated resources for DevOps professionals',
              },
              {
                value: categories.length,
                suffix: '',
                label: 'Core Categories',
                icon: Grid3x3,
                color: 'text-purple-500',
                note: 'Organized for easy discovery',
              },
              {
                value: 24,
                suffix: '/7',
                label: 'Community Support',
                icon: Users,
                color: 'text-emerald-500',
                note: 'Always here to help you succeed',
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Reveal key={stat.label} delay={index * 0.08}>
                  <div className="hud-panel group rounded-2xl p-8 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="font-mono text-5xl font-black text-foreground">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground/80">{stat.note}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
