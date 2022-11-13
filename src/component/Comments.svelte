<script>
	import { GISCUS } from '$lib/siteConfig';
	import Giscus from '@giscus/svelte';
</script>

<Giscus
	repo={GISCUS.repo}
	repoId={GISCUS.repoId}
	category={GISCUS.category}
	categoryId={GISCUS.categoryId}
	mapping="pathname"
	reactionsEnabled="1"
	emitMetadata="0"
	inputPosition="top"
	theme="transparent_dark"
	lang={GISCUS.language}
/>
