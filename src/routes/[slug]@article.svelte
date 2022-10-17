<script context="module">
    // export const prerender = true; // you can uncomment to prerender as an optimization
    export const hydrate = true;
    import {SOCIAL_CONNECTIONS, REPO_URL, SITE_URL, SITE_DESCRIPTION} from '$lib/siteConfig';
    import Comments from '../component/Comments.svelte';

    export async function load({url, params, fetch}) {
        const slug = params.slug;
        let res = null;
        try {
            res = await fetch(`/api/blog/${slug}.json`);
            if (res.status > 400) {
                return {
                    status: res.status,
                    error: await res.text()
                };
            }

            return {
                props: {
                    json: await res.json(),
                    slug,
                    REPO_URL
                },
                cache: {
                    maxage: 60 // 1 minute
                }
            };
        } catch (err) {
            console.error('error fetching blog post at [slug].svelte: ' + slug, res, err);
            return {
                status: 500,
                error: new Error('error fetching blog post at [slug].svelte: ' + slug + ': ' + res)
            };
        }
    }
</script>

<script>
    /** @type {import('$lib/types').ContentItem} */
    export let json; // warning: if you try to destructure content here, make sure to make it reactive, or your page content will not update when your user navigates
</script>

<svelte:head>
    <title>{json.title}</title>
    <meta name="description" content="{SITE_DESCRIPTION}"/>
    <link rel="canonical" href={SITE_URL}/>
    <meta property="og:url" content={SITE_URL}/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content={json.title}/>
    <meta name="Description" content={json.description}/>
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
        <h1>{json.title}</h1>
        <div>
            <a href={json.ghMetadata.issueUrl} rel="external" target="_blank"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                        d="m335 499c14 0 12 17 12 17h-182s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"
                        fill="#fff" />
            </svg> üzerinde <b>{new Date(json.date).toISOString().slice(0, 10)}</b>'da yazıldı.</a>
        </div>
    </div>
    {@html json.content}
</article>

<Comments/>

<style lang="scss">

  article div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      a {
        svg {
          width: 18px;

          path {
            fill: var(--color);
          }
        }
      }
    }
  }

  h1{
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  :global(article a) {
    overflow: hidden;
    font-weight: 500;
    position: relative;
    display: inline-block;
    outline: none;
    vertical-align: bottom;
    text-decoration: none;
    white-space: nowrap;
    color: var(--color);

    &::before, &::after {
      pointer-events: none;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-font-smoothing: antialiased;
      font-smoothing: antialiased;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: var(--link-bg);
      content: '';
      -webkit-transition: -webkit-transform 0.2s;
      transition: transform 0.2s;
      -webkit-transform: translateY(95%);
      transform: translateY(95%);
    }

    &:hover::before, &:focus::before {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
</style>