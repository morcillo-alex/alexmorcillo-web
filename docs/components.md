# Components

## Astro Components (`src/components/`)

| Component | Props | Description |
|-----------|-------|-------------|
| **BaseHead.astro** | `title`, `description`, `image?`, `type?` ('website'/'article'), `pubDate?`, `updatedDate?` | All `<head>` content: Plausible analytics, anti-FOUC theme script, meta tags (primary, OG, Twitter), fonts, favicons, canonical URL, RSS/sitemap links |
| **Header.astro** | — | Sticky header with glass effect (`backdrop-blur-xl`), site title link, desktop nav (Home/Blog/About), theme toggle, hamburger menu for mobile, reading progress bar |
| **HeaderLink.astro** | Standard `<a>` HTML attributes | Nav link with active state detection. Compares `href` against current pathname. Active: accent green bg. Styled: `font-mono text-sm tracking-wide` |
| **Footer.astro** | — | Social icons (GitHub, X, LinkedIn, RSS), copyright, Privacy Policy + Cookie Policy links. Includes `CookieConsent` and `Analytics` components |
| **Analytics.astro** | — | Inline script with Plausible custom event tracking (theme, navigation, CTA, social share, scroll depth). Included via Footer |
| **CookieConsent.astro** | — | Floating cookie banner with slide-up animation. Uses `localStorage` key `cookie-consent`. Links to Cookie Policy and Privacy Policy. Included via Footer |
| **FormattedDate.astro** | `date: Date` | Renders `<time>` element with `Intl.DateTimeFormat` in `en-us` locale (e.g., "Jan 1, 2025") |
| **Breadcrumbs.astro** | `items: BreadcrumbItem[]` | Breadcrumb nav with chevron separators. Final item as `<span>`, rest as `<a>`. Includes `BreadcrumbList` JSON-LD. Styled: `font-mono text-xs uppercase tracking-widest` |
| **ShareSocial.astro** | `url: string`, `title: string` | Social share buttons for X, LinkedIn, Facebook, WhatsApp, Telegram. Each opens platform's native share dialog. Styled with accent green hover |
| **Callout.astro** | `href`, `label`, `title`, `description`, `cta`, `delay?` ('0.4s'), `external?` (false) | Accent-bordered CTA card with label, title, description, and arrow button. Supports external links. Used for prominent call-to-action sections |
| **CVCallout.astro** | `delay?` ('0.4s') | Pre-configured `Callout` linking to `/about/cv` with career summary copy |
| **ContactForm.astro** | — | LinkedIn CTA button. Uses `SOCIAL_LINKS.linkedin` from consts. Styled as accent green bordered button with LinkedIn icon |
| **FAQSchema.astro** | `items: FAQItem[]` (each has `question` and `answer`) | Renders only a `FAQPage` JSON-LD script tag — no visible HTML output |
| **MetricTree.astro** | `data: TreeNode` (with `name`, `level`, `description?`, `children?`) | Interactive SVG tree visualization with pan, zoom, collapse/expand, tooltips. Built with vanilla JS. Color-coded by level (North Star, L1, L2). Dark mode aware |
| **AITimeline.astro** | — | Wrapper for `AITimelineChart.svelte`. Renders a `<figure>` with caption. Uses `client:visible` for lazy hydration |

## Svelte Components (`src/components/`)

| Component | Description |
|-----------|-------------|
| **AITimelineChart.svelte** | Interactive D3-powered timeline chart showing AI model releases by vendor (Anthropic, OpenAI, Google, Meta, DeepSeek, xAI, Mistral) from 2024-2026. Features hover tooltips, responsive resize, dark mode support via MutationObserver |

## Layouts (`src/layouts/`)

### BlogPost.astro

Full blog post page layout.

**Props**: `CollectionEntry<'blog'>['data']` extended with `readingTime?: number` and `breadcrumbs?: BreadcrumbItem[]`

Structure:
1. `<head>` with `BaseHead` (type="article") + `BlogPosting` JSON-LD
2. `Header`
3. Mobile hero image (stacked, `md:hidden`)
4. Desktop: side-by-side layout (metadata left, 3D-tilting hero right)
   - Breadcrumbs, date, title, description, accent bar, reading time, share buttons
   - Hero with perspective tilt effect (`rotateY(-8deg) rotateX(2deg)` rest state)
5. Prose content (`max-w-3xl`, `prose prose-lg`)
6. Bottom share buttons (separated by border)
7. `Footer`
8. Hero tilt script

### CategoryListing.astro

Category page with post grid.

**Props**: `categoryLabel`, `categorySlugPath`, `breadcrumbs`, `subcategories`, `posts`

Structure:
1. `<head>` with `BaseHead` using `CATEGORY_META` description
2. `Header`
3. Breadcrumbs, category title
4. Subcategory chips (pill-shaped links, if any children exist)
5. Post grid (1/2/3 columns responsive) with `card-glass` effect and `data-tilt`
6. `Footer`
7. Card tilt script
