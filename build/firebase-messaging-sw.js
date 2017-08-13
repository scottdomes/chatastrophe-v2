importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '85734589405'
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // // Customize notification here
  // const notificationTitle = 'Background Message Title';
  // const notificationOptions = {
  //   body: 'Background Message body.',
  //   icon: '/icon.png'
  // };
  // return self.registration.showNotification(notificationTitle,
  //     notificationOptions);
});

const CACHE_NAME = 'v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      fetch('asset-manifest.json')
        .then(response => {
          if (response.ok) {
            response.json().then(manifest => {
              const urls = Object.keys(manifest).map(key => manifest[key]);
              urls.push('/');
              cache.addAll(urls);
            });
          }
        })
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
