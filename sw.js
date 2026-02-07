const CACHE_NAME = "mon-chat-v2";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json"
];

// Installation
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation : supprime les anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch : réseau d'abord, cache en secours
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});