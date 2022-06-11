<script>
  import { fade } from "svelte/transition";
  // theme setting //
  const theme_status = {
    light: "☁️",
    dark: "☀️"
  };

  function checkTheme() {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches))
      localStorage.setItem("theme", "dark");
    else
      localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", localStorage.theme);
    return theme_status[localStorage.theme];
  }

  let current_theme = checkTheme(true);

  function toggleTheme() {
    localStorage.theme = (localStorage.theme === "dark") ? "light" : "dark";
    current_theme = checkTheme();
  }

  // font adjustment //
  const container = document.querySelector(".container");
  const fontSizes = ["12px", "14px", "", "18px", "20px", "22px", "24px", "26px"];

  (function() {
    if (localStorage.getItem("current_font_size") !== undefined)
      container.style.fontSize = localStorage.getItem("current_font_size");
    check_font();
  })();

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
    document.querySelector("#normalize_font").style.display = 'none';
  }

  function check_font() {
    if (fontSizes.indexOf(container.style.fontSize) === 2)
      document.querySelector("#normalize_font").style.display = 'none';
    else
      document.querySelector("#normalize_font").style.display = 'flex';
  }
</script>

<div class="buttons">
  <div>
    {#key current_theme}
      <button transition:fade on:click={toggleTheme}>
        {current_theme}
      </button>
    {/key}

    <button class="spotify">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 50 50" width="20px" height="20px">
        <path
          d="M25.009,1.982C12.322,1.982,2,12.304,2,24.991S12.322,48,25.009,48s23.009-10.321,23.009-23.009S37.696,1.982,25.009,1.982z M34.748,35.333c-0.289,0.434-0.765,0.668-1.25,0.668c-0.286,0-0.575-0.081-0.831-0.252C30.194,34.1,26,33,22.5,33.001 c-3.714,0.002-6.498,0.914-6.526,0.923c-0.784,0.266-1.635-0.162-1.897-0.948s0.163-1.636,0.949-1.897 c0.132-0.044,3.279-1.075,7.474-1.077C26,30,30.868,30.944,34.332,33.253C35.022,33.713,35.208,34.644,34.748,35.333z M37.74,29.193 c-0.325,0.522-0.886,0.809-1.459,0.809c-0.31,0-0.624-0.083-0.906-0.26c-4.484-2.794-9.092-3.385-13.062-3.35 c-4.482,0.04-8.066,0.895-8.127,0.913c-0.907,0.258-1.861-0.272-2.12-1.183c-0.259-0.913,0.272-1.862,1.184-2.12 c0.277-0.079,3.854-0.959,8.751-1c4.465-0.037,10.029,0.61,15.191,3.826C37.995,27.328,38.242,28.388,37.74,29.193z M40.725,22.013 C40.352,22.647,39.684,23,38.998,23c-0.344,0-0.692-0.089-1.011-0.275c-5.226-3.068-11.58-3.719-15.99-3.725 c-0.021,0-0.042,0-0.063,0c-5.333,0-9.44,0.938-9.481,0.948c-1.078,0.247-2.151-0.419-2.401-1.495 c-0.25-1.075,0.417-2.149,1.492-2.4C11.729,16.01,16.117,15,21.934,15c0.023,0,0.046,0,0.069,0 c4.905,0.007,12.011,0.753,18.01,4.275C40.965,19.835,41.284,21.061,40.725,22.013z" />
      </svg>
    </button>
  </div>

  <div class="font-buttons">
    <button id="normalize_font" on:onclick={normalize_font} style="display: none">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
        <path
          d="M14 18.6H7.3V17.2H14Q15.7 17.2 16.925 16.137Q18.15 15.075 18.15 13.475Q18.15 11.85 16.925 10.787Q15.7 9.725 14 9.725H7.125L9.975 12.575L8.975 13.55L4.45 9.025L8.975 4.5L9.975 5.5L7.125 8.325H14Q16.275 8.325 17.913 9.8Q19.55 11.275 19.55 13.475Q19.55 15.675 17.913 17.137Q16.275 18.6 14 18.6Z" />
      </svg>
    </button>
    <button id="decrease_font" on:onclick={decrease_font}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
        <path
          d="M1.175 18.85 6.55 4.95H8.525L13.9 18.85H11.9L10.575 15.15H4.575L3.15 18.85ZM5.1 13.5H9.95L7.575 7.2H7.45ZM15.2 12.825V11.175H22.85V12.825Z" />
      </svg>
    </button>
    <button id="increase_font" on:onclick={increase_font}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
        <path
          d="M1.15 18.85 6.525 4.95H8.5L13.875 18.85H11.875L10.55 15.15H4.55L3.125 18.85ZM5.075 13.5H9.925L7.55 7.2H7.425ZM18.175 15.875V12.825H15.125V11.175H18.175V8.125H19.825V11.175H22.875V12.825H19.825V15.875Z" />
      </svg>
    </button>
  </div>
</div>

<style lang="scss">

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

  .buttons {
    padding: 5px;
    display: flex;
    justify-content: space-between;

    button {
      background-color: transparent;
      border: 0;
      font-size: 1.5rem;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:hover {
        border-radius: 50%;
        background-color: var(--menu-hover);
      }
    }

    .spotify{
      &:hover{
        background-color: transparent;
      }
    }

    .font-buttons {
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

    .buttons-right{
      display: flex;
      align-items: center;
      .font-buttons {
        width: 100px;
        margin-left: 10px;
        fill: var(--color);
        display: flex;
        justify-content: flex-end;
        @extend %button;
      }

      .icons{
        display: flex;
        @extend %button;
      }
    }

  }
</style>