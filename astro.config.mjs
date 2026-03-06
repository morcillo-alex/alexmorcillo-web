// @ts-check

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeMermaid from 'rehype-mermaid';
import rehypeSlug from 'rehype-slug';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://alexmorcillo.com',
	integrations: [mdx(), sitemap(), svelte()],
	markdown: {
		rehypePlugins: [
			[rehypeMermaid, {
				strategy: 'inline-svg',
				mermaidConfig: {
					theme: 'neutral',
				},
			}],
			rehypeSlug,
			[rehypeAutolinkHeadings, {
				behavior: 'prepend',
				properties: { class: 'heading-anchor', ariaHidden: true, tabIndex: -1 },
				content: {
					type: 'element',
					tagName: 'span',
					properties: { class: 'heading-anchor-icon' },
					children: [{ type: 'text', value: '#' }],
				},
			}],
			[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
		],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
