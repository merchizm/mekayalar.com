<script>
    export let href, title, date;
</script>

<a href="{href}">
    <div>
        <h2>
            {title}
        </h2>
        <span>
            {date}
        </span>
    </div>
</a>

<style lang="scss">
  a {
    text-decoration: none;
    div {
      margin: 40px 0;

      h2 {
        font-size: 1.2em;
        color: var(--color);
        margin-bottom: 5px;
      }

      span {
        font-size: .9em;
        color: var(--light-color);
      }
    }
  }

</style>