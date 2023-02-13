import { error, json } from '@sveltejs/kit';
import { SPOTIFY_API_RES } from '$lib/siteConfig.js';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ fetch }) {
	const res = await fetch(SPOTIFY_API_RES);

	if (res.status > 400) {
		return error(res.status, await res.text());
	}
	return json(await res.json());
}
