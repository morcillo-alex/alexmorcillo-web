# CLAUDE.md

## Project Overview

Personal blog for Alex Morcillo — "Exploring AI, games, architecture, and the ideas shaping our future." Astro v6 beta static site with Tailwind CSS v4. ES Modules, Node.js >=22.12.0, TypeScript strict mode.

## Commands

```bash
npm run dev        # Dev server at localhost:4321
npm run build      # Production build to ./dist/
npm run preview    # Preview production build
npx astro check    # TypeScript type checking
```

No test or lint commands are configured.

## Quick Reference

- **Framework:** Astro v6.0.0-beta.6 + MDX + sitemap + Svelte
- **Styling:** Tailwind CSS v4 (CSS-first config in `src/styles/global.css`)
- **Analytics:** Plausible (privacy-friendly, cookie-free) — NOT GTM
- **Deployment:** Cloudflare Workers (`wrangler.jsonc`)
- **Site URL:** https://alexmorcillo.com
- **Categories:** AI, Games, Short Stories, Strategy, Technology
- **Lighthouse:** Performance 100, SEO 100, Best Practices 100

## Key Directories

- `src/pages/` — File-based routing (`.astro`, `.md`, `.mdx` -> URLs)
- `src/content/blog/` — Blog posts as Markdown/MDX, organized by `Category/Year/` folders
- `src/components/` — BaseHead, Header, Footer, Analytics, CookieConsent, Breadcrumbs, ShareSocial, etc.
- `src/layouts/` — BlogPost.astro, CategoryListing.astro
- `src/utils/` — posts.ts (URL generation, featured post), categories.ts (category tree utilities)
- `src/styles/global.css` — Tailwind v4 CSS-first config with design tokens
- `src/consts.ts` — Site metadata, CATEGORY_TREE, CATEGORY_META, SOCIAL_LINKS
- `src/assets/` — AppIcons, Logo, Media (hero images organized by category)
- `public/` — Static assets (favicons, web manifest, robots.txt)

## Conventions

- All styles via Tailwind utility classes — no scoped `<style>` blocks
- Dark mode: pair every light color with `dark:` variant (e.g., `text-ink dark:text-cream`)
- Fonts: `font-display` (Syne) for headings, `font-body` (Newsreader) for body, `font-mono` (JetBrains Mono) for metadata
- Blog URLs: `/blog/{category-slug}/{filename}/` — always use `getPostUrl(post)`
- New posts: `category` frontmatter must match a valid path in `CATEGORY_TREE`
- Color tokens: light (`ink`, `surface`, `canvas`, `border`), dark (`cream`, `night`, `night-surface`, `night-border`), accent (`#2acf62`)
- Entrance animations: `animate-fade-up` with staggered `animation-delay`
- Hero image paths depend on nesting depth from content folder

## Detailed Documentation

For in-depth information, see:

- [Architecture](docs/architecture.md) — Framework, integrations, plugins, deployment
- [Styling & Design System](docs/styling-and-design-system.md) — Tailwind v4, color tokens, typography, animations
- [Content & Routing](docs/content-and-routing.md) — Categories, frontmatter schema, URL generation, featured posts
- [SEO & Analytics](docs/seo-and-analytics.md) — Meta tags, structured data, Plausible events, performance
- [Components](docs/components.md) — All components and layouts with props
- [Conventions](docs/conventions.md) — Coding patterns, dark mode, naming, editing tips
