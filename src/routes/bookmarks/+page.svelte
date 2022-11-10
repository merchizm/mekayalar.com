<script>
    import BookmarkCard from "../../component/BookmarkCard.svelte";
    import {format, startOfWeek} from "date-fns";

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('$lib/types').Bookmark[]} */
    $: json = data.bookmarks;

    let dateStartOfWeek = startOfWeek(new Date(), {weekStartsOn: 1});
    let year = format(dateStartOfWeek, "yyyy");
</script>
<svelte:head>
    <title>Bookmarks</title>
    <meta name="description" content="Beğendiğim, benim veya sizin için yararlı olacağını düşündüğüm ve saklamak istediğim, kategorize edilmemiş içerikler."/>
    <meta property="og:description" content="Beğendiğim, benim veya sizin için yararlı olacağını düşündüğüm ve saklamak istediğim, kategorize edilmemiş içerikler." />
    <meta property="twitter:description" content="Beğendiğim, benim veya sizin için yararlı olacağını düşündüğüm ve saklamak istediğim, kategorize edilmemiş içerikler." />
    <meta property="og:title" content='Bookmarks'/>
    <meta name="twitter:title" content='Bookmarks'/>
</svelte:head>

<p>
    Beğendiğim, benim veya sizin için yararlı olacağını düşündüğüm ve saklamak istediğim, kategorize edilmemiş içerikler.
</p>

{#each [...Object.entries(json).sort((a, b) => parseInt(b) - parseInt(a))] as [key, value]}
    <div id="week_container_{key}">
        <h2>{key}. Hafta, {year}</h2>
        <div id="week">
            {#each value as bookmark}
                <BookmarkCard title={bookmark.title} link={bookmark.link} domain={bookmark.domain} created={bookmark.created} />
            {/each}
        </div>
    </div>
{/each}

<style lang="scss">
    p {
        font-size: 1.3em;
        margin-bottom: 2rem;
    }

    div[id^=week_container]{
        h2{
          font-size: 1.5em;
          color: var(--color);
          filter: brightness(70%);
          font-weight: normal;
        }
        margin-top: 1em;
        margin-bottom: 1em;
    }
</style>