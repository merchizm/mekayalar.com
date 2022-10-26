const OFFLINE_PREFIX = 'rocks-offline-';
const SW = {
    cache_version: '0.5',
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
        'og_thumb.png'
    ]
};

// Installation
self.addEventListener('install', function installer(event) {
    // Don't wait to take control.
    self.skipWaiting();

    // Set up our cache.
    event.waitUntil(
        caches
            .open(SW.cache_version)
            .then(function prefill(cache) {
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

// Intercept requests
self.addEventListener('fetch', function(event) {
    // Ignore non-get request like when accessing the admin panel
    if (event.request.method !== 'GET') {
        return;
    }
    // Don't try to handle non-secure assets because fetch will fail
    if (/http:/.test(event.request.url)) {
        return;
    }

    // Get current path
    let requestUrl = new URL(event.request.url);

    // Save all resources on origin path only
    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(
                // Open the cache created when install
                caches.open(SW.cache_version).then(function (cache) {
                    // Go to the network to ask for that resource
                    return fetch(event.request).then(function (networkResponse) {
                        // Add a copy of the response to the cache
                        cache.put(event.request, networkResponse.clone());
                        // Respond with it
                        return networkResponse;
                    }).catch(function () {
                        // If no internet connection, try to match request
                        // to some of our cached resources
                        return cache.match(event.request);
                    })
                })
            );
        }
    }
});