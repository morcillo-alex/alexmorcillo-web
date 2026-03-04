# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog for Alex Morcillo — "Exploring AI, games, architecture, and the ideas shaping our future." Astro v6 (beta) static site with Tailwind CSS v4. ES Modules, Node.js >=22.12.0, TypeScript strict mode.

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
- `src/content/blog/` — Blog posts as Markdown/MDX, organized by `Category/Year/` folders (e.g., `AI/2022/first-post.md`), validated by Zod schema in `src/content.config.ts`
- `src/components/` — BaseHead, Header, HeaderLink, Footer, FormattedDate, Breadcrumbs, ShareSocial
- `src/layouts/` — BlogPost.astro (article layout with hero image + prose + breadcrumbs + share buttons), CategoryListing.astro (category page with subcategory chips + post grid)
- `src/utils/posts.ts` — `getSlug()`, `getFilenameSlug()`, `getFullSlug()`, `getPostUrl()`, `getFeaturedPost()` utilities for post URL generation and featured selection
- `src/utils/categories.ts` — Category tree utilities: `slugify()`, `categoryToSlugPath()`, `buildCategoryBreadcrumbs()`, `buildPostBreadcrumbs()`, `getCategoryNode()`, `getChildCategories()`, `getDescendantPaths()`, `getAllSlugPaths()`, `labelPathFromSlugPath()`, `buildCategoryUrl()`, `isValidCategoryPath()`
- `src/consts.ts` — SITE_TITLE, SITE_DESCRIPTION, SITE_AUTHOR, TWITTER_HANDLE, SOCIAL_LINKS, CATEGORY_TREE, ALL_CATEGORY_PATHS, CATEGORIES, Category type
- `src/assets/AppIcons/` — App icons (Android mipmap, iOS Assets.xcassets, App Store/Play Store)
- `src/assets/Logo/` — SiteLogo.png (high-res site logo)
- `public/` — Static assets (favicons, web manifest, robots.txt)

### Hierarchical categories & nested URLs

Categories support up to 3 levels of nesting via `CATEGORY_TREE` in `src/consts.ts`:
```typescript
export const CATEGORY_TREE: CategoryTree = {
  AI: {},
  Games: {},           // Add subcategories: Games: { Blender: { Modeling: {}, Animation: {} } }
  Architecture: {},
  Technology: {},
};
```

- **Frontmatter format**: Slash-separated paths using display labels — `category: 'Games/Blender/Modeling'` (single-level `category: 'AI'` still works)
- **Tree keys are display labels**, slugified to lowercase for URLs (`Machine Learning` → `machine-learning`)
- **Source of truth**: The `category` frontmatter field determines the URL, NOT the filesystem folder structure
- **URL structure**: `/blog/{category-slug-path}/{post-filename}/` (e.g., `/blog/games/blender/my-post/`)
- **Category listing pages**: Auto-generated at each level (e.g., `/blog/games/`, `/blog/games/blender/`) showing posts in that category and descendants
- **Validation**: `src/content.config.ts` uses `z.string().refine()` to validate category against `CATEGORY_TREE`

### Content collections

Blog posts are organized in `src/content/blog/` under `Category/Year/` folders:
```
src/content/blog/
  AI/2022/first-post.md
  Games/2022/second-post.md
  Architecture/2024/markdown-style-guide.md
  Technology/2024/using-mdx.mdx
```

**URLs are nested by category** — `/blog/ai/first-post/`, `/blog/games/second-post/`, etc. The folder structure is for authoring convenience; code relies on `data.category` frontmatter as source of truth for URL generation.

Blog post frontmatter schema:
- Required: `title` (string), `description` (string), `category` (string, validated against `CATEGORY_TREE` — e.g. `'AI'`, `'Games/Blender/Modeling'`), `pubDate` (date)
- Optional: `updatedDate` (date), `featuredTill` (date), `heroImage` (image), `tags` (string array)

Top-level categories derived as `CATEGORIES = Object.keys(CATEGORY_TREE)`. `ALL_CATEGORY_PATHS` contains every valid path at all nesting levels.

### Routing (`src/pages/blog/[...slug].astro`)

Single catch-all route handles both:
1. **Category listing pages** — one per entry in `ALL_CATEGORY_PATHS` (e.g., `/blog/ai/`, `/blog/games/blender/`)
2. **Blog post pages** — one per post (e.g., `/blog/ai/first-post/`)

Uses discriminated union props (`type: 'category' | 'post'`) to render either `CategoryListing` or `BlogPost` layout.

**Build-time collision detection**:
- Post-to-post: two posts with same category + filename → error
- Post-to-category: post slug matches a category path → error

### Breadcrumbs

`src/components/Breadcrumbs.astro` renders breadcrumb navigation with:
- Chevron SVG separators between items
- Final item as `<span>` (current page), rest as `<a>` links
- JSON-LD `BreadcrumbList` schema for SEO
- Styled: `font-mono text-xs uppercase tracking-widest`
- Used in both `BlogPost.astro` and `CategoryListing.astro`

### Share buttons

`src/components/ShareSocial.astro` renders social share buttons for blog posts:
- Props: `url` (canonical URL) and `title` (post title)
- Networks: X, LinkedIn, Facebook, WhatsApp, Telegram — each opens the platform's native share dialog
- Styled: `font-mono` "Share" label + icon buttons with accent green hover (`text-[#107C41] dark:text-accent`, `bg-[#107C41]/8 dark:bg-accent/8`)
- Placed twice in `BlogPost.astro`: in the article header (after reading time) and after the prose content (separated by a border)

### Featured post system

Both the homepage "Latest Writing" section and the blog index (`/blog`) display a featured post with a larger 2-column side-by-side card layout (image left, content right on desktop).

