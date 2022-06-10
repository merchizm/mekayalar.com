<script context="module">
  import {
    SITE_URL,
    SITE_TITLE,
    SITE_DESCRIPTION,
    SITE_KEYWORDS,
    MY_TWITTER_HANDLE
  } from '$lib/siteConfig';
  export const prerender = true; // index page is most visited, lets prerender
  import Navigation from "../component/Navigation.svelte";
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
  <meta name="twitter:creator" content={'@' + MY_TWITTER_HANDLE}>
  <meta name="twitter:card" content="summary">
</svelte:head>


<div class="wrapper">
  <Navigation/>

</div>

<script>
  window.hide = (element) => {
    document.querySelector(element).style.display = 'none';
  }

  window.show = (element) => {
    document.querySelector(element).style.display = 'flex';
  }
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
  window.hide('#screen_saver');
  document.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    window.hide('#screen_saver');
  });

  document.addEventListener("mouseleave", (function () {
    if (mouseY < 100) {
      toggle('#screen_saver')
      clearInterval(interval);
      interval = loop(span,byeArray);
    }
    else {
      clearInterval(interval);
      window.hide('#screen_saver');
    }
  }));
</script>