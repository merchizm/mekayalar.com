import { getContent } from '$lib/content';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ params }) {
    const { slug } = params;
    let data;
    try {
        data = await getContent(slug);
        return new Response(JSON.stringify(data), {
            headers: {
                'Cache-Control': `max-age=0, s-maxage=${60}`
            }
        });
    } catch (err) {
        return new Response(err.message, { status: 404 });
    }
}
