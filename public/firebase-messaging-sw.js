 importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

 firebase.initializeApp({
   'messagingSenderId': '85734589405'
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

self.addEventListener('install', function() {
  console.log('Install!');
});

self.addEventListener("activate", event => {
  console.log('Activate!')
});

self.addEventListener('fetch', function(event) {
});