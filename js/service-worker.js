// === SERVICE WORKER KARTEJI v4.0 ===
const CACHE_NAME = "karteji-v4-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/auth.html",
  "/dashboard.html",
  "/manifest.json",
  "/assets/logo.svg",
  "/assets/icons/icon-72.png",
  "/assets/icons/icon-96.png",
  "/assets/icons/icon-144.png",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching all app shell files...");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => {
            console.log("Old cache removed:", k);
            return caches.delete(k);
          })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Return from cache
      }
      return fetch(event.request)
        .then(res => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});
