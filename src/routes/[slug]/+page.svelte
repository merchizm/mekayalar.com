<script>
    import Comments from '../../component/Comments.svelte';
    import {SOCIAL_CONNECTIONS, SITE_URL, SITE_DESCRIPTION} from '$lib/siteConfig.js';
    import {formatDistance} from "date-fns";
    import tr from "date-fns/locale/tr/index";

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('$lib/types').ContentItem} */
    $: json = data.json;

</script>

<svelte:head>
    <title>{json.title}</title>
    {#if json.canonical !== 'self'} <link rel="canonical" href={json.canonical}/> {/if}
    <meta property="og:url" content={SITE_URL}/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content={json.title}/>
    <meta name="description" content={json.description}/>
    <meta property="og:description" content={json.description}/>
    <meta name="twitter:card" content={json.image ? 'summary_large_image' : 'summary'}/>
    {#if SOCIAL_CONNECTIONS.twitter}
        <meta name="twitter:creator" content={'@' + SOCIAL_CONNECTIONS.twitter}/>
    {/if}
    <meta name="twitter:title" content={json.title}/>
    <meta name="twitter:description" content={json.description}/>
    {#if json.image}
        <meta property="og:image" content={json.image}/>
        <meta name="twitter:image" content={json.image}/>
    {/if}
</svelte:head>

<article>
    <div>
        <a href={`https://github.com/` + SOCIAL_CONNECTIONS.github}>{SOCIAL_CONNECTIONS.github}</a> / <span>{formatDistance(new Date(json.date), new Date(), { addSuffix: true, locale: tr })}</span>
        <h1>{json.title}</h1>
    </div>
    {@html json.content}
</article>

<Comments/>

<style lang="scss">
  article div {
    color: var(--light-color);

    span{
      transition: all 0.3s ease;
    }
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--color);
  }

  :global(article a) {
    color: var(--color);
    text-decoration: none;

    &:hover {
      color: var(--light-color);
      filter: brightness(70%);
    }

    &:visited {
      color: var(--light-color);
      filter: brightness(50%);
    }
  }

  :global(article p) {
    color: var(--color);
    padding-top:4px;
    padding-bottom: 4px;
  }

  :global(article img) {
    max-width: 50vw;
  }

  :global(article h2) {
    font-size:1.6em;
  }

  :global(article ol){
    list-style: none;
    padding-left: 1.625em;
  }

  :global(article ol li:before){
      content: "\2022";
      color: var(--color);
      display: inline-block;
      width: 1em;
      margin-left: -1em;
  }

  :global(.br-bold){
    display: inline;
    font-weight: 800;
    font-size:1.1em;
  }
</style>