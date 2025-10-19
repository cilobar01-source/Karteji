
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('karteji-v1').then(c=>c.addAll([
    '/index.html','/dashboard.html','/css/style.css','/assets/logo.svg','/manifest.webmanifest'
  ])));
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request))
  );
});
