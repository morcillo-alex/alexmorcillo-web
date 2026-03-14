# Content & Routing

## Category System

### CATEGORY_TREE

Defined in `src/consts.ts`. Five top-level categories:

```typescript
export const CATEGORY_TREE: CategoryTree = {
  AI: {},
  Games: {},
  'Short Stories': {},
  Strategy: {},
  Technology: {},
};
```

Tree keys are **display labels**, slugified to lowercase for URLs (e.g., `Short Stories` becomes `short-stories`).

### CATEGORY_META

Also in `src/consts.ts`, provides descriptions for each category used on listing pages:

| Category | Description |
|----------|-------------|
| AI | How AI is changing work as the new "Industrial Revolution"... |
| Games | Godot, Three.js, and game architecture... |
| Short Stories | Speculative fiction exploring AI, automation... |
| Strategy | North Star metrics, product execution, and strategy frameworks... |
| Technology | Architecture patterns, performance optimization... |

### Adding Subcategories

Categories support up to 3 levels of nesting. To add subcategories, expand the tree in `src/consts.ts`:

```typescript
export const CATEGORY_TREE: CategoryTree = {
  AI: {},
  Games: { Blender: { Modeling: {}, Animation: {} } },
  'Short Stories': {},
  Strategy: {},
  Technology: {},
};
```

Everything else auto-derives: `ALL_CATEGORY_PATHS`, category listing pages, breadcrumbs, and URL generation all update automatically.

### Derived Constants

- `CATEGORIES = Object.keys(CATEGORY_TREE)` — top-level category labels
- `ALL_CATEGORY_PATHS` — every valid slash-separated path at all nesting levels (e.g., `['AI', 'Games', 'Games/Blender', 'Games/Blender/Modeling', ...]`)

## Blog Post Frontmatter Schema

Defined in `src/content.config.ts` using Zod:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Post title |
| `description` | `string` | Yes | Short summary for meta tags and cards |
| `category` | `string` | Yes | Must match a valid path in `CATEGORY_TREE` (e.g., `'AI'`, `'Games/Blender/Modeling'`) |
| `pubDate` | `date` | Yes | Publication date |
| `updatedDate` | `date` | No | Last update date |
| `featuredTill` | `date` | No | Pin as featured post until this date |
| `heroImage` | `image()` | No | Hero image (Astro image optimization) |
| `heroImageAlt` | `string` | No | Alt text for hero image |
| `tags` | `string[]` | No | Tag array |
| `slug` | `string` | No | Custom URL slug (overrides filename) |

Category validation uses `z.string().refine()` calling `isValidCategoryPath()` from `src/utils/categories.ts`.

## Filesystem Layout

Posts are organized under `src/content/blog/` in `Category/Year/` folders:

```
src/content/blog/
  AI/2022/first-post.md
  Games/2022/second-post.md
  Short Stories/2025/the-last-prompt.md
  Strategy/2024/north-star-metrics.md
  Technology/2024/using-mdx.mdx
```

The folder structure is for **authoring convenience only**. The `category` frontmatter field is the source of truth for URL generation.

## URL Generation

URLs are nested by category: `/blog/{category-slug-path}/{post-filename}/`

Examples:
- `category: 'AI'` + filename `first-post.md` becomes `/blog/ai/first-post/`
- `category: 'Games/Blender'` + filename `intro.md` becomes `/blog/games/blender/intro/`

### Utility Functions (`src/utils/posts.ts`)

| Function | Purpose |
|----------|---------|
| `getFilenameSlug(postId)` | Extracts filename from post ID (strips folder path) |
| `getSlug(postId)` | Alias for `getFilenameSlug` |
| `getFullSlug(post)` | Returns `{category-slug-path}/{filename}` — uses `data.slug` if set, else filename |
| `getPostUrl(post)` | Returns full URL path: `/blog/{fullSlug}/` |
| `getFeaturedPost(posts)` | Selects featured post (see below) |

