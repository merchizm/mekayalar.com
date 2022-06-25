<section>
  <slot name="title" /> <!--- H1 --->
  <slot name="paragraph" /> <!--- P --->
  <slot name="others" />
</section>

<style lang="scss">
  section {
    p {
      font-size: 1.5em;
      margin-top: 20px;
      color: var(--light-color);
    }
  }
</style>