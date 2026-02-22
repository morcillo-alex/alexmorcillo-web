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
