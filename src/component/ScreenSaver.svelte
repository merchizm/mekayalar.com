<script context="module">
    import {SOCIAL_CONNECTIONS} from "$lib/siteConfig";
</script>


<script>
    let mouseX = 0;
    let mouseY = 0;
    const byeArray = ['körişirbiz', 'görüşürüz', 'αντιο', 'ցտեսություն', 'bi xatirê te', 'ნახვამდის', 'довиждане', 'увидимся', 'хayr', 'көрүшкөнчө', 'кездескенше', 'találkozunk', '또 봐요', 'tschüss', 'goodbye', 'doei', 'au revoir', 'şalom', 'vale', 'namaste', 'さようなら', 'vemo-nos', 'прощай', 'slán', 'hüvasti'];
    let span;
    let screen_saver;
    let interval = null;
    let timerId = null;

    function throttleFunction (func, delay) {
        if (timerId) {
            return
        }
        timerId  =  setTimeout(function () {
            func()
            timerId  =  undefined;
        }, delay)
    }

    let loop = (span, array) => {
        let rand = Math.floor(Math.random() * array.length);
        span.innerText = array[rand];

        let index = 0;
        return setInterval(function () {
            if (array.length > index) {
                let rand = Math.floor(Math.random() * array.length);
                span.innerText = array[rand];
                index++;
            } else
                index = 0;
        }, 1000);
    }
    if (typeof document !== 'undefined') {
        document.addEventListener("mousemove", function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            screen_saver.style.display = 'none';
        });

        document.addEventListener("mouseleave", (function () {
            throttleFunction(function(){
                if (mouseY < 100) {
                    if (screen_saver.style.display === 'none')
                        screen_saver.style.display = 'flex';
                    else
                        screen_saver.style.display = 'none';
                    clearInterval(interval);
                    interval = loop(span, byeArray);
                } else {
                    clearInterval(interval);
                    screen_saver.style.display = 'none';
                }
            }, 300);
        }));
    }
</script>

<div bind:this={screen_saver} style="display: none">
    <span id="korisirbiz" bind:this={span} >körişirbiz</span>
    <span class="bottom">Mesajınızı bekliyorum</span>
    <a href={'mailto:' + SOCIAL_CONNECTIONS.mail} class="bottom">{SOCIAL_CONNECTIONS.mail}</a>
</div>

<style lang="scss">
  div {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    background-color: var(--background-color);

    span:first-of-type {
      color: var(--color);
      font-size: 14vmin !important;
      font-weight: 500 !important;
      letter-spacing: 2px !important;
    }

    %bottom {
      position: absolute;
      bottom: 4vmin !important;
      margin: 5px !important;
    }

    span:last-of-type{
      @extend %bottom;
      bottom: 6vmin !important;
      color: var(--color) !important;
    }

    a {
      @extend %bottom;
      color: var(--light-color) !important;
      font-weight: 500 !important;
      text-decoration: none;
    }
  }
</style>