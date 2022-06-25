<script>
  import { elasticInOut } from "svelte/easing";
  import { onMount } from 'svelte';
  export let article;
  $: isArticle = article === true;

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
    light: "☁️",
    dark: "☀️"
  };
  let current_theme;
  let n_font, container;

  function checkTheme() {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches))
      localStorage.setItem("theme", "dark");
    else
      localStorage.setItem("theme", "light");
    document.body.className =  localStorage.theme+'-theme';
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
</script>

<div>
  <div>
    {#key current_theme}
      <button in:customTransition on:click={toggleTheme}>
        {current_theme}
      </button>
    {/key}

    <button>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px">
        <path
          d="M25.009,1.982C12.322,1.982,2,12.304,2,24.991S12.322,48,25.009,48s23.009-10.321,23.009-23.009S37.696,1.982,25.009,1.982z M34.748,35.333c-0.289,0.434-0.765,0.668-1.25,0.668c-0.286,0-0.575-0.081-0.831-0.252C30.194,34.1,26,33,22.5,33.001 c-3.714,0.002-6.498,0.914-6.526,0.923c-0.784,0.266-1.635-0.162-1.897-0.948s0.163-1.636,0.949-1.897 c0.132-0.044,3.279-1.075,7.474-1.077C26,30,30.868,30.944,34.332,33.253C35.022,33.713,35.208,34.644,34.748,35.333z M37.74,29.193 c-0.325,0.522-0.886,0.809-1.459,0.809c-0.31,0-0.624-0.083-0.906-0.26c-4.484-2.794-9.092-3.385-13.062-3.35 c-4.482,0.04-8.066,0.895-8.127,0.913c-0.907,0.258-1.861-0.272-2.12-1.183c-0.259-0.913,0.272-1.862,1.184-2.12 c0.277-0.079,3.854-0.959,8.751-1c4.465-0.037,10.029,0.61,15.191,3.826C37.995,27.328,38.242,28.388,37.74,29.193z M40.725,22.013 C40.352,22.647,39.684,23,38.998,23c-0.344,0-0.692-0.089-1.011-0.275c-5.226-3.068-11.58-3.719-15.99-3.725 c-0.021,0-0.042,0-0.063,0c-5.333,0-9.44,0.938-9.481,0.948c-1.078,0.247-2.151-0.419-2.401-1.495 c-0.25-1.075,0.417-2.149,1.492-2.4C11.729,16.01,16.117,15,21.934,15c0.023,0,0.046,0,0.069,0 c4.905,0.007,12.011,0.753,18.01,4.275C40.965,19.835,41.284,21.061,40.725,22.013z" />
      </svg>
    </button>
  </div>

  <div>
    <div class="article-buttons">
      <div class="icons">
        {#if isArticle}
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7.075 17.85 12 15.725 16.925 17.85V5.1Q16.925 5.1 16.925 5.1Q16.925 5.1 16.925 5.1H7.075Q7.075 5.1 7.075 5.1Q7.075 5.1 7.075 5.1ZM5.2 20.7V5.1Q5.2 4.325 5.75 3.775Q6.3 3.225 7.075 3.225H16.925Q17.7 3.225 18.25 3.775Q18.8 4.325 18.8 5.1V20.7L12 17.8ZM16.925 5.1H12H7.075Q7.075 5.1 7.075 5.1Q7.075 5.1 7.075 5.1H16.925Q16.925 5.1 16.925 5.1Q16.925 5.1 16.925 5.1Z"/></svg>
          </button>

          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24"><path d="M21.17,2.06A13.1,13.1,0,0,0,19,1.87a12.94,12.94,0,0,0-7,2.05,12.94,12.94,0,0,0-7-2,13.1,13.1,0,0,0-2.17.19,1,1,0,0,0-.83,1v12a1,1,0,0,0,1.17,1,10.9,10.9,0,0,1,8.25,1.91l.12.07.11,0a.91.91,0,0,0,.7,0l.11,0,.12-.07A10.9,10.9,0,0,1,20.83,16a1,1,0,0,0,1.17-1v-12A1,1,0,0,0,21.17,2.06ZM11,15.35a12.87,12.87,0,0,0-6-1.48c-.33,0-.66,0-1,0v-10a8.69,8.69,0,0,1,1,0,10.86,10.86,0,0,1,6,1.8Zm9-1.44c-.34,0-.67,0-1,0a12.87,12.87,0,0,0-6,1.48V5.67a10.86,10.86,0,0,1,6-1.8,8.69,8.69,0,0,1,1,0Zm1.17,4.15A13.1,13.1,0,0,0,19,17.87a12.94,12.94,0,0,0-7,2.05,12.94,12.94,0,0,0-7-2.05,13.1,13.1,0,0,0-2.17.19A1,1,0,0,0,2,19.21,1,1,0,0,0,3.17,20a10.9,10.9,0,0,1,8.25,1.91,1,1,0,0,0,1.16,0A10.9,10.9,0,0,1,20.83,20,1,1,0,0,0,22,19.21,1,1,0,0,0,21.17,18.06Z"/></svg>
          </button>
        {/if}
      </div>
    </div>

    <div class="font-buttons">
      <button bind:this={n_font} on:click={normalize_font}  style="display: none">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path d="M14 18.6H7.3V17.2H14Q15.7 17.2 16.925 16.137Q18.15 15.075 18.15 13.475Q18.15 11.85 16.925 10.787Q15.7 9.725 14 9.725H7.125L9.975 12.575L8.975 13.55L4.45 9.025L8.975 4.5L9.975 5.5L7.125 8.325H14Q16.275 8.325 17.913 9.8Q19.55 11.275 19.55 13.475Q19.55 15.675 17.913 17.137Q16.275 18.6 14 18.6Z"/>
        </svg>
      </button>
      <button on:click={decrease_font}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path d="M1.175 18.85 6.55 4.95H8.525L13.9 18.85H11.9L10.575 15.15H4.575L3.15 18.85ZM5.1 13.5H9.95L7.575 7.2H7.45ZM15.2 12.825V11.175H22.85V12.825Z"/>
        </svg>
      </button>
      <button on:click={increase_font}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path d="M1.15 18.85 6.525 4.95H8.5L13.875 18.85H11.875L10.55 15.15H4.55L3.125 18.85ZM5.075 13.5H9.925L7.55 7.2H7.425ZM18.175 15.875V12.825H15.125V11.175H18.175V8.125H19.825V11.175H22.875V12.825H19.825V15.875Z"/>
        </svg>
      </button>
    </div>

  </div>
</div>

<style lang="scss">

  svg{
    fill: var(--svg);
  }

  %button {
    border-radius: .5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.25rem;
    width: 2.25rem;

    &:hover {
      border-radius: 10%;
    }
  }

  div {
    padding: 2px 0;
    display: flex;
    justify-content: space-between;

    button {
      background-color: transparent;
      border: 0;
      font-size: 1.5rem;
      cursor: pointer;
      border-radius: 50%;
      height: 2.25rem;
      width: 2.25rem;
      &:focus {
        outline: none;
      }

      &:hover {
        background-color: var(--button-hover);
      }
    }

    div:first-of-type{
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }


    div:last-of-type {
      display: flex;
      align-items: center;
      div:last-of-type {
        fill: var(--color);
        display: flex;
        justify-content: flex-end;

        button {
          border-radius: .5rem;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 2.25rem;
          width: 2.25rem;
          &:hover {
            border-radius: 10%;
          }
        }
      }

      .font-buttons {
        width: 100px;
        margin-left: 10px;
        fill: var(--color);
        display: flex;
        justify-content: flex-end;
        @extend %button;
      }

      .icons{
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

  }
</style>