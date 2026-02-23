// @ts-check

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://alexmorcillo.com',
	integrations: [mdx(), sitemap(), svelte()],
	vite: {
		plugins: [tailwindcss()],
	},
});
