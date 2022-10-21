import {error, json} from "@sveltejs/kit";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
    let access_token = 'BQCljglQBHmDERWU-j5-PCSOBmDb4-4Jj2TGAdvn1r5MIwPe4yBE7Dm-eR98_cNc2XVSv-ctJk-50vZVJsX-0M8wOSyEIqdubBKPpjIKK-MoMiqlPJ2reyUAqZzzah3VdXPf9jI1o-kYCNkR1zwIRJpzt_jmMa6j6pN18TqlZqOmfzxnyNeRgVDZWIq2wGjT6nQMSntgZeQ';
    const res = await fetch(`http://localhost/myProjects/spotify_np_api/?access_token=${access_token}`);

    if (res.status > 400) {
        return error(res.status, await res.text());
    }
    return json(await res.json(), {
        headers: {
            'Cache-Control': `max-age=0, s-maxage=${60}` // 1 minute for now
        }
    });
}