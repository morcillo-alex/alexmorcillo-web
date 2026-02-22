export const CATEGORIES = ['AI', 'Games', 'Architecture', 'Technology'] as const;
export type Category = (typeof CATEGORIES)[number];

export const SITE_TITLE = 'Alex Morcillo';
export const SITE_DESCRIPTION = 'Exploring AI, games, architecture, and the ideas shaping our future.';
export const SITE_AUTHOR = 'Alex Morcillo';
export const TWITTER_HANDLE = '@alexmorcillo82';
export const SOCIAL_LINKS = {
	github: 'https://github.com/morcillo-alex',
	twitter: 'https://x.com/alexmorcillo82',
	linkedin: 'https://www.linkedin.com/in/alexmorcillo/',
};
