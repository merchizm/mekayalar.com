<script context="module">
    /** @type {import('@sveltejs/kit').ErrorLoad} */
    export function load({ url, error, status }) {
        return {
            props: { error, status, url }
        };
    }
</script>

<script>
    // import Nav from '../components/Nav.svelte';
    import { dev } from '$app/env';
    import { SOCIAL_CONNECTIONS } from '$lib/siteConfig';

    export let url;
    export let status;
    export let error;

    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;

    let message = offline ? 'İnternete bağlı değilsin.' : error?.message;

    let title = offline ? 'Offline' : status;
    if (status === 404) {
        title = 'Sayfa bulunamadı';
    }else{
        message = 'Üzgünüm bilinmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin. Bir hata olduğunu düşünüyorsanız, lütfen bana bildirin.';
    }
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div>
    <h1>{status} — {title}</h1>

    {#if status === 404}
        <p><code>{url.pathname}</code> adında bir sayfa bulunamadı. | <a href={'/ideas/?filter=' + url.pathname.slice(1)}> Sitede arayın</a></p>
        <p>Eğer bunun bir hata olduğunu düşünüyorsanız bana, <a href="mailto:{SOCIAL_CONNECTIONS.mail}">{SOCIAL_CONNECTIONS.mail}</a> üzerinden ulaşın.</p>
    {:else}
        <p>{message}</p>
    {/if}
    {#if dev && error.stack}
        <pre>{error.stack}</pre>
    {/if}
</div>