
const CACHE = 'kt-v1';
const ASSETS = [
  '/', '/index.html',
  '/css/style.css',
  '/js/firebase.js','/js/motion.js','/js/ui.js','/js/data.js','/js/cloudinary.js','/js/app.js',
  '/auth/login.html',
  '/pages/pengaturan.html','/pages/kegiatan.html','/pages/kas.html','/pages/anggota.html',
  '/assets/icons/kt.svg'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(r=>{
      const copy = r.clone();
      caches.open(CACHE).then(c=>c.put(e.request, copy));
      return r;
    }))
  );
});
