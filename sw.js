const CACHE_NAME = 'myweb-v1';

// Install the service worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// The "Fetch" handler - This fixes the "no-op" error
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // If offline, try to find it in the cache (if you add caching later)
            return caches.match(event.request);
        })
    );
});
