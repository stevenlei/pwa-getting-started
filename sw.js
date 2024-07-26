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
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
