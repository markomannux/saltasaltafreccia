const CACHE_NAME = 'ssf-cache-v8';

self.addEventListener('install', function(event) {
  console.log('A *new* Service Worker installing.');
  // Perform install steps
  event.waitUntil(
      caches.open(CACHE_NAME)
          .then(function(cache) {
            return cache.addAll([...serviceWorkerOption.assets, '/saltasaltafreccia/']);
          })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
  event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.filter(function(cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
              return cacheName != CACHE_NAME;
            }).map(function(cacheName) {
              console.log(`Deleting ${cacheName}`);
              return caches.delete(cacheName);
            })
        );
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
          )
  );
});
