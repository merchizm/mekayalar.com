import { json } from '@sveltejs/kit';
import { getGists } from '$lib/github.js';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ fetch }) {
	const gists = await getGists(fetch);
	return json(gists, {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=120`
		}
	});
}
