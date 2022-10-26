import {error, json} from "@sveltejs/kit";
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
    const res = await fetch(`http://localhost/myProjects/spotify_np_api/json`);

    if (res.status > 400) {
        return error(res.status, await res.text());
    }
    return json(await res.json(), {
        headers: {
            'Cache-Control': `max-age=0, s-maxage=${60}` // 1 minute for now
        }
    });
}