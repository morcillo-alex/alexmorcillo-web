// @ts-check

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeMermaid from 'rehype-mermaid';
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
			[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
		],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
