'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Settings,
  Box,
  Cloud,
  Server,
  GitBranch,
  Shield,
  Network,
  BarChart2,
  ArrowRight,
  Sparkles,
  Command as CommandIcon,
  Home,
  BookOpen,
  Rocket,
  FileCode2,
  User,
  Heart,
  Sun,
  Moon,
  Github,
  Clock3,
  CornerDownLeft,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Kbd } from '@/components/ui/kbd';
import { cheatsheets } from '@/data/cheatsheets';
import { categories } from '@/utils/categoryData';
import { CheatsheetIcon } from '@/components/CheatsheetIcon';
import { useTheme } from '@/context/ThemeContext';

const CATEGORY_ICONS = {
  'CI-CD': Settings,
  'Containerization': Box,
  'Cloud': Cloud,
  'Infrastructure-Management': Server,
  'Version-Control': GitBranch,
  'Security': Shield,
  'Networking': Network,
  'Monitoring': BarChart2,
} as const;

const GITHUB_URL = 'https://github.com/NotHarshhaa/devops-cheatsheet';
const RECENTS_KEY = 'devops-hub-recent-commands';
const RECENTS_LIMIT = 4;

type ItemGroup = 'recent' | 'cheatsheet' | 'category' | 'page' | 'action';

interface CommandItem {
  id: string;
  group: ItemGroup;
  title: string;
  subtitle?: string;
  /** Internal route. */
  path?: string;
  /** External URL. */
  href?: string;
  /** Special client action key. */
  action?: 'toggle-theme';
  /** Cheatsheet frontmatter icon string, e.g. "<Box />". */
  icon?: string;
  category?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  keywords?: string;
  popularity?: number;
}

// Common abbreviations the fuzzy matcher should hit but that don't appear
// in the cheatsheet tags themselves.
const SEARCH_ALIASES: Record<string, string> = {
  Kubernetes: 'k8s kubectl',
  'Kubernetes-on-AWS': 'k8s eks',
  'GitHub-Actions': 'gha workflows',
  GCP: 'google cloud gcp',
  'ELK-Stack': 'elasticsearch logstash kibana',
  'HashiCorp-Vault': 'vault secrets',
  Terraform: 'iac',
  Ansible: 'iac configuration',
  AquaSec: 'aqua container security',
};

const CHEATSHEET_ITEMS: CommandItem[] = cheatsheets.map((sheet) => ({
  id: `sheet:${sheet.category}/${sheet.slug}`,
  group: 'cheatsheet' as const,
  title: sheet.title,
  subtitle: sheet.category,
  path: `/${sheet.category}/${sheet.slug}`,
  icon: sheet.icon,
  difficulty: sheet.difficulty,
  keywords: [SEARCH_ALIASES[sheet.slug], ...sheet.tags, sheet.category, sheet.slug]
    .filter(Boolean)
    .join(' '),
  popularity: sheet.popularity,
}));

const CATEGORY_ITEMS: CommandItem[] = categories.map((category) => ({
  id: `category:${category}`,
  group: 'category' as const,
  title: category.replace(/-/g, ' '),
  subtitle: 'Category hub',
  path: `/${category}`,
  category,
  keywords: `${category} hub tools cheatsheets`,
}));

const PAGE_ITEMS: CommandItem[] = [
  { id: 'page:home', group: 'page', title: 'Home', subtitle: 'Command center', path: '/', icon: 'home' },
  { id: 'page:getting-started', group: 'page', title: 'Getting Started', subtitle: 'DevOps roadmap', path: '/getting-started', icon: 'rocket' },
  { id: 'page:categories', group: 'page', title: 'All Categories', subtitle: 'Browse every hub', path: '/categories', icon: 'book' },
  { id: 'page:search', group: 'page', title: 'Search', subtitle: 'Full-text search', path: '/search', icon: 'search' },
  { id: 'page:generator', group: 'page', title: 'CLI Builder', subtitle: 'Docker, K8s, chmod & cron generators', path: '/generator', icon: 'code' },
  { id: 'page:about', group: 'page', title: 'About', subtitle: 'The author', path: '/about', icon: 'user' },
  { id: 'page:contribute', group: 'page', title: 'Contribute', subtitle: 'Submit a cheatsheet', path: '/contribute', icon: 'heart' },
];

