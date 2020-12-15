let contentToCache = [
  "/schedule/index.html",
  "/schedule/index.js",
  "/schedule/index.css",
  "/schedule/",
  "/schedule/manifest.webmanifest",
  "/schedule/fonts/sourcesans-bold.woff2",
  "/schedule/fonts/sourcesans-italic.woff2",
  "/schedule/fonts/sourcesans-regular.woff2",
  "/schedule/fonts/sourcesans-semibold.woff2",
]

let cacheName = "schedule-cache-v1"
let contentCache;

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    self.skipWaiting();

    e.waitUntil(
      caches.open(cacheName).then((cache) => {
        console.log('[Service Worker] Caching Schedule Files');
        return cache.addAll(contentToCache);
      })
    );
});

self.addEventListener('activate', (e) => {
    self.registration.unregister()
    console.log('[Service Worker] Activating!');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
        contentCache = cache;
      })
    );
});

self.addEventListener('fetch', async (event)=>{
  if (event.request.url.endsWith("woff2")) {
    event.respondWith(
      contentCache.match(event.request)
    )
  }
  else {
    event.respondWith(
      fetch(event.request)
      .catch(()=>{
        return contentCache.match(event.request)
      })
    )
  }
});
