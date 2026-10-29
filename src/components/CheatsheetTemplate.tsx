'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Bookmark,
  Clock,
  Star,
  ChevronRight,
  ChevronLeft,
  Terminal,
  List,
  Download,
  Search,
  BookOpen,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { MarkdownContent } from '@/components/MarkdownContent';
import { CheatsheetIcon } from '@/components/CheatsheetIcon';
import { TerminalWindow } from '@/components/shared/TerminalWindow';
import { HudEyebrow } from '@/components/shared/HudEyebrow';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { saveItem, removeItem, isItemSaved } from '@/utils/localStorage';
import type { RenderSection } from '@/utils/parseCheatsheet';

interface RelatedCheatsheet {
  title: string;
  slug: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

interface CheatsheetTemplateProps {
  title: string;
  category: string;
  slug: string;
  icon: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: string;
  popularity: number;
  sections: RenderSection[];
  related: RelatedCheatsheet[];
  rawMarkdown?: string;
}

function sectionSearchText(section: RenderSection): string {
  const parts: string[] = [section.title];
  for (const block of section.blocks) {
    if (block.type === 'code') parts.push(block.code);
    else if (block.type === 'text') parts.push(block.html.replace(/<[^>]*>/g, ' '));
    else parts.push(block.value.join(' '));
  }
  return parts.join(' ').toLowerCase();
}

export function CheatsheetTemplate({
  title,
  category,
  slug,
  icon,
  description,
  difficulty,
  readingTime,
  popularity,
  sections,
  related,
  rawMarkdown,
}: CheatsheetTemplateProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');

  // Bookmark key is the canonical URL of this cheatsheet, so the Saved
  // drawer can link straight back to it.
  const savedKey = `/${category}/${slug}`;

  useEffect(() => {
    setIsSaved(isItemSaved(savedKey));
    const handleStorageChange = () => setIsSaved(isItemSaved(savedKey));
    window.addEventListener('saved-items-changed', handleStorageChange);
    return () => window.removeEventListener('saved-items-changed', handleStorageChange);
  }, [savedKey]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // In-page search filter
  const displayedSections = useMemo(() => {
    if (!searchFilter.trim()) return sections;
    const q = searchFilter.toLowerCase();
    return sections.filter((section) => sectionSearchText(section).includes(q));
  }, [sections, searchFilter]);

  // TOC scrollspy — highlights the section currently in the reading zone.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const index = Number(visible[0].target.getAttribute('data-section-index'));
          if (!Number.isNaN(index)) setActiveIndex(index);
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    displayedSections.forEach((_, index) => {
      const element = document.getElementById(`section-${index}`);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [displayedSections]);

  const scrollToSection = (index: number) => {
    setActiveIndex(index);
    document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: window.location.href });
        toast.success('Shared successfully!');
        return;
      } catch {
        // fall through to clipboard share
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleSave = () => {
    if (isSaved) {
      removeItem(savedKey);
      setIsSaved(false);
      toast.success('Removed from bookmarks');
    } else {
      saveItem(savedKey);
      setIsSaved(true);
      toast.success('Added to bookmarks');
    }
  };

  const handleDownloadMarkdown = () => {
    if (!rawMarkdown) {
      toast.error('Markdown source not available');
      return;
    }
    const blob = new Blob([rawMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-cheatsheet.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded cheatsheet as Markdown!');
  };

  const difficultyVariant =
    difficulty === 'Beginner' ? 'secondary' : difficulty === 'Advanced' ? 'destructive' : 'outline';

  return (
    <div className="relative min-h-screen">
      {/* Reading progress */}
      <div className="fixed left-0 top-0 z-50 h-0.5 w-full bg-border/40">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Header HUD card */}
        <Card className="gradient-border relative mb-8 overflow-hidden rounded-3xl shadow-xl backdrop-blur-xl">
          <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />

          <CardContent className="relative z-[1] p-6 sm:p-10">
            <div className="mb-8 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-inner sm:h-20 sm:w-20">
                  <CheatsheetIcon icon={icon} className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <HudEyebrow icon={Terminal} className="mb-2">
                    {category.toUpperCase()} // GUIDE
                  </HudEyebrow>
                  <h1 className="mb-3 font-mono text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                    {title}
                  </h1>
                  <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            {/* Badges & actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="secondary" className="px-3 py-1 font-mono text-xs font-semibold">
                  {category}
                </Badge>
                <Badge variant={difficultyVariant} className="px-3 py-1 font-mono text-xs font-semibold">
                  {difficulty}
                </Badge>
                <Badge variant="outline" className="gap-1.5 px-3 py-1 font-mono text-xs">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  {readingTime}
                </Badge>
                <Badge variant="outline" className="gap-1.5 px-3 py-1 font-mono text-xs">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  {popularity}+ uses
                </Badge>
                <Badge variant="outline" className="gap-1.5 px-3 py-1 font-mono text-xs">
                  <List className="h-3.5 w-3.5 text-muted-foreground" />
                  {sections.length} sections
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadMarkdown}
                  className="cursor-pointer gap-2 rounded-xl border-border/80 font-mono text-xs font-medium"
                  title="Download clean Markdown file"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .md</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="cursor-pointer gap-2 rounded-xl border-border/80 text-xs font-medium"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </Button>
                <Button
                  variant={isSaved ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleSave}
                  className="cursor-pointer gap-2 rounded-xl text-xs font-medium"
                >
                  <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* In-page section filter */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter commands & sections in this guide (e.g. prune, restart, exec)..."
              className="h-10 rounded-xl border-border/80 bg-card pl-10 font-mono text-xs sm:text-sm"
            />
            {searchFilter && (
              <Badge
                variant="secondary"
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px]"
              >
                {displayedSections.length} matched
              </Badge>
            )}
          </div>
        </div>

        {/* Reader layout with TOC */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* TOC sidebar */}
          <div className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-24 space-y-4 rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <List className="h-4 w-4 text-primary" />
                <span>On This Page ({displayedSections.length})</span>
              </div>
              <nav className="max-h-[65vh] max-w-full space-y-1 overflow-y-auto overflow-x-hidden text-xs">
                {displayedSections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#section-${index}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(index);
                    }}
                    className={`block max-w-full break-words rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                      activeIndex === index
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                    }`}
                  >
                    <span className="mr-1.5 font-mono text-[10px] opacity-70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8 lg:col-span-3">
            {displayedSections.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-10 text-center">
                <Search className="mx-auto mb-4 h-8 w-8 text-muted-foreground/50" />
                <p className="font-mono text-xs text-muted-foreground">
                  No commands matching &quot;{searchFilter}&quot;.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchFilter('')}
                  className="mt-4 cursor-pointer gap-2 rounded-xl font-mono text-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear filter
                </Button>
              </div>
            ) : (
              displayedSections.map((section, index) => (
                <Card
                  key={section.id}
                  id={`section-${index}`}
                  data-section-index={index}
                  className="group scroll-mt-28 overflow-hidden rounded-2xl border-border/80 shadow-sm backdrop-blur-xl transition-colors hover:border-primary/40"
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-3 border-b border-border/60 pb-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-mono text-xs font-bold text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                        {section.title}
                      </h2>
                    </div>

                    <div className="space-y-5">
                      {section.blocks.map((block, blockIndex) => {
                        if (block.type === 'text') {
                          return (
                            <div
                              key={blockIndex}
                              className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed text-foreground/90 sm:text-base"
                            >
                              <MarkdownContent content={block.html} />
                            </div>
                          );
                        }

                        if (block.type === 'code') {
                          return (
                            <TerminalWindow
                              key={blockIndex}
                              title={`${block.language} snippet`}
                              copyText={block.code}
                              className="my-2"
                              bodyClassName="p-0"
                            >
                              <div
                                className="overflow-x-auto"
                                dangerouslySetInnerHTML={{ __html: block.html }}
                              />
                            </TerminalWindow>
                          );
                        }

                        return (
                          <ul key={blockIndex} className="my-3 space-y-2">
                            {block.value.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start gap-2.5 text-sm text-foreground sm:text-base"
                              >
                                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span dangerouslySetInnerHTML={{ __html: item }} />
                              </li>
                            ))}
                          </ul>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Related cheatsheets */}
            {related.length > 0 && (
              <div className="pt-4">
                <HudEyebrow icon={BookOpen} className="mb-4">
                  KEEP READING
                </HudEyebrow>
                <h2 className="mb-6 text-xl font-black tracking-tight text-foreground sm:text-2xl">
                  More in {category}
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((item) => (
                    <a
                      key={item.slug}
                      href={`/${category}/${item.slug}`}
                      className="group rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm backdrop-blur-xl transition-all hover:border-primary/40 hover:shadow-lg"
                    >
                      <Badge
                        variant={
                          item.difficulty === 'Beginner'
                            ? 'secondary'
                            : item.difficulty === 'Advanced'
                              ? 'destructive'
                              : 'outline'
                        }
                        className="mb-3 font-mono text-[10px]"
                      >
                        {item.difficulty}
                      </Badge>
                      <h3 className="mb-1.5 font-mono text-sm font-bold text-foreground group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-primary">
                        Read guide
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating section navigation */}
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          <AnimatePresence>
            {activeIndex > 0 && (
              <motion.div
                key="prev"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => scrollToSection(activeIndex - 1)}
                  className="cursor-pointer gap-1.5 rounded-xl border-border bg-background/95 font-mono text-xs shadow-xl backdrop-blur-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Prev</span>
                </Button>
              </motion.div>
            )}
            {activeIndex < displayedSections.length - 1 && (
              <motion.div
                key="next"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
              >
                <Button
                  size="sm"
                  onClick={() => scrollToSection(activeIndex + 1)}
                  className="cursor-pointer gap-1.5 rounded-xl bg-primary font-mono text-xs font-semibold text-primary-foreground shadow-xl"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
