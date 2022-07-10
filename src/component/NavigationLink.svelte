<script>
    export let href;
    import {page} from '$app/stores';
    $: isActive = $page.url.pathname === $$props.href;
</script>

<li>
    {#if isActive}
        <a href="{href}" class="active">
            <slot/>
        </a>
    {:else}
        <a href="{href}">
            <slot/>
        </a>
    {/if}
</li>

<style lang="scss">
  li {
    padding: 0.5rem;
    margin: 3px 0;

    a {
      font-size: 1.06rem;
      text-decoration: none;
      padding: 3px 8px;
      border-radius: 7px;
      color: var(--menu);

      &:hover {
        background-color: var(--menu-hover);
        filter: brightness(90%);
      }
    }

    .active {
      color: var(--menu-active);
      background-color: var(--menu-hover);
    }
  }
</style>