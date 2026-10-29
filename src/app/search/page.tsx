'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search as SearchIcon,
  Loader2,
  Tag,
  Star,
  SearchX,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { Cheatsheet } from '@/data/cheatsheets';
import { CheatsheetIcon } from '@/components/CheatsheetIcon';
import { HudEyebrow } from '@/components/shared/HudEyebrow';
import { Reveal } from '@/components/shared/Reveal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatCategoryName(category: string) {
  if (category === 'CI-CD') return 'CI/CD';
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={index}
        className="rounded bg-primary/20 px-0.5 text-foreground"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [cheatsheets, setCheatsheets] = useState<Cheatsheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Sync the search box with the ?q= query parameter (e.g. from the home
  // page search bar or the command menu fallback).
  useEffect(() => {
    setSearchTerm(searchParams.get('q') ?? '');
  }, [searchParams]);

  useEffect(() => {
    const fetchCheatsheets = async () => {
      try {
        const response = await fetch('/api/cheatsheets?limit=1000');
        const data = await response.json();
        setCheatsheets(data.cheatsheets || []);
      } catch (error) {
        console.error('Error fetching cheatsheets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheatsheets();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(cheatsheets.map((sheet) => sheet.category))),
    [cheatsheets]
  );

  const filteredCheatsheets = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return cheatsheets.filter((cheatsheet) => {
      const haystack =
        `${cheatsheet.title} ${cheatsheet.description} ${cheatsheet.category} ${(cheatsheet.tags ?? []).join(' ')}`.toLowerCase();
      const matchesSearch = q === '' || haystack.includes(q);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(cheatsheet.category);

      return matchesSearch && matchesCategory;
    });
  }, [cheatsheets, searchTerm, selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search Header */}
        <Reveal className="mb-10 text-center">
          <HudEyebrow icon={Terminal} className="mb-3 justify-center uppercase">
            SEARCH CONSOLE
          </HudEyebrow>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Search DevOps <span className="text-gradient">Command Library</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Find the tools and resources you need from our comprehensive collection.
          </p>
        </Reveal>

        {/* Search Input */}
        <Reveal delay={0.05}>
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tools, categories, tags, or keywords..."
                className="h-14 w-full rounded-2xl border border-border/80 bg-card pl-14 pr-4 font-mono text-sm text-foreground shadow-lg outline-none backdrop-blur-xl transition-all placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <SearchIcon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.1}>
          <div className="mx-auto mb-10 max-w-4xl">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => {
                const selected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={cn(
                      'cursor-pointer rounded-xl border px-3.5 py-1.5 font-mono text-xs font-medium transition-all',
                      selected
                        ? 'border-primary/40 bg-primary/10 text-primary shadow-sm'
                        : 'border-border/60 bg-secondary/60 text-muted-foreground hover:border-border hover:text-foreground'
                    )}
                  >
                    {formatCategoryName(category)}
                  </button>
                );
              })}
              {selectedCategories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className="cursor-pointer rounded-xl px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Search Results */}
        <div className="mx-auto max-w-4xl">
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="shimmer h-28 rounded-2xl border border-border/60 bg-card"
                />
              ))}
            </div>
          ) : filteredCheatsheets.length > 0 ? (
            <div className="space-y-4">
              <p className="mb-4 font-mono text-xs text-muted-foreground">
                <span className="text-primary">{filteredCheatsheets.length}</span> results
                {searchTerm && ` for “${searchTerm}”`}
              </p>
              {filteredCheatsheets.map((cheatsheet, index) => (
                <Reveal key={`${cheatsheet.category}-${cheatsheet.slug}`} delay={Math.min(index * 0.03, 0.2)} y={12}>
                  <Link href={`/${cheatsheet.category}/${cheatsheet.slug}`} className="group block">
                    <Card className="rounded-2xl border-border/80 bg-card/80 shadow-sm backdrop-blur-xl transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-lg">
                      <CardContent className="flex items-start gap-4 p-5 sm:p-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                          <CheatsheetIcon icon={cheatsheet.icon} className="h-6 w-6 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                            <h2 className="font-mono text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                              {highlightText(cheatsheet.title, searchTerm)}
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
                          <p className="mb-3 text-sm text-muted-foreground">
                            {highlightText(cheatsheet.description, searchTerm)}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span className="inline-flex items-center gap-1 font-mono text-muted-foreground">
                              <Tag className="h-3.5 w-3.5" />
                              {formatCategoryName(cheatsheet.category)}
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-muted-foreground">
                              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                              {cheatsheet.popularity}% popular
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                              Open guide
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/80 bg-card p-14 text-center shadow-sm">
              <SearchX className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
              <p className="font-mono text-sm text-foreground">
                No results found for &ldquo;{searchTerm}&rdquo;
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Try different keywords or clear the category filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
