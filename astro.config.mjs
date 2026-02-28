// @ts-check

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import rehypeExternalLinks from 'rehype-external-links';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://alexmorcillo.com',
	integrations: [mdx(), sitemap(), svelte()],
	markdown: {
		rehypePlugins: [
			[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
		],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
