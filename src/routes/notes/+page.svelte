<script>
    import { page } from '$app/stores';

    import Note from '../../component/Note.svelte';
    /** @type {import('./$types').PageData} */
    export let data;

    // technically this is a slighlty different type because doesn't have 'content' but we'll let it slide
    /** @type {import('$lib/types').ContentItem[]} */
    $: items = data.items;

    function searchParamToArray(key) {
        return ($page.url.searchParams.get(key) || '').split(',').filter((e) => e);
    }

    let selectedCategories = searchParamToArray('show');
    let search = $page.url.searchParams.get('filter') || '';
    let inputEl;

    let isTruncated = items?.length > 20;
    $: list = items
        .filter((item) => {
            if (selectedCategories.length) {
                return selectedCategories
                    .map((element) => {
                        return element.toLowerCase();
                    })
                    .includes(item.category.toLowerCase());
            }
            return true;
        })
        .filter((item) => {
            if (search) {
                return item.title.toLowerCase().includes(search.toLowerCase());
            }
            return true;
        })
        .slice(0, isTruncated ? 2 : items.length);
</script>

<svelte:head>
    <title>Notes</title>
    <meta name="description" content="Tüm notlarım">
    <meta property="og:description" content="Tüm notlarım" />
    <meta property="twitter:description" content="Tüm notlarım" />
</svelte:head>


<div>
    {#if list.length}
        {#each list as item}
            <Note href={item.slug} title={item.title} date={new Date(item.date).toISOString().slice(0, 10)} category={item.category}/>
        {/each}
        {#if isTruncated}
            <div>
                <button on:click={() => (isTruncated = false)} >
                    Load More Posts...
                </button>
            </div>
        {/if}
    {/if}
</div>