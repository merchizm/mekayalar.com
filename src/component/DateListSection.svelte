<script>
     /** @type {import('$lib/types').DateListItem[]} */
    export let dateList;
</script>

<section>
  <slot name="title"></slot> <!--- H1 --->

  {#each dateList as {label, title, location, desc}}
    <div class="item">
      <div class="label">{label}</div>
      <div>
        <h3>{title}</h3>
        <small>{location}</small>
        <p>{desc}</p>
      </div>
    </div>
    {/each}
</section>

<style lang="scss">
  section {
    margin-top: 30px;

    div {
      margin-top: 20px;
      align-items: baseline;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: clamp(7em, 30vw, 1.5rem) 1fr;
      margin-bottom: calc(.5 * 1.5em);
      max-width: 50vw;

      div:first-of-type {
        font-size: 1.1em;
        box-sizing: border-box;
        color: #797673;
      }

      p {
        box-sizing: border-box;
        font-size: 1.1em;
        font-weight: 400;
        margin: 0.5em 0;
        max-width: 38rem;
      }

      h3 {
        box-sizing: border-box;
        color: #f8f6f5;
        font-size: 1.5em;
        font-weight: 500;
        max-width: 38rem;
      }

      small {
        box-sizing: border-box;
        color: #797673;
        font-size: .9em;
        line-height: 1.5;
      }
    }
  }

</style>