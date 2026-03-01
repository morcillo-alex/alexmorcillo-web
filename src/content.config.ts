import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { isValidCategoryPath } from './utils/categories';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			category: z.string().refine((val) => isValidCategoryPath(val), {
				message:
					'Category must be a valid path in CATEGORY_TREE (e.g. "AI", "Games/Blender/Modeling")',
			}),
			tags: z.array(z.string()).optional(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			featuredTill: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };
