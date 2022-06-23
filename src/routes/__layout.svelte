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
    <title>{SITE_TITLE}</title>
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
    <Container>
        <slot></slot>
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
        --menu-hover: var(--button-hover);
        --divider: #313136;
        --svg: var(--divider);
        --menu-active: #f1f1f1;
    }

    :global(body){
        --background-color: #FFFFFF;
        --color: #24292E;
        --light-color: #57606A;
        --image-bgc: #bc8aea;
        --button-hover: #efefef;
        --menu-hover: var(--button-hover);
        --divider: #222222;
        --menu-active: #000000;
        --svg: var(--divider);
        --svg-hover: #565555;
        --menu: #272727;

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