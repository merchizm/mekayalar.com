import {error} from "@sveltejs/kit";
export const csr = true;

export async function load({fetch}) {
    let res = null;
    try {
        res = await fetch(`/api/currentlyPlaying.json`);
        if (res.status > 400) {
            return new Response(await res.text(), { status:  res.status });
        }
        return await res.json();
    } catch (err) {
        console.error('error fetching currently playing music on spotify, ', res, err);
        throw error(500, 'error fetching currently playing music on spotify : ' + res );
    }
}
