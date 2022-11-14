<script>
	export let href;
	import { page } from '$app/stores';
	$: isActive = $page.url.pathname === $$props.href;
</script>

<li>
	{#if isActive}
		<a {href} class="active">
			<slot />
		</a>
	{:else}
		<a {href} data-sveltekit-prefetch>
			<slot />
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
			transition: all 0.4s ease;
			&:hover {
				background-color: var(--menu-hover);
				filter: brightness(90%);
				color: var(--menu-hover-text);
			}

			&:focus {
				background-color: var(--menu-hover);
				filter: brightness(55%);
			}
		}

		.active {
			color: var(--menu-active);
			background-color: var(--menu-hover);

			&:hover {
				filter: brightness(100%);
			}
		}
	}
</style>
