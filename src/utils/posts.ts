export function getSlug(postId: string): string {
	return postId.split('/').pop()!;
}
