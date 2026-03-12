export type CategoryTree = { [label: string]: CategoryTree };

export const CATEGORY_TREE: CategoryTree = {
	AI: {},
	Games: {},
	'Short Stories': {},
	Strategy: {},
	Technology: {},
};

function collectPaths(tree: CategoryTree, prefix = ''): string[] {
	const paths: string[] = [];
	for (const label of Object.keys(tree)) {
		const path = prefix ? `${prefix}/${label}` : label;
		paths.push(path);
		paths.push(...collectPaths(tree[label], path));
	}
	return paths;
}

export const ALL_CATEGORY_PATHS: string[] = collectPaths(CATEGORY_TREE);
export const CATEGORIES = Object.keys(CATEGORY_TREE);
export type Category = string;

export const SITE_TITLE = 'Alex Morcillo';
export const SITE_TITLE_FULL = 'Alex Morcillo — Architect Lead & AI Engineer at Roche | Patent Inventor';
export const SITE_DESCRIPTION =
	'Inside the AI shifts happening. 17 years in regulated software, 11 patents, and the unfiltered takes you won\'t find on LinkedIn.';
export const SITE_AUTHOR = 'Alex Morcillo';

export const CATEGORY_META: Record<string, { description: string }> = {
	AI: {
		description:
			'How AI is changing work as the new "Industrial Revolution". Reasoning models, cognitive load, developer tools, and the gap between hype and reality.',
	},
	Games: {
		description:
			'Godot, Three.js, and game architecture from a software engineer who builds production systems by day and games by night.',
	},
	'Short Stories': {
		description:
			'Speculative fiction exploring AI, automation, and the future we\'re building whether we\'re ready or not.',
	},
	Strategy: {
		description:
			'North Star metrics, product execution, and strategy frameworks from 17 years shipping software in regulated environments.',
	},
	Technology: {
		description:
			'Architecture patterns, performance optimization, and the technical decisions that matter when building at scale.',
	},
};
export const SITE_AUTHOR_FULL = 'Alex Morcillo Montejo';
export const TWITTER_HANDLE = '@alexmorcillo82';
export const SOCIAL_LINKS = {
	github: 'https://github.com/morcillo-alex',
	twitter: 'https://x.com/alexmorcillo82',
	linkedin: 'https://www.linkedin.com/in/alexmorcillo/',
};
