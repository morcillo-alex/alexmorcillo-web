# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog for Alex Morcillo covering AI, Games, Architecture, and Technology. Astro v6 (beta) static site with Tailwind CSS v4. ES Modules, Node.js >=22.12.0, TypeScript strict mode.

## Commands

```bash
npm run dev        # Dev server at localhost:4321
npm run build      # Production build to ./dist/
npm run preview    # Preview production build
npx astro check    # TypeScript type checking
```

No test or lint commands are configured. The `/rss.xml` route has a pre-existing `@astrojs/rss` beta compatibility error — unrelated to site code.

## Architecture

- **Framework:** Astro v6.0.0-beta.6 with MDX, RSS, and sitemap integrations
- **Rendering:** Static site generation (SSG) — all pages pre-rendered, zero JS shipped by default
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin + `@tailwindcss/typography` for prose content
- **Dark mode:** Class-based (`@custom-variant dark`) toggled on `<html>`. Anti-FOUC script in `BaseHead.astro`. Theme persisted to `localStorage`, falls back to `prefers-color-scheme`.

### Tailwind v4 setup

- CSS-first config in `src/styles/global.css` — no `tailwind.config.js`
- `@import "tailwindcss"` + `@plugin "@tailwindcss/typography"` + `@custom-variant dark`
- `@theme` block defines design tokens (colors, fonts, shadows, breakpoints, animations)
- `@layer base` for element-level defaults (body, headings, links, code, blockquote, etc.)
- **Prose color overrides live outside `@layer base`** — the TW v4 typography plugin uses hardcoded oklch values and ignores `--tw-prose-*` custom properties. Direct `.prose` / `.dark .prose` selectors outside any layer are needed to beat the plugin's specificity.
- Vite plugin registered in `astro.config.mjs` → `vite.plugins: [tailwindcss()]`

### Design system (color tokens)

Light mode: `ink`, `ink-secondary`, `ink-muted`, `surface`, `canvas` (#FAFAF8), `border`
Dark mode: `cream`, `cream-secondary`, `cream-muted`, `night` (#0C0C14), `night-surface`, `night-border`
Accent: `accent` (#2acf62)
Pattern: use `text-ink dark:text-cream`, `bg-canvas dark:bg-night`, etc.

### Typography (Google Fonts)

- **Syne** (`font-display`) — geometric display font for headings
- **Newsreader** (`font-body`) — editorial serif for body text
- **JetBrains Mono** (`font-mono`) — monospace for code, dates, metadata
- Fonts loaded non-render-blocking in `BaseHead.astro` via `media="print" onload="this.media='all'"` pattern with `<noscript>` fallback

### Key directories

- `src/pages/` — File-based routing (`.astro`, `.md`, `.mdx` → URLs)
- `src/content/blog/` — Blog posts as Markdown/MDX, validated by Zod schema in `src/content.config.ts`
- `src/components/` — BaseHead, Header, HeaderLink, Footer, FormattedDate
- `src/layouts/` — BlogPost.astro (article layout with hero image + prose). Hero image uses `loading="eager"` + `fetchpriority="high"` for LCP optimization.
- `src/consts.ts` — SITE_TITLE ("Alex Morcillo"), SITE_DESCRIPTION
- `public/` — Static assets (favicons)

### Content collections

Blog post frontmatter schema:
- Required: `title` (string), `description` (string), `pubDate` (date)
- Optional: `updatedDate` (date), `heroImage` (image)

Dynamic routes via `getStaticPaths()` in `src/pages/blog/[...slug].astro`.

### SEO

BaseHead handles Open Graph, Twitter Card, canonical URLs. RSS at `/rss.xml`, sitemap auto-generated.

### Performance

- Lighthouse performance score: 97–100 (production build)
- Google Fonts loaded non-render-blocking (`preload` + `media="print"` swap pattern)
- Hero images in `BlogPost.astro` use `loading="eager"` + `fetchpriority="high"` (LCP optimization)
- Zero JS shipped by default (Astro SSG)
- TBT: 0ms, CLS: ~0, FCP: ~0.8s

## Conventions

- All styles via Tailwind utility classes — no scoped `<style>` blocks in components
- Dark mode: pair every light color with `dark:` variant (e.g., `text-ink dark:text-cream`)
- Headings use `font-display`, body uses `font-body`, metadata/dates use `font-mono`
- Entrance animations: `animate-fade-up` with staggered `animation-delay` via `style` attr
- Header: sticky glass effect (`backdrop-blur-xl`, semi-transparent bg), max-w-5xl centered
- Props typed via `interface Props` or `CollectionEntry<'blog'>['data']`
- Slot-based layout composition
- Dates formatted through `FormattedDate.astro` using `Intl.DateTimeFormat`
- Site URL in `astro.config.mjs` is still placeholder (`https://example.com`)
- Footer social links (GitHub, X, LinkedIn) use placeholder URLs — need to be personalized
