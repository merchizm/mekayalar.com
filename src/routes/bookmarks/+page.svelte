<script>
    import BookmarkCard from "../../component/BookmarkCard.svelte";
    import {format, startOfWeek} from "date-fns";

    /** @type {import('./$types').PageData[]} */
    export let data;

    /** @type {import('$lib/types').Bookmark[]} */
    $: json = data; // TODO: FIX THAT @see { @link https://github.com/sveltejs/svelte/issues/4289 }

    let dateStartOfWeek = startOfWeek(new Date(), {weekStartsOn: 1});
    let year = format(dateStartOfWeek, "yyyy");
</script>

<h1>Yer İmleri</h1>


{#each json as [key, value]}
    <div id="week_container">
        <h2>{key}. Hafta , {year}</h2>
        <div id="week">
            {#each value as bookmark}
                <BookmarkCard title={bookmark.title} link={bookmark.link} domain={bookmark.domain} created={bookmark.created} />
            {/each}
        </div>
    </div>
{/each}

<style lang="scss">
  h1 {
    font-size: 1.4em;
  }
</style>