function fuzzyScore(text: string, query: string): number {
  const t = text.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return 1;
  if (t === q) return 1000;
  if (t.startsWith(q)) return 500 - t.length;

  const wordStart = t.split(/[\s\-_/+.]/).some((word) => word.startsWith(q));
  if (wordStart) return 300 - t.length;
  if (t.includes(q)) return 200 - t.length;

  // Subsequence match (e.g. "k8s" → "kubernetes", "gha" → "github actions")
  let from = 0;
  let score = 50;
  for (const char of q) {
    const index = t.indexOf(char, from);
    if (index === -1) return -1;
    score += index === from ? 2 : 1;
    from = index + 1;
  }
  return score;
}

function searchItems(items: CommandItem[], query: string): CommandItem[] {
  return items
    .map((item) => {
      const titleScore = fuzzyScore(item.title, query);
      const keywordScore = item.keywords ? fuzzyScore(item.keywords, query) : -1;
      const subtitleScore = item.subtitle ? fuzzyScore(item.subtitle, query) : -1;
      return { item, score: Math.max(titleScore, keywordScore, subtitleScore) };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ item }) => item);
}

function readRecents(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed.slice(0, RECENTS_LIMIT) : [];
  } catch {
    return [];
  }
}

function pushRecent(path: string) {
  if (typeof window === 'undefined') return;
  const next = [path, ...readRecents().filter((p) => p !== path)].slice(0, RECENTS_LIMIT);
  try {
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable — recents are best-effort.
  }
}

const PAGE_ICON_MAP = {
  home: Home,
  rocket: Rocket,
  book: BookOpen,
  search: Search,
  code: FileCode2,
  user: User,
  heart: Heart,
} as const;

const GROUP_LABELS: Record<ItemGroup, string> = {
  recent: 'Recent',
  cheatsheet: 'Cheatsheets',
  category: 'Categories',
  page: 'Pages',
  action: 'Actions',
};

interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandMenu({ open: externalOpen, onOpenChange }: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [recentPaths, setRecentPaths] = React.useState<string[]>([]);
  const listRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = (next: boolean) => {
    if (onOpenChange) {
      onOpenChange(next);
    } else {
      setInternalOpen(next);
    }
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-command-menu', handleCustomOpen);
    document.addEventListener('keydown', down);

    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-command-menu', handleCustomOpen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Load recents when the palette opens.
  React.useEffect(() => {
    if (isOpen) setRecentPaths(readRecents());
  }, [isOpen]);

  const allItems = React.useMemo<CommandItem[]>(
    () => [
      ...CHEATSHEET_ITEMS,
      ...CATEGORY_ITEMS,
      ...PAGE_ITEMS,
      { id: 'action:theme', group: 'action', title: 'Toggle Theme', subtitle: 'Switch light / dark mode', action: 'toggle-theme' },
      { id: 'action:github', group: 'action', title: 'Star on GitHub', subtitle: 'Open the repository', href: GITHUB_URL },
    ],
    []
  );

  const groupedResults = React.useMemo<{ group: ItemGroup; items: CommandItem[] }[]>(() => {
    if (query.trim()) {
      const matches = searchItems(allItems, query);
      const order: ItemGroup[] = ['cheatsheet', 'category', 'page', 'action'];
      return order
        .map((group) => ({ group, items: matches.filter((item) => item.group === group) }))
        .filter(({ items }) => items.length > 0);
    }

    const recents = recentPaths
      .map((path) => allItems.find((item) => item.path === path))
      .filter((item): item is CommandItem => Boolean(item));

    const popular = [...CHEATSHEET_ITEMS].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));

    const popularItems = popular
      .filter((item) => !recentPaths.includes(item.path!))
      .slice(0, 6);

    return [
      ...(recents.length ? [{ group: 'recent' as const, items: recents }] : []),
      { group: 'cheatsheet' as const, items: popularItems },
      { group: 'category' as const, items: CATEGORY_ITEMS },
      { group: 'page' as const, items: PAGE_ITEMS as CommandItem[] },
      {
        group: 'action' as const,
        items: allItems.filter((item) => item.group === 'action'),
      },
    ].filter(({ items }) => items.length > 0);
  }, [allItems, query, recentPaths]);

  const flatItems = React.useMemo(
    () => groupedResults.flatMap(({ items }) => items),
    [groupedResults]
  );

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  React.useEffect(() => {
    if (!isOpen) return;
    const element = listRef.current?.querySelector('[data-active="true"]');
    element?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    setQuery('');
    if (item.action === 'toggle-theme') {
      toggleTheme();
      return;
    }
    if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (item.path) {
      pushRecent(item.path);
      router.push(item.path);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (flatItems.length ? (i + 1) % flatItems.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (flatItems.length ? (i - 1 + flatItems.length) % flatItems.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatItems[activeIndex];
      if (item) {
        handleSelect(item);
      } else if (query.trim()) {
        setIsOpen(false);
        setQuery('');
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  let flatCursor = 0;

  const renderItemIcon = (item: CommandItem) => {
    if (item.category && item.group === 'category') {
      const Icon = CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS];
      return Icon ? <Icon className="h-4 w-4" /> : <Box className="h-4 w-4" />;
    }
    if (item.icon) {
      if (item.icon in PAGE_ICON_MAP) {
        const Icon = PAGE_ICON_MAP[item.icon as keyof typeof PAGE_ICON_MAP];
        return <Icon className="h-4 w-4" />;
      }
      return <CheatsheetIcon icon={item.icon} className="h-4 w-4" />;
    }
    if (item.action === 'toggle-theme') {
      return mounted && theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;
    }
    return <Github className="h-4 w-4" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-3xl border-border/80 bg-background/95 p-0 shadow-2xl backdrop-blur-2xl">
        <DialogHeader className="border-b border-border/50 p-4">
          <DialogTitle className="sr-only">Quick Command Search</DialogTitle>
          <div className="flex items-center gap-3 px-2">
            <Search className="h-5 w-5 shrink-0 text-primary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search 35+ cheatsheets, tools and commands..."
              className="h-10 border-0 bg-transparent px-0 text-base shadow-none placeholder:text-muted-foreground/70 focus-visible:ring-0"
              autoFocus
            />
            <Badge
              variant="outline"
              className="hidden items-center gap-1 font-mono text-[10px] text-muted-foreground sm:flex"
            >
              <Kbd>ESC</Kbd> to close
            </Badge>
          </div>
        </DialogHeader>

        <div ref={listRef} className="max-h-[60vh] space-y-5 overflow-y-auto p-4">
          {groupedResults.map(({ group, items }) => (
            <div key={group}>
              <div className="mb-2 flex items-center justify-between px-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  {group === 'recent' && <Clock3 className="h-3 w-3" />}
                  {GROUP_LABELS[group]}
                </span>
                {group === 'cheatsheet' && !query && (
                  <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                )}
                {group === 'cheatsheet' && query && (
                  <span className="font-sans text-[10px] lowercase text-primary">
                    {items.length} result{items.length === 1 ? '' : 's'}
                  </span>
                )}
              </div>

              <div className={group === 'category' ? 'grid grid-cols-1 gap-2 sm:grid-cols-2' : 'space-y-1'}>
                {items.map((item) => {
                  const flatIdx = flatCursor++;
                  const isActive = flatIdx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      data-active={isActive}
                      onMouseEnter={() => setActiveIndex(flatIdx)}
                      onClick={() => handleSelect(item)}
                      className={`group flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-2.5 text-left transition-all ${
                        isActive
                          ? 'border-border/60 bg-accent/60'
                          : 'border-transparent hover:border-border/60 hover:bg-accent/60'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${
                            item.group === 'category'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {renderItemIcon(item)}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="truncate text-xs text-muted-foreground">{item.subtitle}</div>
                          )}
                        </div>
                      </div>
                      {item.difficulty ? (
                        <Badge
                          variant={
                            item.difficulty === 'Beginner'
                              ? 'secondary'
                              : item.difficulty === 'Advanced'
                                ? 'destructive'
                                : 'outline'
                          }
                          className="shrink-0 font-mono text-[10px]"
                        >
                          {item.difficulty}
                        </Badge>
                      ) : (
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {flatItems.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No matches for &ldquo;{query}&rdquo;. Press <Kbd>↵</Kbd> to run a full search.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border/40 bg-muted/40 px-5 py-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CommandIcon className="h-3.5 w-3.5 text-primary" />
            <span>DevOps Command Terminal</span>
          </div>
          <div className="hidden items-center gap-3 font-mono text-[10px] sm:flex">
            <span className="flex items-center gap-1">
              Navigate: <Kbd>↑</Kbd> <Kbd>↓</Kbd>
            </span>
            <span className="flex items-center gap-1">
              Select: <Kbd>↵</Kbd>
            </span>
            <CornerDownLeft className="h-3 w-3 opacity-40" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function triggerCommandMenu() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-command-menu'));
  }
}
