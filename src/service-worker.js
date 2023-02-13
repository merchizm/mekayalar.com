const OFFLINE_PREFIX = 'rocks-offline-';
const SW = {
	cache_version: '1.0.9',
	offline_assets: [
		'/',
		'/offline/',
		'/avatars/8311ae278de83456901520ab454dea72.png',
		'/avatars/17cd863577187cc7ff2484cb51b74f74.png',
		'/avatars/93fa8f774672d7bd79052c27b6edd619.png',
		'/avatars/1138d33b964f817a2b2aef248fd75635.png',
		'/avatars/ac3f33dd0ea6d114f9eae3065b164360.png',
		'/avatars/b2b2443a57669beb59298cc87bcfc418.png',
		'/avatars/b8ae389ec519423fc3782e5e9ddb81f5.png',
		'/avatars/d0469d2ee1b260d134eaf8dc2ef0cbbe.png',
		'/avatars/dfcef4a9f9a954ce98ad33909f35aa8a.png',
		'/avatars/e2d438d2ec8ef9e19dc417e4b558bdda.png',
		'/avatars/e9f2754ca22e94ab8bc7c13c9b1bff34.png',
		'/avatars/ea352eec188313b0e1f3c845b59de229.png',
		'og_thumb.png',
		'favicon.ico',
		'/fonts/catamaran-v17-latin-ext-regular.woff',
		'/fonts/catamaran-v17-latin-ext-regular.woff2',
		'/api/github/gists.json',
		'/api/github/repositories.json',
		'/api/listContent.json',
		'/api/raindrop/getBookmarksGroupByWeek.json'
	]
};

// Installation
self.addEventListener('install', function installer(event) {
	// Don't wait to take control.
	self.skipWaiting();

	// Set up our cache.
	event.waitUntil(
		caches.open(SW.cache_version).then(function prefill(cache) {
			// Attempt to cache assets
			let cacheResult = cache.addAll(SW.offline_assets);

			// Success
			cacheResult.then(function () {
				console.info('Service Worker: Installation successful!');
			});

			// Failure
			cacheResult.catch(function () {
				console.error('Service Worker: Installation failed.');
			});

			return cacheResult;
		})
	);
});

