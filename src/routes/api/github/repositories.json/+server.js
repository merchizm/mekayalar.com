import { json } from '@sveltejs/kit';
import { getRepos } from '$lib/github.js';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ fetch }) {
	const repos = await getRepos(fetch);
	return json(repos, {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=120`
		}
	});
}
