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
  import WelcomeSection from "../component/WelcomeSection.svelte";
  import SocialSection from "../component/SocialSection.svelte";

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
    <WelcomeSection>
      <h1 slot="title">Hi, I'm Enes &lt;merchizm&gt; Kayalar</h1>
      <p slot="paragraph">
        little about me
      </p>
    </WelcomeSection>
    <SocialSection/>

  </Container>
</div>

<script>
// screen saver //
    let mouseX = 0;
    let mouseY = 0;
    const byeArray = ['körişirbiz', 'görüşürüz', 'αντιο', 'ցտեսություն', 'bi xatirê te', 'ნახვამდის', 'довиждане', 'увидимся', 'хayr', 'көрүшкөнчө', 'кездескенше', 'találkozunk', '또 봐요', 'tschüss', 'goodbye', 'doei', 'au revoir', 'şalom', 'vale', 'hasta la vista', 'namaste', 'さようなら', 'vemo-nos', 'прощай', 'slán', 'hüvasti', 'hei hei'];
    let span = document.querySelector('#korisirbiz');
    let interval = null;
    let toggle = (element) => {
      if (document.querySelector(element).style.display === 'none')
        document.querySelector(element).style.display = 'flex';
      else
        document.querySelector(element).style.display = 'none';
    }

    let loop = (span, array) => {
      let rand = Math.floor(Math.random() * array.length);
      span.innerText = array[rand];

      let index = 0;
      return setInterval(function(){
        if(array.length > index) {
          let rand = Math.floor(Math.random() * array.length);
          span.innerText = array[rand];
          index++;
        }
        else
          index = 0;
      },1000);
    }
    document.querySelector('#screen_saver').style.display = 'none';
    document.addEventListener("mousemove", function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.querySelector('#screen_saver').style.display = 'none';
    });

    document.addEventListener("mouseleave", (function () {
      if (mouseY < 100) {
        toggle('#screen_saver')
        clearInterval(interval);
        interval = loop(span,byeArray);
      }
      else {
        clearInterval(interval);
        document.querySelector('#screen_saver').style.display = 'none';
      }
    }));
</script>