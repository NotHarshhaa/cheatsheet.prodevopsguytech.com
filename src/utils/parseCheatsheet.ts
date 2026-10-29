/**
 * Build-time parser that splits cheatsheet markdown into typed sections.
 *
 * Cheatsheets are authored as `## N. Section Title` headings with a mix of
 * prose, fenced code blocks and bullet lists. The reader UI (TOC, section
 * filter, prev/next) only works when the markdown is decomposed into these
 * sections, so this runs on the server before rendering.
 */

export type ParsedBlock =
  | { type: 'text'; value: string }
  | { type: 'code'; value: string; language: string }
  | { type: 'list'; value: string[] };

export interface ParsedSection {
  id: string;
  title: string;
  blocks: ParsedBlock[];
}

/** Client-facing block shapes: text/code arrive as pre-rendered HTML. */
export interface RenderCodeBlock {
  type: 'code';
  language: string;
  /** Raw code, used by the copy button. */
  code: string;
  /** Shiki-highlighted HTML. */
  html: string;
}
export interface RenderTextBlock {
  type: 'text';
  /** marked + sanitized HTML. */
  html: string;
}
export interface RenderListBlock {
  type: 'list';
  /** Inline-markdown list items rendered to sanitized HTML. */
  value: string[];
}
export type RenderBlock = RenderCodeBlock | RenderTextBlock | RenderListBlock;

export interface RenderSection {
  id: string;
  title: string;
  blocks: RenderBlock[];
}

const FENCE = /^```(.*)$/;
const H2 = /^##\s+(.*)$/;
const LIST_ITEM = /^\s*[-*+]\s+(.*)$/;
const HR = /^\s*(-{3,}|\*{3,})\s*$/;

export function normalizeSectionTitle(raw: string): string {
  return raw
    .replace(/\*\*/g, '')
    // Render markdown links as their label — titles are plain text in the UI.
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`/g, '')
    .replace(/^\d+[.)]\s*/, '')
    .trim();
}

export function slugifyHeading(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'section';
}

function parseBody(lines: string[]): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  let textBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushText = () => {
    if (textBuffer.length) {
      blocks.push({ type: 'text', value: textBuffer.join('\n') });
      textBuffer = [];
    }
  };
  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: 'list', value: listBuffer });
      listBuffer = [];
    }
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const fence = line.match(FENCE);
    if (fence) {
      flushText();
      flushList();
      const language = fence[1].trim().toLowerCase();
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !FENCE.test(lines[i])) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1; // skip the closing fence
      blocks.push({ type: 'code', value: codeLines.join('\n'), language });
      continue;
    }

    if (HR.test(line) || line.trim() === '') {
      flushText();
      flushList();
      i += 1;
      continue;
    }

    const listMatch = line.match(LIST_ITEM);
    if (listMatch) {
      flushText();
      listBuffer.push(listMatch[1].trim());
      i += 1;
      continue;
    }

    flushList();
    textBuffer.push(line);
    i += 1;
  }
  flushText();
  flushList();
  return blocks;
}

export function parseCheatsheet(content: string): ParsedSection[] {
  const lines = content.split(/\r?\n/);
  const firstHeading = lines.findIndex((line) => H2.test(line));
  const sections: ParsedSection[] = [];
  const usedIds = new Set<string>();

  const pushSection = (title: string, bodyLines: string[]) => {
    const blocks = parseBody(bodyLines).filter(
      (block) => block.type !== 'text' || block.value.trim() !== ''
    );
    if (!blocks.length) return;
    let id = slugifyHeading(title);
    let counter = 2;
    while (usedIds.has(id)) {
      id = `${id}-${counter}`;
      counter += 1;
    }
    usedIds.add(id);
    sections.push({ id, title, blocks });
  };

  // Everything before the first `##` is the overview. The `#` document title
  // is dropped — it is already shown in the page header.
  const introLines = (firstHeading === -1 ? lines : lines.slice(0, firstHeading)).filter(
    (line) => !/^#\s+/.test(line)
  );
  if (introLines.some((line) => line.trim() !== '')) {
    pushSection('Overview', introLines);
  }

  if (firstHeading === -1) return sections;

  let currentTitle: string | null = null;
  let currentLines: string[] = [];
  for (let i = firstHeading; i <= lines.length; i += 1) {
    const line = i < lines.length ? lines[i] : '';
    const heading = line.match(H2);
    if (heading || i === lines.length) {
      if (currentTitle !== null) {
        pushSection(currentTitle, currentLines);
      }
      if (heading) {
        currentTitle = normalizeSectionTitle(heading[1]);
        currentLines = [];
      }
    } else if (currentTitle !== null) {
      currentLines.push(line);
    }
  }

  return sections;
}
