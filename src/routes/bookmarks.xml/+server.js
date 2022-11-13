import RSS from 'rss';
import { SITE_TITLE, SITE_URL, SOCIAL_CONNECTIONS } from '$lib/siteConfig';
import { getBookmarks } from '$lib/bookmarks.js';

// Reference: https://github.com/sveltejs/kit/blob/master/examples/hn.svelte.dev/src/routes/%5Blist%5D/rss.js
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
	const feed = new RSS({
		title: SITE_TITLE + ' Bookmarks RSS',
		site_url: SITE_URL,
		feed_url: SITE_URL + '/bookmarks.xml'
	});

	const bookmarks = await getBookmarks(0);
	bookmarks.forEach((bookmark) => {
		feed.item({
			id: String(bookmark._id),
			date: new Date(bookmark.created),
			title: bookmark.title,
			link: bookmark.link,
			description: bookmark.excerpt,
			content: bookmark.excerpt,
			author: {
				name: SITE_TITLE,
				email: SOCIAL_CONNECTIONS.mail,
				link: SITE_URL
			}
		});
	});

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=${600}`, // 10 minutes
			'Content-Type': 'application/rss+xml'
		}
	});
}
