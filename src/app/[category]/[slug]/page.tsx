import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { getCheatsheetBySlug, getAllCheatsheets } from '@/utils/markdown';
import { categoryData, type Category } from '@/utils/categoryData';
import { parseCheatsheet, type RenderSection } from '@/utils/parseCheatsheet';
import { highlightCode } from '@/utils/shikiServer';
import { CheatsheetPageClient } from './CheatsheetPageClient';

type RouteParams = {
  category: string;
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: RouteParams | Promise<RouteParams>;
}): Promise<Metadata> {
  const resolved = await params;
  const cheatsheet = await getCheatsheetBySlug(resolved.category, resolved.slug);
  if (!cheatsheet) return {};

  return {
    title: `${cheatsheet.title} | DevOps Cheatsheet`,
    description: cheatsheet.description,
  };
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const { cheatsheets } = await getAllCheatsheets('', 1, 1000);
  return cheatsheets.map((cheatsheet) => ({
    category: cheatsheet.category,
    slug: cheatsheet.slug,
  }));
}

// Every cheatsheet is prerendered; anything else is a genuine 404.
export const dynamicParams = false;

export default async function CheatsheetPage({
  params,
}: {
  params: RouteParams | Promise<RouteParams>;
}) {
  const resolved = await params;
  const cheatsheet = await getCheatsheetBySlug(resolved.category, resolved.slug);

  if (!cheatsheet || !(cheatsheet.category in categoryData)) {
    notFound();
  }

  // Sections and code highlighting are computed once at build time so the
  // client bundle only receives final HTML.
  const sections: RenderSection[] = [];
  for (const section of parseCheatsheet(cheatsheet.content)) {
    const blocks = [];
    for (const block of section.blocks) {
      if (block.type === 'code') {
        blocks.push({
          type: 'code' as const,
          language: block.language,
          code: block.value,
          html: await highlightCode(block.value, block.language),
        });
      } else if (block.type === 'text') {
        const html = marked.parse(block.value, { async: false }) as string;
        blocks.push({ type: 'text' as const, html: DOMPurify.sanitize(html) });
      } else {
        blocks.push({
          type: 'list' as const,
          value: block.value.map(
            (item) => DOMPurify.sanitize(marked.parseInline(item, { async: false }) as string)
          ),
        });
      }
    }
    sections.push({ id: section.id, title: section.title, blocks });
  }

  const { cheatsheets: sameCategory } = await getAllCheatsheets(resolved.category, 1, 1000);
  const related = sameCategory
    .filter((item) => item.slug !== resolved.slug)
    .slice(0, 3)
    .map(({ title, slug, difficulty, description }) => ({ title, slug, difficulty, description }));

  const words = cheatsheet.content.trim().split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.round(words / 200))} min read`;

  return (
    <CheatsheetPageClient
      category={cheatsheet.category as Category}
      slug={cheatsheet.slug}
      title={cheatsheet.title}
      icon={cheatsheet.icon}
      description={cheatsheet.description}
      difficulty={cheatsheet.difficulty}
      popularity={cheatsheet.popularity}
      sections={sections}
      related={related}
      rawMarkdown={cheatsheet.content}
      readingTime={readingTime}
    />
  );
}
