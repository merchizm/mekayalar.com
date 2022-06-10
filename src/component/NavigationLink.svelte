<script>
  export let href;
  import { page } from '$app/stores';
  let activeClass = ($page.url.pathname === $$props.href) ? 'class="active"' : '';
</script>

<li>
  <a href="{href}" {activeClass}>
    <slot />
  </a>
</li>