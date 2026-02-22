# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro v6 (beta) blog/portfolio static site. ES Modules, Node.js >=22.12.0, TypeScript strict mode.

## Commands

```bash
npm run dev        # Dev server at localhost:4321
npm run build      # Production build to ./dist/
npm run preview    # Preview production build
npx astro check    # TypeScript type checking
```

No test or lint commands are configured.

## Architecture

- **Framework:** Astro v6.0.0-beta.6 with MDX, RSS, and sitemap integrations
- **Rendering:** Static site generation (SSG) — all pages pre-rendered, zero JS shipped to browser by default
- **Styling:** Global CSS with CSS variables in `src/styles/global.css`, scoped styles within `.astro` components

### Key directories

- `src/pages/` — File-based routing (`.astro`, `.md`, `.mdx` → URLs)
- `src/content/blog/` — Blog posts as Markdown/MDX, validated by Zod schema in `src/content.config.ts`
- `src/components/` — Reusable Astro components (BaseHead, Header, Footer, FormattedDate, HeaderLink)
- `src/layouts/` — Page layout templates (BlogPost.astro)
- `src/consts.ts` — Global constants (SITE_TITLE, SITE_DESCRIPTION)
- `public/` — Static assets (fonts, favicons)

### Content collections

Blog posts use Astro content collections with frontmatter schema:
- Required: `title` (string), `description` (string), `pubDate` (date)
- Optional: `updatedDate` (date), `heroImage` (image)

Dynamic routes generated via `getStaticPaths()` in `src/pages/blog/[...slug].astro`.

### SEO

BaseHead component handles Open Graph, Twitter Card, and canonical URL meta tags. RSS feed at `/rss.xml`, sitemap auto-generated.

## Conventions

- Props typed via `interface Props` or `CollectionEntry<'blog'>['data']`
- Slot-based layout composition
- Conditional rendering with `{value && <Component />}`
- Dates formatted through `FormattedDate.astro` using `Intl.DateTimeFormat`
- Site URL in `astro.config.mjs` is still placeholder (`https://example.com`)
