import { json } from '@sveltejs/kit';
import { listContent } from '$lib/content';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ fetch }) {
	const list = await listContent(fetch);
	return json(list, {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=120`
		}
	});
}
