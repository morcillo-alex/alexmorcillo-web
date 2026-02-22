# alexmorcillo.com

Personal website and blog by Alex Morcillo — exploring AI, games, architecture, and the ideas shaping our future.

## Tech Stack

- **[Astro](https://astro.build)** v6 (beta) — static site generation, zero JS by default
- **[Tailwind CSS](https://tailwindcss.com)** v4 — CSS-first config with custom design tokens
- **[MDX](https://mdxjs.com)** — rich blog content with component support
- **Typography** — Syne (headings), Newsreader (body), JetBrains Mono (code)

## Features

- Dark mode with system preference detection and manual toggle
- Full SEO: Open Graph, Twitter Cards, JSON-LD structured data, canonical URLs
- Social sharing previews for X, Facebook, LinkedIn, WhatsApp, Telegram
- RSS feed at `/rss.xml`, auto-generated sitemap
- Non-render-blocking font loading for fast performance
- Lighthouse scores: 100 Performance, 100 SEO, 100 Best Practices

## Getting Started

```bash
npm install        # Install dependencies
npm run dev        # Dev server at localhost:4321
npm run build      # Production build to ./dist/
npm run preview    # Preview production build
```

## Project Structure

```text
src/
  components/    # BaseHead, Header, Footer, FormattedDate
  content/blog/  # Blog posts (Markdown/MDX)
  layouts/       # BlogPost layout
  pages/         # File-based routing
  styles/        # global.css (Tailwind config + design tokens)
  consts.ts      # Site metadata and social links
public/          # Static assets, robots.txt, favicons
```

## Links

- [alexmorcillo.com](https://alexmorcillo.com)
- [GitHub](https://github.com/morcillo-alex)
- [X / Twitter](https://x.com/alexmorcillo82)
- [LinkedIn](https://www.linkedin.com/in/alexmorcillo/)
