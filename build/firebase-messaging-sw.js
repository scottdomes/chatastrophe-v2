// Name our cache
var CACHE_NAME = 'my-pwa-cache-v2';

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  console.log('activate')
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});


// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function(event) {
  console.log('install')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        cache.addAll(['/', 'manifest.json'])
      })
  );
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request).then(function(response) {
          console.log(event.request, 'cache attempt')
          return response || fetch(event.request);
      })
  );
});