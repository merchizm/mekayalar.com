import { error } from '@sveltejs/kit';
export const csr = true; // https://github.com/sveltejs/kit/pull/6446

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, setHeaders }) {
	let gists = null;
	let repos = null;
	try {
		gists = await fetch(`/api/github/gists.json`);
		repos = await fetch(`/api/github/repositories.json`);
		if (repos.status > 400) return new Response(await repos.text(), { status: repos.status });

		if (gists.status > 400) return new Response(await gists.text(), { status: gists.status });

		setHeaders({
			'cache-control': 'public, max-age=60'
		});
		return {
			gists: await gists.json(),
			repos: await repos.json()
		};
	} catch (err) {
		console.error('error fetching repos and gists at [+page]library.svelte: ', err, gists, repos);
		throw error(500, 'error fetching repos and gists at [+page]library.svelte');
	}
}
