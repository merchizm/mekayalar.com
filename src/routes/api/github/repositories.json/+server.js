import { json } from '@sveltejs/kit';
import { getRepos } from '$lib/github.js';
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
    const repos = await getRepos();
    return json(repos, {
        headers: {
            'Cache-Control': `max-age=0, s-maxage=${60}` // 1 minute for now
        }
    });
}
