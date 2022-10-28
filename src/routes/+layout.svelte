<script>
    import {
        SITE_URL,
        SITE_TITLE,
        SITE_DESCRIPTION,
        SITE_KEYWORDS,
        SOCIAL_CONNECTIONS
    } from '$lib/siteConfig';

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
    <link
            rel="alternate"
            type="application/rss+xml"
            title={'RSS Feed for ' + SITE_TITLE}
            href="/rss.xml"
    />
</svelte:head>

<div class="wrapper">
    <Navigation/>
    <Container>
        <slot/>
    </Container>
</div>

<ScreenSaver/>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Catamaran&display=swap");
    :global(html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video){
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */
    :global(article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section) {
        display: block;
    }

    :global(ol, ul) {
        list-style: none;
    }
    :global(body.dark-theme){
        --background-color: #232326;
        --color: #D7D7DB;
        --light-color: #A1A1A9;
        --image-bgc: #bc8aea;
        --button-hover: #2f2f2fc1;
        --divider: #313136;
        --svg: #e7e5e5;

        --social-bg: #313133;
        --social-bg-hover: #3b3b3b;

        --repository-card-bg: #19191A;
        --repository-card-bg-hover: #161617;

        --menu-active: #f1f1f1;
        --menu: #ddd;
        --menu-hover: var(--button-hover);
        --menu-hover-text: #cccbcb;
    }

    :global(body){
        --background-color: #FFFFFF;
        --color: #24292E;
        --light-color: #57606A;
        --image-bgc: #bc8aea;
        --button-hover: #efefef;
        --divider: #393838;
        --svg: #222222;

        --social-bg: var(--button-hover);
        --social-bg-hover: #f3f3f3;

        --repository-card-bg: #e3e3e3;
        --repository-card-bg-hover: #ececec;

        --menu-active: #000000;
        --menu: #272727;
        --menu-hover: var(--button-hover);
        --menu-hover-text: #3b3939;

        -webkit-font-smoothing: antialiased;
        font-family: 'Catamaran', sans-serif;
        background-color: var(--background-color);
        color: var(--color);
    }

    :global(.wrapper){
        padding: 0 100px;
        display: flex;
        margin-bottom: 3rem;
    }

    @media screen and (max-width: 900px) {
        :global(.wrapper){
            padding: 0 10px;
        }
    }

</style>