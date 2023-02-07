import { json } from '@sveltejs/kit';
import { getBookmarksGroupByDay } from '$lib/bookmarks.js';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const bookmarks = await getBookmarksGroupByDay();
	return json(bookmarks, {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=60`
		}
	});
}
