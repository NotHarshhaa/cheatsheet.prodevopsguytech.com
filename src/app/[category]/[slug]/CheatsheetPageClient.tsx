'use client';

import { CheatsheetTemplate } from '@/components/CheatsheetTemplate';
import { type Category } from '@/utils/categoryData';
import type { RenderSection } from '@/utils/parseCheatsheet';

interface RelatedCheatsheet {
  title: string;
  slug: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

interface CheatsheetPageClientProps {
  category: Category;
  slug: string;
  title: string;
  icon: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  popularity: number;
  /** Sections parsed and highlighted at build time. */
  sections: RenderSection[];
  /** Other cheatsheets in the same category. */
  related: RelatedCheatsheet[];
  /** Raw markdown, used for the "Download .md" action. */
  rawMarkdown: string;
  readingTime: string;
}

export function CheatsheetPageClient(props: CheatsheetPageClientProps) {
  return <CheatsheetTemplate {...props} />;
}
