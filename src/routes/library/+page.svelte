<script>
	import RepositoryCard from '../../component/RepositoryCard.svelte';
	import GistCard from '../../component/GistCard.svelte';
	import { GITHUB, SOCIAL_CONNECTIONS } from '$lib/siteConfig.js';

	/** @type {import('./$types').PageData} */
	export let data;

	$: gists = data.gists;
	$: repos = data.repos;
</script>

<svelte:head>
	<title>Library</title>
	<meta name="description" content="Github üzerinde paylaştığım repository'ler ve gist'ler" />
	<meta
		property="og:description"
		content="Github üzerinde paylaştığım repository'ler ve gist'ler"
	/>
	<meta
		property="twitter:description"
		content="Github üzerinde paylaştığım repository'ler ve gist'ler"
	/>
	<meta property="og:title" content="Library" />
	<meta name="twitter:title" content="Library" />
</svelte:head>

<p>
	Burada github üzerindeki paylaşımlarımı ve henüz yapım aşamasında olan projelerimi görebilirsiniz.
	Bu arada bu web site de Açık Kaynaklı 💜. Dilediğiniz gibi kullanabilir, istediğiniz gibi
	değiştirebilirsiniz.
</p>

<h1>Repositories <small>açık kaynak kodlu projeler</small></h1>
<ul class="github-container">
	{#each repos as repo, i}
		{#if i < GITHUB.maximum_repos}
			<RepositoryCard
				repoName={repo.name}
				repoDesc={repo.description}
				repoStars={repo.stargazers_count}
				repoForks={repo.forks_count}
				repoLink={repo.html_url}
				repoMainLanguage={repo.language}
			/>
		{/if}
	{/each}
	{#if repos.length > GITHUB.maximum_repos}
		<li>
			<a href={`https://github.com/` + SOCIAL_CONNECTIONS.github} class="show_more"
				>Daha fazlasını gör..</a
			>
		</li>
	{/if}
</ul>

<h1>Gists <small>küçük notlar</small></h1>
<ul class="github-container">
	{#each gists as gist, i}
		{#if i < GITHUB.maximum_gists}
			<GistCard
				gistDesc={gist.description}
				gistCreatedAt={gist.created_at}
				gistCommentsCount={gist.comments}
				gistLink={gist.html_url}
			/>
		{/if}
	{/each}
	{#if gists.length > GITHUB.maximum_gists}
		<li>
			<a href={`https://gist.github.com/` + SOCIAL_CONNECTIONS.github} class="show_more"
				>Daha fazlasını gör..</a
			>
		</li>
	{/if}
</ul>

<style lang="scss">
	p {
		color: var(--light-color);
		font-size: 1.3em;
	}
	h1 {
		font-size: 1.5em;
		margin-top: 2rem;
		margin-bottom: 1rem;
		small {
			font-size: 0.6em;
			color: var(--light-color);
		}
	}
	.github-container {
		display: grid;
		gap: 0.8em;

		li {
			.show_more {
				color: var(--light-color);
				text-decoration: none;
			}
		}
	}
</style>
