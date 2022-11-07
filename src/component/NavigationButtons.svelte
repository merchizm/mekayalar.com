<script>
    import {elasticInOut} from "svelte/easing";
    import {onMount} from 'svelte';
    import {page} from "$app/stores";
    import {SOCIAL_CONNECTIONS, NAVIGATION} from "$lib/siteConfig.js";

    $: spotify = 'My Spotify Profile';
    $: spotify_href = SOCIAL_CONNECTIONS.spotify;

    /** @type {import('./$lib/types').Music} */
    $: music = $page.data;

    const customTransition = () => {
        return {
            css: (t) => {
                return `
        transform: scale(${t});
        `;
            },
            easing: elasticInOut,
            duration: 600,
        };
    };

    let isActive = true;
    const theme_status = {
        light: `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 15q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Zm0 1.5q-1.875 0-3.188-1.312Q7.5 13.875 7.5 12q0-1.875 1.312-3.188Q10.125 7.5 12 7.5q1.875 0 3.188 1.312Q16.5 10.125 16.5 12q0 1.875-1.312 3.188Q13.875 16.5 12 16.5ZM2 12.75q-.325 0-.538-.213-.212-.212-.212-.537 0-.325.212-.538.213-.212.538-.212h2.25q.325 0 .537.212Q5 11.675 5 12q0 .325-.213.537-.212.213-.537.213Zm17.75 0q-.325 0-.538-.213Q19 12.325 19 12q0-.325.212-.538.213-.212.538-.212H22q.325 0 .538.212.212.213.212.538 0 .325-.212.537-.213.213-.538.213ZM12 5q-.325 0-.537-.213-.213-.212-.213-.537V2q0-.325.213-.538.212-.212.537-.212.325 0 .538.212.212.213.212.538v2.25q0 .325-.212.537Q12.325 5 12 5Zm0 17.75q-.325 0-.537-.212-.213-.213-.213-.538v-2.25q0-.325.213-.538Q11.675 19 12 19q.325 0 .538.212.212.213.212.538V22q0 .325-.212.538-.213.212-.538.212ZM6 7.05 4.75 5.825q-.225-.225-.213-.538.013-.312.213-.537.225-.225.538-.225.312 0 .537.225L7.05 6q.225.225.225.525 0 .3-.225.525-.2.225-.5.212-.3-.012-.55-.212Zm12.175 12.2L16.95 18q-.225-.225-.225-.525 0-.3.225-.525.2-.225.5-.212.3.012.55.212l1.25 1.225q.225.225.213.537-.013.313-.213.538-.225.225-.537.225-.313 0-.538-.225ZM16.95 7.05q-.225-.2-.212-.5.012-.3.212-.55l1.225-1.25q.225-.225.538-.213.312.013.537.213.225.225.225.537 0 .313-.225.538L18 7.05q-.225.225-.525.225-.3 0-.525-.225Zm-12.2 12.2q-.225-.225-.225-.538 0-.312.225-.537L6 16.95q.225-.225.525-.225.3 0 .525.225.225.2.213.5-.013.3-.213.55l-1.225 1.25q-.225.225-.537.225-.313 0-.538-.225ZM12 12Z"/></svg>`,
        dark: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" width="24"><path d="M12.025 20.5q-3.55 0-6.025-2.475Q3.525 15.55 3.525 12q0-3.4 2.3-5.825 2.3-2.425 5.65-2.625.2 0 .413.012.212.013.412.038-.775.725-1.225 1.737-.45 1.013-.45 2.163 0 2.45 1.725 4.175 1.725 1.725 4.175 1.725 1.175 0 2.175-.45 1-.45 1.7-1.225.05.2.063.412.012.213.012.413-.2 3.35-2.625 5.65-2.425 2.3-5.825 2.3Zm0-1.5q2.2 0 3.95-1.212 1.75-1.213 2.55-3.163-.5.125-1 .2-.5.075-1 .075-3.075 0-5.237-2.162Q9.125 10.575 9.125 7.5q0-.5.075-1t.2-1q-1.95.8-3.162 2.55Q5.025 9.8 5.025 12q0 2.9 2.05 4.95Q9.125 19 12.025 19Zm-.25-6.75Z"/></svg>`
    };
    let current_theme = ''; // defined to bypass undefined error
    let n_font, container;

    function checkTheme() {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches))
            localStorage.setItem("theme", "dark");
        else
            localStorage.setItem("theme", "light");
        document.body.className = localStorage.theme + '-theme';
        return theme_status[localStorage.theme];
    }

    function toggleTheme() {
        localStorage.theme = (localStorage.theme === "dark") ? "light" : "dark";
        current_theme = checkTheme();
    }

    // font adjustment //

    const fontSizes = ["12px", "14px", "", "18px", "20px", "22px", "23px"];

    onMount(() => {

        current_theme = checkTheme(true);

        container = document.querySelector("#container");
        if (localStorage.getItem("current_font_size") !== undefined)
            container.style.fontSize = localStorage.getItem("current_font_size");
        check_font();
    });


    function decrease_font() {
        if (fontSizes[fontSizes.indexOf(container.style.fontSize) - 1] !== undefined) {
            container.style.fontSize = fontSizes[fontSizes.indexOf(container.style.fontSize) - 1];
            localStorage.setItem("current_font_size", container.style.fontSize);
            check_font();
        }
    }

    function increase_font() {
        if (fontSizes[fontSizes.indexOf(container.style.fontSize) + 1] !== undefined) {
            container.style.fontSize = fontSizes[fontSizes.indexOf(container.style.fontSize) + 1];
            localStorage.setItem("current_font_size", container.style.fontSize);
            check_font();
        }
    }

    function normalize_font() {
        container.style.fontSize = fontSizes[2];
        localStorage.removeItem("current_font_size");
        n_font.style.display = 'none';
    }

    function check_font() {
        if (fontSizes.indexOf(container.style.fontSize) === 2)
            n_font.style.display = 'none';
        else
            n_font.style.display = 'flex';
    }

    function save_offline() {
        if ('serviceWorker' in navigator && navigator.onLine) {
            let saved_svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="#A61137" height="24" width="24"><path d="M17.475 9 15 6.525l1.05-1.075 1.425 1.425L21 3.325 22.075 4.4ZM5.5 20.25V5.3q0-.75.525-1.275Q6.55 3.5 7.3 3.5H13V5H7.3q-.1 0-.2.1t-.1.2v12.65l5-2.15 5 2.15V11h1.5v9.25l-6.5-2.8ZM7 5h6-1Z"/></svg>`;
            let currentPath = window.location.pathname;
            let pageResources = [currentPath];
            let images = document.querySelectorAll('#container img');

            // get all images on the page
            images.forEach(function (img) {
                pageResources.push(img.src);
            });

            let pageCache = caches.match(window.location.href);
            pageCache.then(function (response) {
                if (typeof response !== 'undefined') {
                    document.getElementById('cache_button').innerHTML = saved_svg;
                } else {
                    // Open the unique cache for this URL
                    caches.open('rocks-offline-' + currentPath).then(function (cache) {
                        let updateCache = cache.addAll(pageResources);

                        // Update UI to indicate success
                        // Or catch any errors if it doesn't succeed
                        updateCache.then(function () {
                            document.getElementById('cache_button').innerHTML = saved_svg;
                            document.getElementById('cache_button').ariaLabel = 'Article Saved for Offline';

                            console.log('Article is now available offline.');
                        }).catch(function (error) {
                            console.error('Article could not be saved offline.', error);
                        });
                    });
                }
            });
        } else {
            console.error('seems like your browser does not support offline mode, unfortunately my love.');
        }
    }

    // @see { @link https://github.com/JSneak/bionic-reading-firefox-pdf/blob/master/src/ContentScript/index.js }
    function highlight_text(text){
        return text.replace(/\p{L}+/gu, (word) => {
            const { length } = word;
            let mid_point = 3;
            if (length > 3) mid_point = Math.round(length / 2);
            const firstHalf = word.slice(0, mid_point);
            const secondHalf = word.slice(mid_point);
            return `<div class="br-bold">${firstHalf}</div>${secondHalf}`;
        });
    }

    function bionic_reader() {
        let article = document.querySelector('article').children;
        let allowed_elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'font', 'span', 'li'];
        const parser = new DOMParser();

        for (let i = 1; i < article.length; i++) { // iteration starts with 1 because first item includes metadata
            if (allowed_elements.indexOf(article[i].tagName.toLowerCase()) !== -1) { // if element is allowed
                const text = parser.parseFromString(article[i].innerHTML, 'text/html');
                const textArrTransformed = Array.from(text.body.childNodes).map((node) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        return highlight_text(node.textContent);
                    }
                    return node.outerHTML;
                });
                article[i].innerHTML = textArrTransformed.join(' ');
            }
        }
    }

    function bionic_reader_toggle(){
        if (document.querySelector('.br-bold') === null) {
            bionic_reader();
        } else {
            document.querySelectorAll('.br-bold').forEach((node) => {
                node.outerHTML = node.textContent;
            });
        }
    }
</script>

<div>
    <div>
        <div class="menu-wrap">
            <input type="checkbox" class="toggle" id="mobil_nav">
            <label for="mobil_nav" style="z-index: 11">
                <div class="hamburger"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3.25 17.625v-1.5h17.5v1.5Zm0-4.875v-1.5h17.5v1.5Zm0-4.875v-1.5h17.5v1.5Z"/></svg></div>
            </label>
            <div class="menu">
                <div>
                    <div>
                        <ul>
                            {#each NAVIGATION as {url, name} }
                                <li><a href="{url}" onclick="document.querySelector('#mobil_nav').click(); // eheheheh temporary solution :3">{name}</a></li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {#key current_theme}
            <button in:customTransition on:click={toggleTheme} aria-label="Change Appearance">
                {@html current_theme}
            </button>
        {/key}
        <button class="spotify" aria-label={music.is_playing ? music.name + ' - ' + music.artists : spotify}
                on:click={() => { window.open(music.is_playing ? music.url : spotify_href); }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px">
                <path
                        d="M25.009,1.982C12.322,1.982,2,12.304,2,24.991S12.322,48,25.009,48s23.009-10.321,23.009-23.009S37.696,1.982,25.009,1.982z M34.748,35.333c-0.289,0.434-0.765,0.668-1.25,0.668c-0.286,0-0.575-0.081-0.831-0.252C30.194,34.1,26,33,22.5,33.001 c-3.714,0.002-6.498,0.914-6.526,0.923c-0.784,0.266-1.635-0.162-1.897-0.948s0.163-1.636,0.949-1.897 c0.132-0.044,3.279-1.075,7.474-1.077C26,30,30.868,30.944,34.332,33.253C35.022,33.713,35.208,34.644,34.748,35.333z M37.74,29.193 c-0.325,0.522-0.886,0.809-1.459,0.809c-0.31,0-0.624-0.083-0.906-0.26c-4.484-2.794-9.092-3.385-13.062-3.35 c-4.482,0.04-8.066,0.895-8.127,0.913c-0.907,0.258-1.861-0.272-2.12-1.183c-0.259-0.913,0.272-1.862,1.184-2.12 c0.277-0.079,3.854-0.959,8.751-1c4.465-0.037,10.029,0.61,15.191,3.826C37.995,27.328,38.242,28.388,37.74,29.193z M40.725,22.013 C40.352,22.647,39.684,23,38.998,23c-0.344,0-0.692-0.089-1.011-0.275c-5.226-3.068-11.58-3.719-15.99-3.725 c-0.021,0-0.042,0-0.063,0c-5.333,0-9.44,0.938-9.481,0.948c-1.078,0.247-2.151-0.419-2.401-1.495 c-0.25-1.075,0.417-2.149,1.492-2.4C11.729,16.01,16.117,15,21.934,15c0.023,0,0.046,0,0.069,0 c4.905,0.007,12.011,0.753,18.01,4.275C40.965,19.835,41.284,21.061,40.725,22.013z"/>
            </svg>
        </button>
    </div>

    <div>
        <div class="article-buttons">
            <div class="icons">
                {#if $page.params.slug}
                    <button aria-label="Save Article" id="cache_button" on:click={save_offline}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M7.075 17.85 12 15.725 16.925 17.85V5.1Q16.925 5.1 16.925 5.1Q16.925 5.1 16.925 5.1H7.075Q7.075 5.1 7.075 5.1Q7.075 5.1 7.075 5.1ZM5.2 20.7V5.1Q5.2 4.325 5.75 3.775Q6.3 3.225 7.075 3.225H16.925Q17.7 3.225 18.25 3.775Q18.8 4.325 18.8 5.1V20.7L12 17.8ZM16.925 5.1H12H7.075Q7.075 5.1 7.075 5.1Q7.075 5.1 7.075 5.1H16.925Q16.925 5.1 16.925 5.1Q16.925 5.1 16.925 5.1Z"/>
                        </svg>
                    </button>

                    <button aria-label="Bionic Reader">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" on:click={bionic_reader_toggle}>
                            <path d="M21.17,2.06A13.1,13.1,0,0,0,19,1.87a12.94,12.94,0,0,0-7,2.05,12.94,12.94,0,0,0-7-2,13.1,13.1,0,0,0-2.17.19,1,1,0,0,0-.83,1v12a1,1,0,0,0,1.17,1,10.9,10.9,0,0,1,8.25,1.91l.12.07.11,0a.91.91,0,0,0,.7,0l.11,0,.12-.07A10.9,10.9,0,0,1,20.83,16a1,1,0,0,0,1.17-1v-12A1,1,0,0,0,21.17,2.06ZM11,15.35a12.87,12.87,0,0,0-6-1.48c-.33,0-.66,0-1,0v-10a8.69,8.69,0,0,1,1,0,10.86,10.86,0,0,1,6,1.8Zm9-1.44c-.34,0-.67,0-1,0a12.87,12.87,0,0,0-6,1.48V5.67a10.86,10.86,0,0,1,6-1.8,8.69,8.69,0,0,1,1,0Zm1.17,4.15A13.1,13.1,0,0,0,19,17.87a12.94,12.94,0,0,0-7,2.05,12.94,12.94,0,0,0-7-2.05,13.1,13.1,0,0,0-2.17.19A1,1,0,0,0,2,19.21,1,1,0,0,0,3.17,20a10.9,10.9,0,0,1,8.25,1.91,1,1,0,0,0,1.16,0A10.9,10.9,0,0,1,20.83,20,1,1,0,0,0,22,19.21,1,1,0,0,0,21.17,18.06Z"/>
                        </svg>
                    </button>
                {/if}
            </div>
        </div>

        <div class="font-buttons">
            <button bind:this={n_font} on:click={normalize_font} style="display: none"
                    aria-label="Set font size to default">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                    <path d="M14 18.6H7.3V17.2H14Q15.7 17.2 16.925 16.137Q18.15 15.075 18.15 13.475Q18.15 11.85 16.925 10.787Q15.7 9.725 14 9.725H7.125L9.975 12.575L8.975 13.55L4.45 9.025L8.975 4.5L9.975 5.5L7.125 8.325H14Q16.275 8.325 17.913 9.8Q19.55 11.275 19.55 13.475Q19.55 15.675 17.913 17.137Q16.275 18.6 14 18.6Z"/>
                </svg>
            </button>
            <button on:click={decrease_font} aria-label="Decrease font size">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                    <path d="M1.175 18.85 6.55 4.95H8.525L13.9 18.85H11.9L10.575 15.15H4.575L3.15 18.85ZM5.1 13.5H9.95L7.575 7.2H7.45ZM15.2 12.825V11.175H22.85V12.825Z"/>
                </svg>
            </button>
            <button on:click={increase_font} aria-label="Increase font size">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                    <path d="M1.15 18.85 6.525 4.95H8.5L13.875 18.85H11.875L10.55 15.15H4.55L3.125 18.85ZM5.075 13.5H9.925L7.55 7.2H7.425ZM18.175 15.875V12.825H15.125V11.175H18.175V8.125H19.825V11.175H22.875V12.825H19.825V15.875Z"/>
                </svg>
            </button>
        </div>

    </div>
</div>

<style lang="scss">

  svg {
    fill: var(--svg);
  }

  %tooltip {
    &[aria-label] {
      position: relative;

      &::after, &::before {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -10px);
        opacity: 0;
        transition: .2s;
      }

      &:hover {
        &::before, &::after {
          opacity: 1;
          transform: translate(-50%);
        }
      }

      &::before {
        content: '';
        top: calc(100% + 4px);
        border: solid 3px transparent;
        border-bottom-color: var(--button-hover);
      }

      &::after {
        white-space: pre;
        content: attr(aria-label);
        top: calc(100% + 10px);
        padding: .41em .83em;
        font-size: .775rem;
        color: var(--color);
        border-radius: 3px;
        background: var(--button-hover);
      }
    }
  }

  div {
    padding: 2px 0;
    display: flex;
    justify-content: space-between;

    button {
      /* reset default button attributes */
      position: relative;
      background-color: transparent;
      border: 0;

      /* alignment adjustments */
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;

      /* apply button styles */
      font-size: 1.5rem;
      cursor: pointer;
      height: 2.25rem;
      width: 2.25rem;

      &:focus {
        outline: none;
      }

      @extend %tooltip;

      &:hover {
        background-color: var(--button-hover);
        border-radius: 10%;
      }
    }

    .spotify {
      &:hover {
        svg {
          fill: #43bd2c;
        }
        background-color: transparent;
      }
    }

    .font-buttons {
      width: 100px;
      margin-left: 10px;
      fill: var(--color);
      display: flex;
      justify-content: flex-end;
      @extend %tooltip;
    }
  }
  .menu-wrap {
    .toggle {
      position: absolute;
      top: -20px;
      left: 0;
      opacity: 0;
      &:checked {
        ~ {
          .menu {
            visibility: visible;
            >div {
              transform: scale(1);
              transition-duration: 0.3s;
              >div {
                opacity: 1;
                transition: opacity 0.4s ease 0.4s;
              }
            }
          }
          .hamburger{
            background-color: var(--button-hover);
          }
        }
      }
    }
    .hamburger {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      cursor: pointer;
      height: 2.25rem;
      width: 2.25rem;

      &:hover {
        background-color: var(--button-hover);
        border-radius: 10%;
      }
    }
    .menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      visibility: hidden;
      overflow: hidden;
      display: flex;
      z-index: 5;
      background: var(--background-color);
      align-items: center;
      justify-content: center;
      >div {
        background: var(--overlay-color);
        border-radius: 50%;
        width: 200vw;
        height: 200vw;
        display: flex;
        flex: none;
        align-items: center;
        justify-content: center;
        transform: scale(1);
        transition: all 0.4s ease;
        >div {
          text-align: center;
          max-width: 90vw;
          max-height: 100vh;
          opacity: 0;
          transition: opacity 0.4s ease;
          >ul {
            >li {
              list-style: none;
              color: var(--color);
              font-size: 1.5rem;
              padding: 1rem;
              >a {
                color: inherit;
                text-decoration: none;
                transition: color 0.4s ease;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 900px) {
    .menu-wrap {
      display: none;
    }
  }

</style>