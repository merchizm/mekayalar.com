import RSS from 'rss';
import { SITE_TITLE, SITE_URL } from '$lib/siteConfig';
import { listContent } from '$lib/content';

// Reference: https://github.com/sveltejs/kit/blob/master/examples/hn.svelte.dev/src/routes/%5Blist%5D/rss.js
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ fetch }) {
	const feed = new RSS({
		title: SITE_TITLE + ' RSS',
		site_url: SITE_URL,
		feed_url: SITE_URL + '/rss.xml',
		language: 'tr'
	});

	const allBlogs = await listContent(fetch);
	allBlogs.forEach((post) => {
		feed.item({
			title: post.title,
			url: SITE_URL + `/${post.slug}`,
			date: post.date,
			description: post.description
		});
	});

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=${600}`, // 10 minutes
			'Content-Type': 'application/rss+xml'
		}
	});
}

// misc notes for future users

// 	// use this if you want your content in a local '/content' folder rather than github issues
// 	// let allBlogs = import.meta.globEager('/content/**/*.md')
// 	Object.entries(allBlogs).forEach(([path, obj]) => {
// 		feed.item({
// 			title: obj.title,
// 			url: SITE_URL + `/${path.slice(9).slice(0, -3)}`,
// 			date: obj.date,
// 			description: obj.description
// 		});
// 	});
