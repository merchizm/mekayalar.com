<script>
    import {page} from '$app/stores';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

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
    let inputElement;

    $: if (browser) {
        const initialParams = $page.url.searchParams.toString();
        if (search) {
            $page.url.searchParams.set('filter', search);
        } else {
            $page.url.searchParams.delete('filter');
        }
        const newParams = $page.url.searchParams.toString();
        if (newParams !== initialParams) {
            goto(`?${newParams}`, { noscroll: true, keepfocus: true });
        }
    }

    function focusSearch(e) {
        if (e.key === '/' && inputElement) inputElement.select();
    }

    let isTruncated = items?.length > 20;
    $: list = items
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
    <meta name="description" content="Genel olarak buraya blog diyebiliriz fakat samimi ve farklı bir şey olmasını istediğim için ve
        kişiselleştirebilmek adına notlar demeyi tercih ediyorum.">
    <meta property="og:description" content="Genel olarak buraya blog diyebiliriz fakat samimi ve farklı bir şey olmasını istediğim için ve
        kişiselleştirebilmek adına notlar demeyi tercih ediyorum."/>
    <meta property="twitter:description" content="Genel olarak buraya blog diyebiliriz fakat samimi ve farklı bir şey olmasını istediğim için ve
        kişiselleştirebilmek adına notlar demeyi tercih ediyorum."/>
    <meta property="og:title" content='Notes'/>
    <meta name="twitter:title" content='Notes'/>
</svelte:head>

<svelte:window on:keyup={focusSearch} />

<div>
    <p>
        Genel olarak buraya blog diyebiliriz fakat samimi ve farklı bir şey olmasını istediğim için ve
        kişiselleştirebilmek adına notlar demeyi tercih ediyorum.
    </p>
    <div class="search_input">
        <input type="text" aria-label="Search Notes" placeholder="Hit / to search" bind:value={search} bind:this={inputElement}>
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m19.55 20.575-6.3-6.275q-.75.625-1.725.975-.975.35-2 .35-2.575 0-4.35-1.775Q3.4 12.075 3.4 9.5q0-2.55 1.775-4.338 1.775-1.787 4.35-1.787 2.55 0 4.325 1.775 1.775 1.775 1.775 4.35 0 1.075-.35 2.05-.35.975-.95 1.7l6.275 6.275Zm-10.025-6.45q1.925 0 3.263-1.35 1.337-1.35 1.337-3.275 0-1.925-1.337-3.275-1.338-1.35-3.263-1.35-1.95 0-3.287 1.35Q4.9 7.575 4.9 9.5q0 1.925 1.338 3.275 1.337 1.35 3.287 1.35Z"/></svg>
    </div>
    {#if list.length}
        {#each list as item}
            <Note href={item.slug} title={item.title} date={new Date(item.date).toISOString().slice(0, 10)}
                  category={item.category}/>
        {/each}
        {#if isTruncated}
            <div>
                <button on:click={() => (isTruncated = false)}>
                    Load More Posts...
                </button>
            </div>
        {/if}
    {/if}
</div>

<style lang="scss">
  p {
    font-size: 1.3em;
    margin-bottom: 2rem;
  }

  .search_input {
    position: relative;
    input[type="text"] {
      background-color: var(--button-hover);
      width: 80%;
      margin-left: 2em;
      margin-right: 2em;
      margin-bottom: 1em;
      padding: 0.4em 0.7em;
      font-size: 1.2em;
      border: 1px solid var(--social-bg);
      color: var(--color);
      border-radius: 0.5rem;

      &:focus {
        outline-color: #9c58e1;
        outline-style: solid;

      }
    }
    svg{
      position: absolute;
      right: 97px;
      top: 8px;
      fill: var(--svg);
      margin-right:2em;
    }
  }

  @media (max-width: 900px) {
    .search_input {
      input[type="text"] {
        width: 89%;
        margin-left: 0.2em;
        margin-right: 0.2em;
      }
      svg{
        right: -5px;
        top: 8px;
        fill: var(--svg);
      }
    }
  }
</style>