import { json } from '@sveltejs/kit';
import { getGists } from '$lib/github.js';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const gists = await getGists();
	return json(gists, {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=120`
		}
	});
}
