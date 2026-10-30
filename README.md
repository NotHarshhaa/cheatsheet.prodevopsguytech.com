# DevOps Cheatsheet — Documentation UI

Modern, high-performance documentation site for **DevOps Cheatsheet** built with [Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.vercel.app).

## Features

- **35+ Cheatsheets**: Complete command reference across 8 architecture disciplines.
- **Full-Text Search**: Fast client-side search dialog powered by Fumadocs (<kbd>Ctrl+K</kbd> / <kbd>⌘K</kbd>).
- **Interactive Terminal**: Real-time syntax and scenario demonstrations on the landing page.
- **LLM & Agent Ready**: Native Markdown endpoints at `/docs/*.md`, `/llms.txt`, and `/llms-full.txt`.
- **Dark & Light Mode**: Clean, high-contrast accessible color themes.
- **One-Click Copy**: Instant snippet copying on all code blocks.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```
