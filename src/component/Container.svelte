<script>
  import NavigationButtons from "./NavigationButtons.svelte";
  export let article;
</script>

<main>
  <NavigationButtons {article}/>
  <hr/>
  <div id="container">
    <slot/>
  </div>
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

      h1 {
        font-size: 2em;
      }

      h2 {
        font-size: 1.5em;
      }
    }
  }
</style>