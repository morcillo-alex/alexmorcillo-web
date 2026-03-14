# Conventions

## Styling

- All styles via **Tailwind utility classes** — no scoped `<style>` blocks in components (exception: `AITimeline.astro` has a scoped style for the caption)
- **Dark mode**: always pair every light color with a `dark:` variant:
  ```html
  <p class="text-ink dark:text-cream bg-canvas dark:bg-night">
  ```
- Category badges use accent green: `text-[#107C41] dark:text-accent`

## Font Usage

| Context | Class |
|---------|-------|
| Headings, display text | `font-heading` (Syne) |
| Body text, prose | `font-body` (Newsreader) |
| Code, dates, metadata, labels, badges | `font-mono` (JetBrains Mono) |

Note: In `global.css`, the CSS variables are `--font-heading`, `--font-body`, `--font-mono`. The Tailwind classes map to these.

## Component Patterns

- **Props typing**: Use `interface Props` in the frontmatter:
  ```astro
  ---
  interface Props {
    title: string;
    date: Date;
  }
  const { title, date } = Astro.props;
  ---
  ```
  For blog post data, use `CollectionEntry<'blog'>['data']`.

- **Slot-based layout composition**: Layouts accept content via `<slot />`.

- **Dates**: Always format through `FormattedDate.astro` using `Intl.DateTimeFormat`.

- **Social links**: Centralized in `src/consts.ts` via the `SOCIAL_LINKS` object. Used by `Footer.astro`, `ContactForm.astro`, and JSON-LD structured data.

## Entrance Animations

Use `animate-fade-up` with staggered delays:
```html
<div class="animate-fade-up" style="animation-delay: 0.1s">First</div>
<div class="animate-fade-up" style="animation-delay: 0.2s">Second</div>
```

## Blog Post URLs

Always use `getPostUrl(post)` from `src/utils/posts.ts` for generating links to blog posts. Never construct URLs manually.

```typescript
import { getPostUrl } from '@/utils/posts';
const url = getPostUrl(post); // → /blog/ai/my-post/
```

## Adding New Blog Posts

1. Create a file under `src/content/blog/{Category}/{Year}/{slug}.md`
2. Include `category` in frontmatter matching a valid path in `CATEGORY_TREE`:
   ```yaml
   ---
   title: 'My Post'
   description: 'A description'
   category: 'AI'           # or 'Games/Blender/Modeling' for nested
   pubDate: 2025-01-15
   ---
   ```
3. Hero image paths depend on nesting depth: posts at `Category/Year/` need `../../../../assets/...`

## Adding Subcategories

Expand `CATEGORY_TREE` in `src/consts.ts` and optionally add a `CATEGORY_META` entry. Everything else auto-derives. See [Content & Routing](./content-and-routing.md#adding-subcategories) for the full walkthrough.

## Inline Scripts

Use `is:inline` directive for scripts that must run immediately (no bundling):
```html
<script is:inline>
  // Runs synchronously, no module transform
</script>
```

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `theme` | Dark mode preference (`'dark'` or `'light'`) |
| `cookie-consent` | Cookie banner state (`'accepted'`) |

## Editing Gotcha

Source files use **tabs** for indentation and **CRLF** (`\r\n`) line endings. The Edit tool often fails on tab-indented content. Use **Write** (full file rewrite) as a fallback when Edit cannot match the string.
