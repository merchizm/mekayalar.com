<script>
  import NavigationButtons from "./NavigationButtons.svelte";
</script>

<main>
  <NavigationButtons/>
  <div class="divider"></div>
  <div class="container">
    <slot/>
  </div>
</main>

<style lang="scss">
  .container {
    margin-top: 50px;
    font-size: 16px;

    .content {
      margin: 50px 0;

      h2 {
        font-size: 1.3em;
        color: #fafafa;
        margin-bottom: 10px;
      }

      span {
        color: #71717A;
      }
    }

    h1 {
      font-size: 2em;
    }

    h2 {
      font-size: 1.5em;
    }
  }
</style>