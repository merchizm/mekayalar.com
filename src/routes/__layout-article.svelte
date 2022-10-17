<script context="module">
    import {
        SITE_URL,
        SITE_TITLE,
        SITE_DESCRIPTION,
        SITE_KEYWORDS,
        SOCIAL_CONNECTIONS
    } from '$lib/siteConfig';
    export const prerender = true; // index page is most visited, lets prerender
    import Navigation from "../component/Navigation.svelte";
    import Container from "../component/Container.svelte";
    import ScreenSaver from "../component/ScreenSaver.svelte";
</script>

<svelte:head>
    <meta name="description" content={SITE_DESCRIPTION}>
    <meta name="keywords" content={SITE_KEYWORDS}>
    <link rel="canonical" href={SITE_URL} />
    <meta property="og:site_name" content={SITE_TITLE}>
    <meta property="og:type" content="website" />
    <meta property="og:url" content={SITE_URL}/>
    <meta property="og:title" content={SITE_TITLE} />
    <meta property="og:description" content={SITE_DESCRIPTION} />
    <meta property="og:image" content="/og_thumb.png"/>
    <meta name="twitter:card" content="summary"/>
    <meta property="twitter:title" content={SITE_TITLE} />
    <meta property="twitter:description" content={SITE_DESCRIPTION} />
    <meta property="twitter:image" content="/og_thumb.png" />
    <meta name="twitter:creator" content={'@' + SOCIAL_CONNECTIONS.twitter}>
    <meta name="twitter:card" content="summary">
</svelte:head>


<div class="wrapper">
    <Navigation/>
    <Container article="true">
        <slot/>
    </Container>
</div>

<ScreenSaver/>

<style>
    :global(body.dark-theme){
        --background-color: #232326;
        --color: #D7D7DB;
        --light-color: #A1A1A9;
        --image-bgc: #bc8aea;
        --button-hover: #2f2f2fc1;
        --divider: #313136;
        --svg: #e7e5e5;

        --link-bg: #1a1a1c;

        --menu-active: #f1f1f1;
        --menu: #ddd;
        --menu-hover: var(--button-hover);
    }

    :global(body){
        --background-color: #FFFFFF;
        --color: #24292E;
        --light-color: #57606A;
        --image-bgc: #bc8aea;
        --button-hover: #efefef;
        --divider: #393838;

        --svg: #222222;
        --svg-hover: #565555;

        --link-bg: #e7e7e7;

        --menu-active: #000000;
        --menu: #272727;
        --menu-hover: var(--button-hover);

        -webkit-font-smoothing: antialiased;
        font-family: 'Catamaran', sans-serif;
        background-color: var(--background-color);
        color: var(--color);
    }

    :global(.wrapper){
        padding: 0 100px;
        display: flex;
    }

</style>