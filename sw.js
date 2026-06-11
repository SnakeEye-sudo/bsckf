/* BSCKF service worker — offline support + app feel */
const CACHE = 'bsckf-v1';
const CORE = [
  './', 'index.html', 'katha.html', 'kathayen.html', 'kaithi.html',
  'districts.html', 'district.html', 'explore.html', 'gallery.html',
  'samachar.html', 'parivar.html', 'daan.html', 'sampark.html', 'terms.html',
  'assets/css/style.css', 'assets/css/extra.css',
  'assets/js/main.js', 'assets/js/data.js', 'assets/js/districts.js', 'assets/js/bihar-map.js',
  'assets/img/logo.png', 'assets/img/splash.jpg', 'assets/img/icon-192.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