### Category Utilities (`src/utils/categories.ts`)

| Function | Purpose |
|----------|---------|
| `slugify(name)` | Converts display label to URL slug |
| `categoryToSlugPath(category)` | Converts slash-separated labels to slug path |
| `isValidCategoryPath(category)` | Validates against `CATEGORY_TREE` |
| `labelPathFromSlugPath(slugPath)` | Reverse lookup: slug path to display labels |
| `buildCategoryBreadcrumbs(slugPath)` | Generates breadcrumb items for a category page |
| `buildPostBreadcrumbs(catSlugPath, title)` | Generates breadcrumb items for a blog post |
| `getCategoryNode(slugPath)` | Returns subtree for a given slug path |
| `getChildCategories(slugPath)` | Returns immediate children of a category |
| `getDescendantPaths(slugPath)` | Returns all descendant slug paths (recursive) |
| `getAllSlugPaths()` | Returns all valid slug paths |
| `buildCategoryUrl(slugPath)` | Returns `/blog/{slugPath}/` |

## Routing

### Catch-All Route (`src/pages/blog/[...slug].astro`)

A single dynamic route handles both category listing pages and blog post pages using a **discriminated union**:

```typescript
type CategoryProps = {
  type: 'category';
  categoryLabel: string;
  categorySlugPath: string;
  breadcrumbs: BreadcrumbItem[];
  subcategories: ChildCategory[];
  posts: CollectionEntry<'blog'>[];
};

type PostProps = {
  type: 'post';
  post: CollectionEntry<'blog'>;
  breadcrumbs: BreadcrumbItem[];
  categorySlugPath: string;
};

type Props = CategoryProps | PostProps;
```

- **Category listings**: One per entry in `ALL_CATEGORY_PATHS` (e.g., `/blog/ai/`, `/blog/games/`). Shows posts in that category and all descendants, sorted by `pubDate` descending.
- **Blog posts**: One per post. Renders `BlogPost` layout with reading time calculated at `~225 words/min`.

### Build-Time Collision Detection

The `getStaticPaths()` function checks for:
1. **Post-to-post collisions**: Two posts with the same category + filename produce an error.
2. **Post-to-category collisions**: A post whose full slug matches a category path produces an error.

## Featured Post System

`getFeaturedPost()` in `src/utils/posts.ts`:

1. Filter posts where `featuredTill >= today` (build date for SSG)
2. Among those, pick the first (posts are pre-sorted by `pubDate` descending)
3. If none qualify, fall back to the first post (most recent by `pubDate`)

**Usage**: Set `featuredTill: YYYY-MM-DD` in frontmatter to pin a post as featured until that date. The featured post gets a larger 2-column card layout and is excluded from the regular grid.

Used on both the homepage "Latest Writing" section and the blog index (`/blog`).

## Blog Index & Category Navigation

The blog index (`src/pages/blog/index.astro`):

- "All" label (active state) + category links to `/blog/ai/`, `/blog/games/`, etc.
- No client-side JS filtering — categories are separate pages
- Backwards compatibility: `?category=X` query param redirects to `/blog/{slug}/` via inline script
- Featured post gets a larger 2-column card layout; remaining posts in a grid

## Breadcrumbs

`src/components/Breadcrumbs.astro`:
- Chevron SVG separators between items
- Final item rendered as `<span>` (current page), rest as `<a>` links
- Includes `BreadcrumbList` JSON-LD schema for SEO
- Styled: `font-mono text-xs uppercase tracking-widest`
- Used in both `BlogPost.astro` and `CategoryListing.astro`

## Share Buttons

`src/components/ShareSocial.astro`:
- Networks: X, LinkedIn, Facebook, WhatsApp, Telegram
- Placed twice in `BlogPost.astro`: in the article header (after reading time) and after the prose content
- Styled with accent green hover: `text-[#107C41] dark:text-accent`
