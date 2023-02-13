<script>
	import { onMount } from 'svelte';

	let offline_title, offline_content, dank_farrik;

	onMount(() => {
		(function () {
			// @see { @link https://chrisruppel.com/blog/service-worker-offline-content-list/ }
			'use strict';

			offline_title.innerText =
				navigator && navigator.onLine
					? 'Kaydettiğin İçerikler'
					: 'Görünüşe bakılırsa internetin yok';

			if ('serviceWorker' in navigator) {
				// Get all Cache entries for this user.
				caches.keys().then(async function (cacheNames) {
					// Define these just once instead of in the loop.
					let offlineContentFound = false;

					return Promise.all(
						// Loop through Cache entries.
						cacheNames.map(function (cacheName) {
							// TODO: FIX ERROR
							offlineContentFound = true; // I'm with the force and force is with me

							// Check if any have the offline article naming convention.
							if (cacheName.indexOf('rocks-offline-') !== -1) {
								// Extract the URL from cache name
								let cachedURL = cacheName.split('rocks-offline-')[1];

								// The cache name indicates that it was saved by the user.
								let cacheEntry = document.createElement('li');
								cacheEntry.innerHTML =
									'<a href="' +
									cachedURL +
									'">' +
									cacheName.split('/')[1].split('-').join(' ') +
									'</a>';

								// Append to DOM.
								if (offline_content) {
									console.info('Service Worker: found user-cached content ' + cacheName);
									offline_content.appendChild(cacheEntry);
								}
							}
						})
					).then(function displayOfflineContent() {
						if (offlineContentFound) {
							dank_farrik.style.display = 'none';
						}
					});
				});
			}
		})();
	});
</script>

<div id="offline">
	<h2 bind:this={offline_title} id="offline-title" />
	<p>İnternettin yokken okumak için kaydettiğin makaleleri aşağıda bulabilirsin.</p>
	<ul bind:this={offline_content} id="offline-content">
		<li bind:this={dank_farrik} id="ops">Ops, sanırım hiç bir makale kaydetmemişsin..</li>
	</ul>
</div>

<style lang="scss">
	div {
		display: block;
		h2 {
			font-size: 1.4em;
		}
		p {
			color: var(--light-color);
		}
		ul[id='offline-content'] {
			margin-top: 1em;
			padding-left: 1.6em;
			li[id='ops'] {
				content: '';
				color: #9c58e1;
			}
			li:before {
				content: '—';
				display: inline-block;
				width: 1em;
				margin-left: -1em;
			}
			li {
				a {
					color: var(--light-color);
					text-decoration: none;
					&:hover {
						filter: brightness(80%);
					}
				}
			}
		}
	}
</style>
