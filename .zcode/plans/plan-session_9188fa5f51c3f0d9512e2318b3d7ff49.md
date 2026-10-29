# Complete UI Upgrade — Cyber HUD Evolution

## Goal
Unify the whole site under one premium "cyber HUD" design language (dark-first terminal aesthetic, glass surfaces, cyan→blue→purple signature gradient, mono accents), plus four enhancements: Shiki syntax highlighting, an upgraded ⌘K palette, motion/micro-interactions, and JetBrains Mono typography. All content stays SSG/build-time — no API or data-layer changes.

## 1. Design-system foundation
- **`globals.css` rework** (Tailwind v4 CSS-first): add `--font-mono` mapped to a new JetBrains Mono variable; polish light+dark oklch token palettes; add reusable utilities: `.text-gradient` (signature gradient), `.hud-panel` (glass card), refined glows, animated gradient-border, shimmer skeleton, plus keyframes (float, pulse-glow, shimmer, caret-blink).
- **Delete dead `tailwind.config.js`** (v3-style file, not loaded by the v4 pipeline — nothing references it at runtime).
- **Fonts in `layout.tsx`**: add JetBrains Mono via `next/font` (`--font-jetbrains`); keep Manrope for sans.
- **New shared components** (`src/components/shared/`): `TerminalWindow` (mac-dots chrome + title + copy slot — replaces ~6 inline copies across home/reader/generator), `StatusPill` (pinging status pill), `HudEyebrow` (mono eyebrow label), `Reveal` (framer-motion scroll-reveal wrapper honoring `prefers-reduced-motion` + existing `useIsLowEndDevice`), `AnimatedCounter` (count-up stats), `GlowCard` (mouse-tracking radial glow on hover).

## 2. Cheatsheet reader rebuild (crown jewel)
- **New build-time parser** `src/utils/parseCheatsheet.ts`: split raw markdown on `## N. Title` headers into typed sections (text / code-with-language / list) — currently the whole page renders as one dead "Content" blob, killing the TOC/filter/prev-next features that already exist in the code.
- **Shiki** (`shiki` dep): highlight every code block at build time in `[slug]/page.tsx` (zero client JS, SSG-safe) using `one-dark-pro` theme; blocks keep the dark terminal look in both site themes. Text blocks keep `marked` + DOMPurify.
- **`CheatsheetTemplate` rewrite**: real numbered sections, working TOC with IntersectionObserver scrollspy, working in-page section filter, TerminalWindow code blocks with Shiki HTML + copy-original-code, sticky scroll-progress, prev/next section nav (now functional), and a related-cheatsheets strip (same category) at the bottom.

## 3. Upgraded ⌘K palette (`CommandMenu`)
- Search the real 35-cheatsheet index (`@/data/cheatsheets`) + 8 categories + site pages + actions (toggle theme, GitHub) instead of the current hardcoded shortlist.
- Lightweight fuzzy scoring (substring > prefix > subsequence — no new dep), grouped results with keyboard nav, recent items in localStorage, glass rounded-3xl UI with kbd hints.

## 4. Page-by-page rebuilds (unified HUD)
- **Home**: polished hero (typing-effect terminal mockup, ambient glows, cyber grid), bento stats with animated counters, GlowCard category bento grid, filter band, contribute CTA.
- **Header/Footer**: keep the floating glass pill + telemetry ribbon structure; refine dropdowns, spacing, gradient consistency; **remove the artificial ~1.2s `GlobalLoader`** full-screen block (premium sites don't gate first paint).
- **Category pages** (`[category]`): HUD hero + difficulty filter chips + card reveals.
- **Search**: rebuild from old gray/blue style to tokens — live API search, category chips, highlighted results, themed empty state.
- **Secondary pages** rebuilt to the design system, fixing the non-compiling dynamic `bg-${color}-*` classes: **categories** (overview grid with per-category stats), **getting-started** (roadmap timeline with real colors, lifecycle, FAQ), **about**, **contribute**.
- **Generator**: already HUD-style — polish with shared TerminalWindow/HudEyebrow for consistency.
- **States**: themed `not-found` (terminal-style 404), `loading`/`error` skeletons with shimmer.

## 5. Cleanup + verification
- Remove dead deps `react-markdown`, `remark-gfm`, `react-syntax-highlighter` (replaced by Shiki). Keep react-icons (used by ThemeToggle/contribute).
- Delete duplicate `src/utils/toolIcons.ts` after confirming nothing imports it.
- `npm run build` after each milestone; final visual pass of key pages in the dev server via browser automation.

## Implementation order
1. Foundation (fonts, globals.css, shared components, delete dead config)
2. Section parser + Shiki + reader rebuild
3. ⌘K palette
4. Home + Header/Footer (+ GlobalLoader removal)
5. Category pages + search
6. Secondary pages + generator + states
7. Dep cleanup + full build + visual verification

Nothing in `cheatsheets/` content, URLs, bookmark localStorage keys, theme system, or API routes changes.