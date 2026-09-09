/* Hyrox Prep service worker.

   The previous version answered every request from the cache first and only
   refreshed in the background, so an installed home-screen copy kept serving
   the build it was installed with. Navigations are now network-first: the app
   shell is re-fetched whenever there is a connection, and the cache is the
   offline fallback rather than the default answer. */
const BUILD = '2026-09-09.2105';
const CACHE = 'hyrox-prep-' + BUILD;
const SHELL = ['./', './index.html', './apple-touch-icon.png', './manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL).catch(() => null))   // a missing asset must not block install
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const isPage = e.request.mode === 'navigate' ||
                 (e.request.headers.get('accept') || '').includes('text/html');

  if (isPage) {
    // network first, so a published update lands on the next launch
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => caches.match(e.request).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // everything else: serve fast from cache, refresh behind the scenes
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const fresh = fetch(e.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => hit);
      return hit || fresh;
    })
  );
});

/* let the page ask for an immediate update */
self.addEventListener('message', (e) => { if (e.data === 'skipWaiting') self.skipWaiting(); });
