import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getSlug } from '../utils/posts';

function escapeXml(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export async function GET(context) {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const items = posts
		.map(
			(post) => `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${new URL(`/blog/${getSlug(post.id)}/`, context.site)}</link>
      <guid>${new URL(`/blog/${getSlug(post.id)}/`, context.site)}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <category>${escapeXml(post.data.category)}</category>
    </item>`,
		)
		.join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${context.site}</link>
    <atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${posts[0]?.data.pubDate.toUTCString() ?? new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' },
	});
}
