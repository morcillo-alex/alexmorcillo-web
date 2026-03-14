# Architecture

## Framework & Runtime

| Item | Detail |
|------|--------|
| Framework | Astro v6.0.0-beta.6 |
| Rendering | Static site generation (SSG) — all pages pre-rendered, zero JS shipped by default |
| Module system | ES Modules (`"type": "module"` in `package.json`) |
| Node.js | >= 22.12.0 (enforced via `engines` field) |
| TypeScript | Strict mode, checked via `npx astro check` |

## Integrations

Configured in `astro.config.mjs`:

| Integration | Package | Purpose |
|-------------|---------|---------|
| MDX | `@astrojs/mdx` ^5.0.0-beta.3 | MDX support in content collections |
| Sitemap | `@astrojs/sitemap` ^3.6.1-beta.2 | Auto-generated sitemap at `/sitemap-index.xml` |
| Svelte | `@astrojs/svelte` ^7.2.5 | Interactive components (e.g., AITimelineChart) |
| RSS | `@astrojs/rss` ^4.0.14 | Custom RSS feed at `/rss.xml` |

## Rehype Plugins

Markdown/MDX processing pipeline in `astro.config.mjs` → `markdown.rehypePlugins`:

| Plugin | Config | Purpose |
|--------|--------|---------|
| `rehype-mermaid` | `strategy: 'inline-svg'`, `theme: 'neutral'` | Renders Mermaid diagrams as inline SVG at build time |
| `rehype-slug` | — | Adds `id` attributes to headings |
| `rehype-autolink-headings` | `behavior: 'prepend'`, with `#` anchor icon | Adds clickable anchor links to headings |
| `rehype-external-links` | `target: '_blank'`, `rel: ['noopener', 'noreferrer']` | Opens external links in new tabs |

## Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (registered in `astro.config.mjs` → `vite.plugins`)
- **Typography plugin**: `@tailwindcss/typography` for prose content styling
- CSS-first configuration in `src/styles/global.css` — no `tailwind.config.js`

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `d3` | ^7.9.0 | Data visualization (AI timeline chart) |
| `three` | ^0.183.2 | 3D rendering |
| `sharp` | ^0.34.3 | Image optimization |
| `svelte` | ^5.53.3 | Svelte 5 runtime |
| `playwright` | ^1.58.2 | Used by rehype-mermaid for SVG rendering |

## Deployment

Deployed to **Cloudflare Workers** via Wrangler.

Configuration in `wrangler.jsonc`:
```jsonc
{
  "name": "alexmorcillo-webblog",
  "compatibility_date": "2025-09-27",
  "compatibility_flags": ["global_fetch_strictly_public", "nodejs_compat"],
  "assets": {
    "directory": "./dist"
  }
}
```

The `dist/` directory (Astro build output) is served as static assets.

## Commands

```bash
npm run dev        # Dev server at localhost:4321
npm run build      # Production build to ./dist/
npm run preview    # Preview production build
npx astro check    # TypeScript type checking
```

No test or lint commands are configured.
