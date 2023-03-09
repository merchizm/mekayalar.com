import { REPO_URL } from '$lib/siteConfig';
import { error } from '@sveltejs/kit';

export const csr = true; // https://github.com/sveltejs/kit/pull/6446

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, setHeaders }) {
	const slug = params.slug;
	let res = await fetch(`/api/blog/${slug}.json`);
	if (res.status > 400) {
		throw error(res.status, await res.json().message);
	}
	setHeaders({
		'cache-control': 'public, max-age=3600'
	});
	return {
		json: await res.json(),
		slug,
		REPO_URL
	};
}
