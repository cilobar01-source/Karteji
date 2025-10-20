
const CACHE_NAME = "karangtaruna-v7";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/css/style.css",
  "/js/app.js",
  "/js/firebase.js",
  "/js/data.js",
  "/js/ui.js",
  "/js/motion.js",
  "/js/cloudinary.js",
  "/auth/login.html",
  // pages
  "/pages/kas.html",
  "/pages/kegiatan.html",
  "/pages/forum.html",
  "/pages/academy.html",
  "/pages/sertifikat.html",
  "/pages/anggota.html",
  "/pages/pengaturan.html",
  "/pages/umkm.html",
  "/pages/laporan.html",
  // icons
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
  "/assets/icons/kt.svg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
});
