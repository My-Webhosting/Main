
self.addEventListener('install', (event) => {
    // Forces the waiting service worker to become the active service worker
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Immediately take control of the page
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Necessary for PWA installation
});
