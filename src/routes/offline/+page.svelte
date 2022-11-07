<script>
    import { onMount } from "svelte";

    onMount(() => {
        (function () {
            // @see { @link https://chrisruppel.com/blog/service-worker-offline-content-list/ }
            "use strict";

            document.getElementById('offline-title').innerText = navigator && navigator.onLine ? 'Kaydettiğin İçerikler' : 'Görünüşe bakılırsa internetin yok';

            if ('serviceWorker' in navigator) {
                // Get all Cache entries for this user.
                caches.keys().then(function(cacheNames) {
                    // Define these just once instead of in the loop.
                    const offlineContentEntry = document.getElementById('offline-content');
                    let offlineContentFound = false;

                    return Promise.all(
                        // Loop through Cache entries.
                        cacheNames.map(function(cacheName) { // TODO: FIX ERROR
                            offlineContentFound = true; // I'm with the force and force is with me

                            // Check if any have the offline article naming convention.
                            if (cacheName.indexOf('rocks-offline-') !== -1) {
                                // Extract the URL from cache name
                                let cachedURL = cacheName.split('rocks-offline-')[1];

                                // The cache name indicates that it was saved by the user.
                                let cacheEntry = document.createElement('li');
                                cacheEntry.innerHTML = '<a href="' + cachedURL + '">' + cacheName.split('/')[1].split('-').join(' ') + '</a>';

                                // Append to DOM.
                                if (!!offlineContentEntry) {
                                    console.info('Service Worker: found user-cached content ' + cacheName);
                                    offlineContentEntry.appendChild(cacheEntry);
                                }
                            }
                        })
                    ).then(function displayOfflineContent() {
                        if (offlineContentFound) {
                            document.getElementById('ops').style.display = 'none';
                        }
                    });
                });
            }
        })();
    })
</script>

<div id="offline">
    <h2 id="offline-title"></h2>
    <p>İnternettin yokken okumak için kaydettiğin makaleleri aşağıda bulabilirsin.</p>
    <ul id="offline-content">
        <li id="ops">Ops, sanırım hiç bir makale kaydetmemişsin..</li>
    </ul>
</div>

<style lang="scss">
    div{
      display: block;
      h2{
        font-size:1.4em;
      }
      p{
        color: var(--light-color);
      }
      ul[id=offline-content]{
        li[id=ops]{
          color: #9c58e1;
        }
      }
    }
</style>