<script context="module">
    export async function load({params, fetch}) {
        const res = await fetch(`/api/listContent.json`);
        // alternate strategy https://www.davidwparker.com/posts/how-to-make-an-rss-feed-in-sveltekit
        if (res.status > 400) {
            return {
                status: res.status,
                error: await res.text()
            };
        }

        /** @type {import('$lib/types').ContentItem[]} */
        const items = await res.json();
        return {
            props: {items},
            cache: {
                maxage: 60 // 1 minute
            }
        };
    }
</script>

<script>
    import Note from '../component/Note.svelte';

    export let list;

    // technically this is a slighlty different type because doesnt have 'content' but we'll let it slide
    /** @type {import('$lib/types').ContentItem[]} */
    export let items;

    let inputEl;
    function focusSearch(e) {
        if (e.key === '/' && inputEl) inputEl.select();
    }

    let isTruncated = items.length > 20;
    let search;
    $: list = items
        .filter((item) => {
            if (search) {
                return item.title.toLowerCase().includes(search.toLowerCase());
            }
            return true;
        })
        .slice(0, isTruncated ? 2 : items.length);
</script>


<div>
    {#if list.length}
        {#each list as item}
            <Note href={item.slug} title={item.title} date={new Date(item.date).toISOString().slice(0, 10)}/>
        {/each}
        {#if isTruncated}
            <div>
                <button
                        on:click={() => (isTruncated = false)}
                        class="inline-block rounded bg-blue-100 p-4 text-lg font-bold tracking-tight text-black hover:text-yellow-900 dark:bg-blue-900 dark:text-white hover:dark:text-yellow-200 md:text-2xl"
                >
                    Load More Posts...
                </button>
            </div>
        {/if}
    {/if}
</div>