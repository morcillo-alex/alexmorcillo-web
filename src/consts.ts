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
	'Architect Lead & AI Process/Software Engineer at Roche with 19+ years in software engineering, 11 patents, and an MBA from ESADE. Writing about AI, strategy, games, speculative fiction, and the technologies shaping our future.';
export const SITE_AUTHOR = 'Alex Morcillo';
export const SITE_AUTHOR_FULL = 'Alex Morcillo Montejo';
export const TWITTER_HANDLE = '@alexmorcillo82';
export const SOCIAL_LINKS = {
	github: 'https://github.com/morcillo-alex',
	twitter: 'https://x.com/alexmorcillo82',
	linkedin: 'https://www.linkedin.com/in/alexmorcillo/',
};
