const CACHE_NAME = 'flexi-v1';
const ASSETS = ['/', '/index.html', '/manifest.json', '/sw.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(name => name !== CACHE_NAME && caches.delete(name)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(r => {
      if (!r || r.status !== 200) return r;
      const cache = caches.open(CACHE_NAME);
      cache.then(c => c.put(e.request, r.clone()));
      return r;
    }).catch(() => new Response('Offline')))
  );
});
