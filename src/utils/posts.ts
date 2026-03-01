import type { CollectionEntry } from 'astro:content';
import { categoryToSlugPath } from './categories';

export function getFilenameSlug(postId: string): string {
	return postId.split('/').pop()!;
}

export const getSlug = getFilenameSlug;

export function getFullSlug(post: CollectionEntry<'blog'>): string {
	const categorySlug = categoryToSlugPath(post.data.category);
	const filename = getFilenameSlug(post.id);
	return `${categorySlug}/${filename}`;
}

export function getPostUrl(post: CollectionEntry<'blog'>): string {
	return `/blog/${getFullSlug(post)}/`;
}

export function getFeaturedPost(
	posts: CollectionEntry<'blog'>[],
): { featured: CollectionEntry<'blog'>; rest: CollectionEntry<'blog'>[] } | null {
	if (posts.length === 0) return null;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const activeFeatured = posts.filter(
		(p) => p.data.featuredTill && p.data.featuredTill >= today,
	);

	const featured = activeFeatured.length > 0 ? activeFeatured[0] : posts[0];
	const rest = posts.filter((p) => p.id !== featured.id);

	return { featured, rest };
}
