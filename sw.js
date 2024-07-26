// sw.js (Service Worker)

const CACHE_NAME = "pwa_demo_cache";
const urlsToCache = ["/", "/index.html", "/style.css", "/app.js"];

async function preCache() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(urlsToCache);
}

self.addEventListener("install", (event) => {
  event.waitUntil(preCache());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
