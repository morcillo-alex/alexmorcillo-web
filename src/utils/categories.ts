import { ALL_CATEGORY_PATHS, CATEGORY_TREE, type CategoryTree } from '@/consts';

export function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

// Build a lookup map: slugPath -> labelPath (e.g. 'ai' -> 'AI', 'games/blender' -> 'Games/Blender')
const slugToLabelMap = new Map<string, string>();
for (const labelPath of ALL_CATEGORY_PATHS) {
	const slugPath = labelPath
		.split('/')
		.map((s) => slugify(s))
		.join('/');
	slugToLabelMap.set(slugPath, labelPath);
}

export function categoryToSlugPath(category: string): string {
	const slugPath = category
		.split('/')
		.map((s) => slugify(s))
		.join('/');
	return slugPath;
}

export function isValidCategoryPath(category: string): boolean {
	const slugPath = categoryToSlugPath(category);
	return slugToLabelMap.has(slugPath);
}

export function labelPathFromSlugPath(slugPath: string): string {
	return slugToLabelMap.get(slugPath) ?? slugPath;
}

export interface BreadcrumbItem {
	label: string;
	href: string;
}

export function buildCategoryBreadcrumbs(slugPath: string): BreadcrumbItem[] {
	const crumbs: BreadcrumbItem[] = [{ label: 'Blog', href: '/blog/' }];
	const segments = slugPath.split('/');
	let accumulated = '';
	for (const seg of segments) {
		accumulated = accumulated ? `${accumulated}/${seg}` : seg;
		const labelPath = labelPathFromSlugPath(accumulated);
		const label = labelPath.split('/').pop()!;
		crumbs.push({ label, href: `/blog/${accumulated}/` });
	}
	return crumbs;
}

export function buildPostBreadcrumbs(
	categorySlugPath: string,
	postTitle: string,
): BreadcrumbItem[] {
	const crumbs = buildCategoryBreadcrumbs(categorySlugPath);
	crumbs.push({ label: postTitle, href: '' });
	return crumbs;
}

export function getCategoryNode(slugPath: string): CategoryTree | null {
	const labelPath = labelPathFromSlugPath(slugPath);
	if (!labelPath) return null;
	const segments = labelPath.split('/');
	let node: CategoryTree = CATEGORY_TREE;
	for (const seg of segments) {
		if (!(seg in node)) return null;
		node = node[seg];
	}
	return node;
}

export interface ChildCategory {
	label: string;
	slug: string;
	fullSlugPath: string;
}

export function getChildCategories(slugPath: string): ChildCategory[] {
	const node = getCategoryNode(slugPath);
	if (!node) return [];
	return Object.keys(node).map((label) => {
		const childSlug = slugify(label);
		return {
			label,
			slug: childSlug,
			fullSlugPath: `${slugPath}/${childSlug}`,
		};
	});
}

export function getDescendantPaths(slugPath: string): string[] {
	const paths = [slugPath];
	const children = getChildCategories(slugPath);
	for (const child of children) {
		paths.push(...getDescendantPaths(child.fullSlugPath));
	}
	return paths;
}

export function buildCategoryUrl(slugPath: string): string {
	return `/blog/${slugPath}/`;
}

export function getAllSlugPaths(): string[] {
	return ALL_CATEGORY_PATHS.map((labelPath) =>
		labelPath
			.split('/')
			.map((s) => slugify(s))
			.join('/'),
	);
}
