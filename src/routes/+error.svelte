<script>
	// import Nav from '../components/Nav.svelte';
	import { dev } from '$app/environment';
	import { SOCIAL_CONNECTIONS } from '$lib/siteConfig';
	import { page } from '$app/stores';

	const offline = typeof navigator !== 'undefined' && navigator.onLine === false;

	let message = offline ? 'İnternete bağlı değilsin!' : $page.error?.message;

	let title = offline ? 'Offline' : `Dank Farrik ${$page.status} !`;
	if ($page.status === 404) {
		title = 'Sayfa Bulunamadı';
		message =
			'Aradığınız sayfa bulunamadı, eğer bunun bir hata olduğunu düşünüyorsanız lütfen bana bildirin!';
	} else {
		message = 'Üzgünüm bilinmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div>
	<h1>{$page.status} — {title}</h1>

	{#if $page.status === 404}
		<p><code>{$page.url.pathname}</code> adında bir sayfa bulunamadı.</p>
		<p>
			Eğer bunun bir hata olduğunu düşünüyorsanız bana, <a href="mailto:{SOCIAL_CONNECTIONS.mail}"
				>{SOCIAL_CONNECTIONS.mail}</a
			> üzerinden ulaşın.
		</p>
	{:else}
		<p>{message}</p>
	{/if}
	{#if dev && $page.error.stack}
		<pre>{$page.error.stack}</pre>
	{/if}
</div>

<style>
	a {
		color: var(--color);
	}
</style>
