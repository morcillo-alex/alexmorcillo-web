# Agent Memory — viral-tech-blog-writer

## Blog Identity
- Site: alexmorcillo.com — personal tech blog by Alex Morcillo
- Categories (must match CATEGORY_TREE exactly): AI, Games, Architecture, Technology
- Nested categories use slash notation with display labels: e.g. `Games/Blender`
- Author voice: first-person, curious, sharp, opinionated — like a brilliant friend who knows a lot

## File Structure
- Blog posts go in: `src/content/blog/{Category}/{Year}/filename.mdx`
- Hero image path depth for Category/Year/ nesting: `../../../../assets/blog/filename.jpg`
- Leave heroImage as a comment if no image asset exists: `# heroImage: '../../../../assets/blog/...'`

## Frontmatter Rules
- title: 50-65 chars, SEO-optimized, click-worthy
- description: 150-160 chars for CTR
- category: must exactly match CATEGORY_TREE path (e.g. 'AI', 'Games/Blender')
- pubDate: YYYY-MM-DD, no quotes around date value
- tags: 3-6 lowercase hyphenated strings
- heroImage is optional — if no image asset, leave as a comment line starting with #

## Published Posts (to avoid duplication)
- AI/2022/first-post.md — appears to be a placeholder/demo post
- AI/2022/ai-first-post.md — appears to be a placeholder/demo post
- AI/2026/two-years-that-changed-ai.mdx — "The Two Years That Rewrote AI: 2024 to February 2026" (published 2026-02-23)
- AI/2026/ai-cognitive-load.mdx — "AI Is Not a Tool. It Is Work. And Your Brain Knows It." (published 2026-02-25) — cognitive/mental impact of AI, neuroplasticity, Kahneman System 1/2, Gardner multiple intelligences, bandwidth flip, supervision trap

## Writing Conventions
- No cliches: never start with "In today's world", never use "delve", "testament", "tapestry", "game-changer", "realm of"
- Hook: first 150 words must make stopping impossible — provocative question, surprising stat, bold claim
- Sections: H2 headings should be curiosity-gap phrased or promise a clear benefit
- Closing: memorable takeaway or thought-provoking question — never trail off
- Inline citations: use Markdown links, not footnotes
- Research footnote: add an italicized research note at the end of long retrospective articles linking to key sources

## Length Guidelines
- Hot takes / news: 600-900 words
- Trend analysis / how-to: 1,200-1,800 words
- Deep-dive / evergreen: 2,000-3,000 words

## Quality Checks Before Delivery
1. Would I click this headline in my feed?
2. Does the hook make stopping impossible?
3. Is every section earning its place?
4. Does the frontmatter description maximize CTR?
5. Is the heroImage either a real path or a comment placeholder?
6. Is the category a valid CATEGORY_TREE entry?
