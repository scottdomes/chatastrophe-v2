 importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

 firebase.initializeApp({
   'messagingSenderId': '85734589405'
 });

self.addEventListener('install', function() {
  console.log('Install!');
});

self.addEventListener("activate", event => {
  console.log('Activate!')
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch!', event.request);
});