// Activation. First-load and also when a new version of SW is detected.
self.addEventListener('activate', function (event) {
	// Delete all caches that aren't named in SW.cache_version.
	// @see https://github.com/GoogleChrome/samples/blob/e4df12c8642381243b6c1710c41394d85b33d82f/service-worker/prefetch/service-worker.js#L96-L117
	let expectedCacheNames = [SW.cache_version];

	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					// Two conditions must be met in order to delete the cache:
					//
					// 1. It must NOT be found in the main SW cache list.
					// 2. It must NOT be prefixed with our offline article prefix.
					if (
						expectedCacheNames.indexOf(cacheName) === -1 &&
						cacheName.indexOf(OFFLINE_PREFIX) === -1
					) {
						// If this cache name isn't present in the array of "expected"
						// cache names, then delete it.
						console.info('Service Worker: deleting old cache ' + cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

//
// @see { @link https://chrisruppel.com/blog/service-worker-offline-content/}
// Intercept requests
//
self.addEventListener('fetch', function (event) {
	// Build a hostname-free version of request path.
	const reqLocation = getLocation(event.request.url);
	const reqPath = reqLocation.pathname;

	// Consolidate some conditions for re-use.
	const requestIsHTML =
		event.request.headers.get('accept').includes('text/html') && event.request.method === 'GET';
	const requestIsAsset = /^(\/css\/|\/js\/|\/static\/|\/svg\/)/.test(reqPath);
	const requestIsImage = /^(\/img\/)/.test(reqPath);

	// Saved articles, MVW pages, Offline
	//
	// First, we check to see if the user has explicitly cached this HTML content
	// or if the page is in the "minimum viable website" list defined in the main
	// SW.cache_version. If no cached page is found, we fallback to the network,
	// and finally if both of those fail, serve the "Offline" page.
	if (requestIsHTML) {
		event.respondWith(
			caches
				.match(event.request)
				.then(function () {
					// Show old content while revalidating URL in background if necessary.
					return staleWhileRevalidate(event.request);
				})
				.catch(function () {
					// When the cache is empty and the network also fails, we fall back to a
					// generic "Offline" page.
					return caches.match('/offline/');
				})
		);
	}

	// CSS/JS
	//
	// SW will respond with cache if there's a hit, but look for a new version
	// in the background so that the next page load will be fresh. We only want
	// to manage first-party assets for now.
	//
	// @see http://12devsofxmas.co.uk/2016/01/day-9-service-worker-santas-little-performance-helper/
	else if (requestIsAsset) {
		event.respondWith(staleWhileRevalidate(event.request));
	}

	// Images
	//
	// Use a simple Cache-then-Network strategy.
	else if (requestIsImage) {
		event.respondWith(
			caches.match(event.request).then(function (response) {
				// Look in the Cache and fall back to Network.
				// console.info('Fetch listener served image ' + reqPath);
				return response || fetch(event.request);
			})
		);
	}

	// Uncaught — mostly for debugging
	//
	// This request fell through all our conditions and is being ignored by SW.
	// else {
	//   console.info('Fetch listener ignored ' + reqPath);
	// }
});

// Stale While Revalidate
//
// Helper function to manage cache updates in the background.
function staleWhileRevalidate(request) {
	// Build a hostname-free version of request path.
	const reqLocation = getLocation(request.url);
	const reqPath = reqLocation.pathname;

	// Open the default cache and look for this request. We have to restrict this
	// lookup to one cache because we want to make sure we don't add new entries
	// unless really necessary (third-party assets, unsaved content, etc).
	const defaultCachePromise = caches.open(SW.cache_version);
	const defaultMatchPromise = defaultCachePromise.then(function (cache) {
		return cache.match(request);
	});

	// Find any user-saved articles, so we can update outdated content.
	const userCachePromise = caches
		.has(OFFLINE_PREFIX + reqPath)
		.then(function maybeOpenCache(cacheExists) {
			// This conditional exists because, per spec, caches.has() resolves whether
			// the cache is found or not. The Promise value returns true or false based
			// on whether the cache was found. Rejections only occur when something
			// exceptional has occurred, not just because a cache is missing.
			//
			// @see { @link https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/has }
			//
			// In cases where the cache was NOT found, I had extreme difficulty getting
			// pages to load, since manually rejecting caused the Promise.all() below
			// to fail, resulting in the Offline page even when something more useful
			// should have displayed.
			//
			// My band-aid is to load the main cache when no user cache was found,
			// sending along a similar object that won't ever be touched again since
			// the userMatchPromise will never match content URLs in the main cache.
			if (cacheExists) {
				return caches.open(OFFLINE_PREFIX + reqPath);
			} else {
				return caches.open(SW.cache_version);
			}
		})
		.catch(function () {
			console.error('Error while trying to load user cache for ' + reqPath);
		});

	const userMatchPromise = userCachePromise.then(function matchUserCache(cache) {
		return cache.match(request);
	});

	return Promise.all([
		defaultCachePromise,
		defaultMatchPromise,
		userCachePromise,
		userMatchPromise
	]).then(function (promiseResults) {
		// When ES2015 isn't behind a flag anymore, move these vars to an array
		// in the function signature to destructure the results of the Promise.
		const defaultCache = promiseResults[0];
		const defaultResponse = promiseResults[1];
		const userCache = promiseResults[2];
		const userResponse = promiseResults[3];

		// Determine whether any cache holds data for this request.
		const requestIsInDefaultCache = typeof defaultResponse !== 'undefined';
		const requestIsInUserCache = typeof userResponse !== 'undefined';

		// Kick off the update request in the background.
		const fetchResponse = fetch(request).then(function (response) {
			// Determine whether this is first or third-party request.
			const requestIsFirstParty = response.type === 'basic';

			// IF the DEFAULT cache already has an entry for this asset,
			// AND the resource is in our control,
			// AND there was a valid response,
			// THEN update the cache with the new response.
			if (requestIsInDefaultCache && requestIsFirstParty && response.status === 200) {
				// Cache the updated file and then return the response
				defaultCache.put(request, response.clone());
				console.info('Fetch listener updated ' + reqPath);
			}

			// IF the USER cache already has an entry for this asset,
			// AND the resource is in our control,
			// AND there was a valid response,
			// THEN update the cache with the new response.
			else if (requestIsInUserCache && requestIsFirstParty && response.status === 200) {
				// Cache the updated file and then return the response
				userCache.put(request, response.clone());
				console.info('Fetch listener updated ' + reqPath);
			}

			// None of the conditions were met. Just skip the caching phase.
			else {
				console.info('Fetch listener skipped ' + reqPath);
			}

			// Return response regardless of caching outcome.
			return response;
		});

		// Return any cached responses if we have one, otherwise wait for the
		// network response to come back.
		return defaultResponse || userResponse || fetchResponse;
	});
}

// Polyfill for window.location
//
// @see { @link http://stackoverflow.com/a/21553982/175551}
function getLocation(href) {
	const match = href.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);

	return (
		match && {
			protocol: match[1],
			host: match[2],
			hostname: match[3],
			port: match[4],
			pathname: match[5],
			search: match[6],
			hash: match[7]
		}
	);
}
