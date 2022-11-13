<script>
	/** @type {import('$lib/types').DateListItem[]} */
	export let dateList;
</script>

<section>
	<slot name="title" />

	{#each dateList as { label, title, location, desc }}
		<div id="item">
			<div id="label">{label}</div>
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
		div[id='item'] {
			margin-top: 20px;
			align-items: baseline;
			box-sizing: border-box;
			display: grid;
			grid-template-columns: clamp(6em, 30vw, 1.5rem) 1fr;
			margin-bottom: calc(0.5 * 1.5em);
			max-width: 50vw;

			div[id='label'] {
				font-size: 1.1em;
				box-sizing: border-box;
				color: var(--light-color);
			}

			p {
				font-size: 1em;
				font-weight: 400;
				margin: 0.5em 0;
				max-width: 38rem;
			}

			h3 {
				color: var(--color);
				font-size: 1.3em;
				font-weight: 500;
				max-width: 38rem;
			}

			small {
				color: var(--light-color);
				font-size: 0.8em;
				line-height: 1.5;
			}
		}
	}

	@media screen and (max-width: 900px) {
		section {
			div[id='item'] {
				grid-template-columns: clamp(6em, 30vw, 1.5rem) 1fr;
				margin-bottom: calc(0.5 * 1.5em);
				max-width: 90vw;
			}
		}
	}
</style>
