# Styling & Design System

## Tailwind CSS v4 Setup

CSS-first configuration — no `tailwind.config.js`. Everything lives in `src/styles/global.css`.

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@custom-variant dark (&:where(.dark, .dark *));
```

The Vite plugin is registered in `astro.config.mjs` → `vite.plugins: [tailwindcss()]`.

### Structure of `global.css`

1. **`@theme` block** — design tokens (colors, fonts, shadows, breakpoints, animations)
2. **`@layer base`** — element-level defaults (body, headings, links, code, blockquote, scrollbar, prose font families)
3. **Prose color overrides (outside `@layer`)** — direct `.prose` / `.dark .prose` selectors needed to beat the typography plugin's specificity
4. **Utility classes** — `.heading-anchor`, `.title-glass-shine`, `.card-glass`, `.hero-glass`, `.hamburger-line`, `.mobile-menu`

### Prose Color Override Gotcha

The Tailwind v4 typography plugin uses hardcoded oklch values and ignores `--tw-prose-*` custom properties. To override prose colors, use direct `.prose` and `.dark .prose` selectors **outside any `@layer`** — this beats the plugin's specificity.

## Color Tokens

Defined in `@theme` block of `src/styles/global.css`:

### Light Mode

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `ink` | `--color-ink` | `#1A1A2E` |
| `ink-secondary` | `--color-ink-secondary` | `#475569` |
| `ink-muted` | `--color-ink-muted` | `#4A5568` |
| `surface` | `--color-surface` | `#ffffff` |
| `canvas` | `--color-canvas` | `#F0F0EC` |
| `border` | `--color-border` | `#E2E8F0` |

### Dark Mode

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `cream` | `--color-cream` | `#E8E6E1` |
| `cream-secondary` | `--color-cream-secondary` | `#94A3B8` |
| `cream-muted` | `--color-cream-muted` | `#8A9CB0` |
| `night` | `--color-night` | `#0C0C14` |
| `night-surface` | `--color-night-surface` | `#161622` |
| `night-border` | `--color-night-border` | `#1E293B` |

### Accent

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `accent` | `--color-accent` | `#2acf62` |
| `accent-muted` | `--color-accent-muted` | `rgba(42, 207, 98, 0.1)` |

**Usage pattern**: `text-ink dark:text-cream`, `bg-canvas dark:bg-night`, `border-border dark:border-night-border`

## Typography

Google Fonts loaded non-render-blocking in `src/components/BaseHead.astro` via `media="print" onload="this.media='all'"` pattern with `<noscript>` fallback.

| Font | CSS Variable | Tailwind Class | Usage |
|------|-------------|----------------|-------|
| **Syne** | `--font-heading` | `font-heading` | Headings, display text |
| **Newsreader** | `--font-body` | `font-body` | Body text, prose |
| **JetBrains Mono** | `--font-mono` | `font-mono` | Code, dates, metadata, labels |

## Shadows

| Token | CSS Variable | Value |
|-------|-------------|-------|
| `card` | `--shadow-card` | `0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.04)` |
| `elevated` | `--shadow-elevated` | `0 8px 30px rgba(0,0,0,0.08)` |

## Breakpoints

| Name | Value |
|------|-------|
| `md` | `720px` |
| `lg` | `1080px` |

## Dark Mode

- **Mechanism**: Class-based — `.dark` class on `<html>` element
- **Toggle**: `#theme-toggle` button in `Header.astro` toggles `document.documentElement.classList`
- **Persistence**: Stored in `localStorage` under key `theme` (`'dark'` or `'light'`)
- **Fallback**: `prefers-color-scheme: dark` media query
- **Anti-FOUC**: Inline script in `BaseHead.astro` runs before any rendering:

```js
const theme = localStorage.getItem('theme');
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}
```

## Animations

### `animate-fade-up`

Entrance animation defined in `@theme`: `fade-up 0.6s ease-out both`. Stagger with `style="animation-delay: 0.1s"` etc.

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### `.card-glass`

Frosted glass card effect with shine sweep on hover. Uses `backdrop-filter: blur(8px)`, semi-transparent borders, and a `::before` pseudo-element that slides from left to right on hover.

### `.hero-glass`

Similar shine-on-hover effect for hero images. `::before` pseudo-element sweeps across on hover.

### `.title-glass-shine`

Green accent gradient that sweeps across homepage h1 text. Uses `background-clip: text` masking with a 300% background that animates position. Repeats every 10s via `title-shine-sweep` keyframes. Dark mode swaps `--shine-text` from `ink` to `cream`.

### Card Tilt (`[data-tilt]`)

3D perspective tilt on mousemove for post cards. Applied via `data-tilt` attribute + inline `<script>` in `CategoryListing.astro`. Max rotation: 6deg. Hero image tilt in `BlogPost.astro` uses 12deg max with a rest position of `rotateY(-8deg) rotateX(2deg)`.

### Hamburger Menu

`.hamburger-line` elements animate to X shape when `.menu-open` class is applied. Uses CSS transforms for the transition.

### Mobile Menu

`.mobile-menu` uses CSS Grid `grid-template-rows: 0fr` → `1fr` for smooth expand/collapse animation.
