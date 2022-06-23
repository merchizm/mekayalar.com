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
    padding: 10px;
    margin: 3px 0;

    a {
      font-size: 1rem;
      text-decoration: none;
      padding: 3px 8px;
      border-radius: 7px;
      color: var(--menu);

      &:hover {
        background-color: var(--menu-hover);
      }
    }

    .active {
      color: var(--menu-active);
    }
  }
</style>