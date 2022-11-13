import { error } from '@sveltejs/kit';
export const csr = true; // https://github.com/sveltejs/kit/pull/6446

export async function load({ setHeaders, fetch }) {
	const res = await fetch(`/api/listContent.json`);
	// alternate strategy https://www.davidwparker.com/posts/how-to-make-an-rss-feed-in-sveltekit
	if (res.status > 400) {
		throw error(res.status, await res.text());
	}

	/** @type {import('$lib/types').ContentItem[]} */
	const items = await res.json();
	setHeaders({
		'cache-control': 'public, max-age=60' // 1 minute
	});
	return { items };
}
