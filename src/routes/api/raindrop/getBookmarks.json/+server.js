import { json } from '@sveltejs/kit';
import { getBookmarks } from '$lib/bookmarks.js';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
    const bookmarks = await getBookmarks(0);
    return json( bookmarks,{
        headers: {
            'Cache-Control': `max-age=0, s-maxage=${60}`
        }
    });
}