**Selection logic** (`getFeaturedPost()` in `src/utils/posts.ts`):
1. Find posts with `featuredTill` date >= today (build date for SSG)
2. Among those, pick the one with the most recent `pubDate`
3. If none qualify, fall back to the newest post by `pubDate`

**Usage**: Set `featuredTill: YYYY-MM-DD` in a post's frontmatter to pin it as featured until that date. The featured post is excluded from the regular grid below it.

### Blog index & category navigation

The blog index (`src/pages/blog/index.astro`):
- "All" label (active state) + category `<a>` links to `/blog/ai/`, `/blog/games/`, etc.
- No client-side JS filtering — categories are separate pages
- Backwards compat: `?category=X` query param redirects to `/blog/{slug}/` via inline script
- Featured post selected via `getFeaturedPost()` — gets a larger 2-column card layout
- Homepage topic badges link to `/blog/ai/`, `/blog/games/`, etc.

### Favicons & site identity

- **Source icons**: `src/assets/AppIcons/` (brain+controller+circuit design in blue-purple gradient)
- **Header logo**: 28x28 rounded app icon next to site title, optimized via Astro `<Image>` (sourced from `AppIcons/android/mipmap-xxxhdpi/ic_launcher.png`)
- **Favicons** (`public/`): `favicon.ico` (16+32), `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180px), `icon-192.png`, `icon-512.png`
- **Web manifest**: `public/site.webmanifest` — PWA-ready with 192 and 512 icons
- **BaseHead.astro**: `<link>` tags for ico, png favicons, apple-touch-icon, and manifest

### SEO & Social Sharing

Lighthouse scores (production build): Performance 100, SEO 100, Best Practices 100.

**Meta tags** (`BaseHead.astro`):
- Primary: `<title>`, `meta description`, `meta author`, canonical URL
- Open Graph: `og:type` (website/article), `og:url`, `og:title`, `og:description`, `og:image` (with width/height/alt), `og:site_name`, `og:locale`
- Article-specific: `article:published_time`, `article:modified_time`, `article:author` (passed from BlogPost layout)
- Twitter/X: `twitter:card` (summary_large_image), `twitter:site`, `twitter:creator` (@alexmorcillo82), `twitter:image` with alt
- Social platforms covered: Facebook, X/Twitter, LinkedIn, WhatsApp, Telegram, iMessage

**Structured data** (JSON-LD):
- Homepage: `WebSite` + `Person` schema (with `sameAs` linking to [GitHub](https://github.com/morcillo-alex), [X](https://x.com/alexmorcillo82), [LinkedIn](https://www.linkedin.com/in/alexmorcillo/))
- Blog posts: `BlogPosting` schema (headline, description, author, publisher, dates, image, articleSection)
- Breadcrumbs: `BreadcrumbList` schema on category listings and blog posts

**Other SEO**:
- Site URL: `https://alexmorcillo.com` (in `astro.config.mjs`)
- RSS feed: custom implementation at `/rss.xml` (bypasses broken `@astrojs/rss` beta), includes `<category>` per item, uses nested URLs
- Sitemap: auto-generated by `@astrojs/sitemap` at `/sitemap-index.xml`
- `robots.txt` in `public/` — allows all crawlers, links to sitemap

### Performance

- Lighthouse performance score: 97–100 (production build)
- Google Fonts loaded non-render-blocking (`preload` + `media="print"` swap pattern)
- Hero images in `BlogPost.astro` use `loading="eager"` + `fetchpriority="high"` (LCP optimization)
- Zero JS shipped by default (Astro SSG)
- TBT: 0ms, CLS: ~0, FCP: ~0.8s

### Animations

- **Entrance**: `animate-fade-up` with staggered `animation-delay` via `style` attr
- **Card glass**: `.card-glass` class — frosted glass effect with shine sweep on hover (`::before` pseudo-element)
- **Hero glass**: `.hero-glass` class — similar shine effect for hero images
- **Title glass shine**: `.title-glass-shine` class on homepage h1 — green accent gradient sweeps across text interior using `background-clip: text` masking. Repeats every 10s with 3s initial delay, 2s sweep duration. Uses `--shine-text` CSS variable for dark mode support.
- **Card tilt**: `[data-tilt]` attribute + inline `<script>` — 3D perspective tilt on mousemove for post cards

## Conventions

- All styles via Tailwind utility classes — no scoped `<style>` blocks in components
- Dark mode: pair every light color with `dark:` variant (e.g., `text-ink dark:text-cream`)
- Headings use `font-display`, body uses `font-body`, metadata/dates use `font-mono`
- Entrance animations: `animate-fade-up` with staggered `animation-delay` via `style` attr
- Header: sticky glass effect (`backdrop-blur-xl`, semi-transparent bg), max-w-5xl centered, logo + site title link
- Props typed via `interface Props` or `CollectionEntry<'blog'>['data']`
- Slot-based layout composition
- Dates formatted through `FormattedDate.astro` using `Intl.DateTimeFormat`
- Social links centralized in `src/consts.ts` → `SOCIAL_LINKS` object, used by Footer and JSON-LD
- Blog post URLs are nested by category (`/blog/{category-slug}/{filename}/`) — always use `getPostUrl(post)` for links
- New blog posts must include `category` in frontmatter matching a valid path in `CATEGORY_TREE` (e.g., `'AI'`, `'Games/Blender'`)
- To add subcategories, expand `CATEGORY_TREE` in `src/consts.ts` — everything else auto-derives
- Hero image paths in blog posts depend on nesting depth: posts at `Category/Year/` need `../../../../assets/...`
- Category badges use accent green: `text-[#107C41] dark:text-accent`
