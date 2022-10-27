<script>
  import NavigationButtons from "./NavigationButtons.svelte";
  import { fly } from "svelte/transition";
  import { beforeNavigate } from '$app/navigation';
  let loading = false;
  // TODO: page transition break the font adjustment, fix that
  // beforeNavigate(() => {
  //   loading = !loading;
  // });
  const pageTransitionDuration = 400;
</script>

<main>
  <NavigationButtons/>
  <hr/>
  {#key loading}
  <div id="container" in:fly={{  y:-3, duration: pageTransitionDuration, delay: 400 }}
       out:fly={{ y: 3, duration: pageTransitionDuration }}>
    <slot/>
  </div>
  {/key}
</main>

<style lang="scss">
  main{
    margin-top: 25px;
    margin-left: 15px;
    width: 55vw;

    hr {
      border:0;
      margin:0;
      height:1px;
      width: 100%;
      border-top: 2px solid var(--divider);
    }

    div {
      margin-top: 30px;
      font-size: 16px;
    }
  }
</style>