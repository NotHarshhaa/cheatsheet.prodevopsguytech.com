'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ArrowRight, Terminal, Filter } from 'lucide-react';
import { CategoryIcon } from '@/components/CategoryIcon';
import { CheatsheetIcon } from '@/components/CheatsheetIcon';
import { HudEyebrow } from '@/components/shared/HudEyebrow';
import { Reveal } from '@/components/shared/Reveal';
import { GlowCard } from '@/components/shared/GlowCard';
import { type Category } from '@/utils/categoryData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CheatsheetListItem {
  title: string;
  description: string;
  category: string;
  icon: string;
  slug: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  popularity: number;
  tags: string[];
}

interface Props {
  category: Category;
  description: string;
  cheatsheets: CheatsheetListItem[];
}

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;
type DifficultyFilter = (typeof DIFFICULTIES)[number];

function formatCategoryName(category: string): string {
  if (category === 'CI-CD') {
    return 'CI/CD';
  }
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function CategoryPageClient({ category, description, cheatsheets }: Props) {
  const [filter, setFilter] = useState<DifficultyFilter>('All');

  const difficultyCounts = useMemo(() => {
    const counts: Record<string, number> = { All: cheatsheets.length };
    for (const sheet of cheatsheets) {
      counts[sheet.difficulty] = (counts[sheet.difficulty] ?? 0) + 1;
    }
    return counts;
  }, [cheatsheets]);

  const displayed = useMemo(
    () => (filter === 'All' ? cheatsheets : cheatsheets.filter((s) => s.difficulty === filter)),
    [cheatsheets, filter]
  );

  return (
    <div className="relative min-h-screen py-10 sm:py-16">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Hero HUD */}
        <Reveal>
          <Card className="gradient-border relative mb-10 overflow-hidden rounded-3xl shadow-xl backdrop-blur-xl">
            <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-purple-500/5 blur-3xl" />

            <CardContent className="relative z-[1] p-6 sm:p-10">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-inner sm:h-20 sm:w-20">
                  <CategoryIcon category={category} />
                </div>
                <div className="flex-1">
                  <HudEyebrow icon={Terminal} className="mb-2">
                    ARCHITECTURE HUB
                  </HudEyebrow>
                  <h1 className="mb-2 font-mono text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                    {formatCategoryName(category)}
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {description}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="shrink-0 self-start px-3 py-1.5 font-mono text-xs font-semibold sm:self-center"
                >
                  {cheatsheets.length} Verified Cheatsheets
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* Difficulty filter chips */}
        <Reveal delay={0.05}>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              Filter:
            </span>
            {DIFFICULTIES.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFilter(level)}
                className={cn(
                  'cursor-pointer rounded-xl border px-3 py-1.5 font-mono text-xs font-medium transition-all',
                  filter === level
                    ? 'border-primary/40 bg-primary/10 text-primary shadow-sm'
                    : 'border-border/60 bg-secondary/60 text-muted-foreground hover:border-border hover:text-foreground'
                )}
              >
                {level}
                <span className="ml-1.5 text-[10px] opacity-70">{difficultyCounts[level] ?? 0}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cheatsheets List */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {displayed.map((cheatsheet, index) => (
            <Reveal key={cheatsheet.slug} delay={(index % 2) * 0.06}>
              <GlowCard className="h-full">
                <Link href={`/${category}/${cheatsheet.slug}`} className="group block h-full">
                  <Card className="relative h-full overflow-hidden rounded-2xl border-border/80 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                    <CardContent className="flex h-full flex-col justify-between p-6 sm:p-7">
                      <div className="mb-4 flex items-start gap-4">
                        {/* Tool Icon */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm transition-transform group-hover:scale-105">
                          <CheatsheetIcon icon={cheatsheet.icon} className="h-6 w-6 text-primary" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex items-center justify-between gap-2">
                            <h2 className="truncate text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                              {cheatsheet.title}
                            </h2>
                            <Badge
                              variant={
                                cheatsheet.difficulty === 'Beginner'
                                  ? 'secondary'
                                  : cheatsheet.difficulty === 'Advanced'
                                    ? 'destructive'
                                    : 'outline'
                              }
                              className="shrink-0 font-mono text-[10px]"
                            >
                              {cheatsheet.difficulty}
                            </Badge>
                          </div>

                          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {cheatsheet.description}
                          </p>
                        </div>
                      </div>

                      {/* Tags and Action */}
                      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {cheatsheet.tags?.slice(0, 3).map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              className="rounded-md border border-border/40 bg-secondary/80 px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary transition-transform group-hover:translate-x-1">
                          <span>Read Guide</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {displayed.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center font-mono text-xs text-muted-foreground">
            No cheatsheets at this difficulty level yet.
          </div>
        )}
      </main>
    </div>
  );
}
