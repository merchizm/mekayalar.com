import { error } from '@sveltejs/kit';
export const csr = true; // https://github.com/sveltejs/kit/pull/6446

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, setHeaders }) {
	let res = null;
	try {
		res = await fetch(`/api/raindrop/getBookmarksGroupByDay.json`);
		if (res.status > 400) {
			return new Response(await res.text(), { status: res.status });
		}
		setHeaders({
			'cache-control': 'public, max-age=60'
		});
		return {
			bookmarks: await res.json()
		};
	} catch (err) {
		console.error('error fetching bookmarks at [+page]bookmarks.svelte: ', res, err);
		throw error(500, 'error fetching bookmarks at [+page]bookmarks.svelte: ' + res);
	}
}
