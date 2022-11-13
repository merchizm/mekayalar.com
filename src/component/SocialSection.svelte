<script>
	import { SOCIAL_CONNECTIONS } from '$lib/siteConfig';
</script>

<section>
	{#if SOCIAL_CONNECTIONS.twitter}
		<a href={'https://twitter.com/' + SOCIAL_CONNECTIONS.twitter} aria-label="Twitter Link">
			<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
				<path
					d="m437 152a72 72 0 0 1 -40 12 72 72 0 0 0 32-40 72 72 0 0 1 -45 17 72 72 0 0 0 -122 65 200 200 0 0 1 -145-74 72 72 0 0 0 22 94 72 72 0 0 1 -32-7 72 72 0 0 0 56 69 72 72 0 0 1 -32 1 72 72 0 0 0 67 50 200 200 0 0 1 -105 29 200 200 0 0 0 309-179 200 200 0 0 0 35-37"
					fill="#fff"
				/>
			</svg>
		</a>
	{/if}
	{#if SOCIAL_CONNECTIONS.linkedin}
		<a href={'https://linkedin.com/in/' + SOCIAL_CONNECTIONS.linkedin} aria-label="Linkedin Link">
			<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
				<path
					d="m21.06 48.73h18.11v58.27h-18.11zm9.06-29a10.5 10.5 0 1 1 -10.5 10.49 10.5 10.5 0 0 1 10.5-10.49"
				/>
				<path
					d="m50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41 18.34-.04 21.74 12.03 21.74 27.68v32h-18.11v-28.35c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15v28.79h-18.08z"
				/>
			</svg>
		</a>
	{/if}
	{#if SOCIAL_CONNECTIONS.github}
		<a href={'https://github.com/' + SOCIAL_CONNECTIONS.github} aria-label="Github Link">
			<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
				<path
					d="m335 499c14 0 12 17 12 17h-182s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"
					fill="#fff"
				/>
			</svg>
		</a>
	{/if}
	{#if SOCIAL_CONNECTIONS.mail}
		<a href={'mailto:' + SOCIAL_CONNECTIONS.mail} aria-label="E-mail">
			<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
				<path
					d="m250 186c-46 0-69 35-69 74 0 44 29 72 68 72 43 0 73-32 73-75 0-44-34-71-72-71zm-1-37c30 0 57 13 77 33 0-22 35-22 35 1v150c-1 10 10 16 16 9 25-25 54-128-14-187-64-56-149-47-195-15-48 33-79 107-49 175 33 76 126 99 182 76 28-12 41 26 12 39-45 19-168 17-225-82-38-68-36-185 67-248 78-46 182-33 244 32 66 69 62 197-2 246-28 23-71 1-71-32v-11c-20 20-47 32-77 32-57 0-108-51-108-108 0-58 51-110 108-110"
					fill="#fff"
				/>
			</svg>
		</a>
	{/if}
</section>

<style lang="scss">
	section {
		margin: 10px 0;

		a {
			text-decoration: none;
			svg {
				width: 25px;
				margin-right: 5px;
				padding: 5px;
				border: 2px solid var(--social-bg);
				border-radius: 25%;
				background-color: var(--social-bg);
				transition: all 0.2s ease-in-out;
				&:hover {
					border-color: var(--social-bg-hover);
					background-color: var(--social-bg-hover);
				}

				path {
					fill: var(--color);
				}
			}
		}
	}
</style>
