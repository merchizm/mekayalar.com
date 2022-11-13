<script>
	import NoteSvg from './svg/NoteSvg.svelte';
	import TimeSvg from './svg/TimeSvg.svelte';
	import CommentSvg from './svg/CommentSvg.svelte';
	import tr from 'date-fns/locale/tr/index';
	import { format, formatDistance } from 'date-fns';

	export let gistDesc, gistCreatedAt, gistCommentsCount, gistLink;
</script>

<li>
	<div class="title">
		<a href={gistLink}>
			<NoteSvg />
			{gistDesc}
		</a>
	</div>
	<div class="footer">
		<span><CommentSvg /> {gistCommentsCount}</span>
		<span
			><TimeSvg />
			{formatDistance(new Date(gistCreatedAt), new Date(), { addSuffix: true, locale: tr })} · {format(
				new Date(gistCreatedAt),
				'd MMMM yyyy',
				{ locale: tr }
			)}</span
		>
	</div>
</li>

<style lang="scss">
	li {
		padding: 17px;
		background-color: var(--repository-card-bg);
		border-radius: 15px;
		&:hover {
			background-color: var(--repository-card-bg-hover);
		}
		.title {
			a {
				display: flex;
				align-items: center;
				box-sizing: border-box;
				font-size: 1.3em;
				font-weight: bold;
				text-decoration: none;
				color: var(--color);
			}
		}
		.footer {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			font-size: 1.1em;
			column-gap: 1em;
			span {
				display: flex;
				align-items: center;
				box-sizing: border-box;
			}
		}
	}

	@media screen and (max-width: 900px) {
		li {
			max-width: 90vw;
		}
	}
</style>
