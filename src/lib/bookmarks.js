import {format, parseISO} from "date-fns";
import _ from "lodash-es";

export async function getBookmarks(page){
    let collection_id = '28611701'; // @see { @link https://developer.raindrop.io/v1/collections/methods }
    let perPage = 50;
    let created = '2021-01-01';
    let end_point = [
        `https://api.raindrop.io/rest/v1/raindrops/${collection_id}`,
        `?perpage=${perPage}`,
        `&page=${page}`,
        `&search=created:>${created}`,
        `&sort=-created`,
    ].join("");

    const res = await fetch(end_point, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_RAINDROP_ACCESS_TOKEN}`,
        },
    });

    const data = await res.json();

    if (await data.count === perPage) {
        return data.items.concat(await getBookmarks(page + 1));
    } else {
        return data.items;
    }
}

// @source { @link https://github.com/ademilter/homepage/blob/master/lib/raindrop.ts }
export async function getBookmarksGroupByWeek() {
    return _.groupBy(await getBookmarks(0), (bookmark) => {
        const dateISO = parseISO(bookmark.created);
        const week = format(dateISO, "I"); // week of year
        const month = format(dateISO, "M"); // month of year
        if (month  === "1" && ["52", "53"].includes(week)) return 0;
        return week;
    });
}