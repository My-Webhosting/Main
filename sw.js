/* MyWeb Hosting - Full Service Worker 
  Handles: Offline Caching, Push Notifications, and App Interaction
*/

const CACHE_NAME = 'myweb-v1';
const ASSETS_TO_CACHE = [
  './',
  './login.html',
  './dashboard.html',
  './img/APP.png',
  './manifest.json'
];

// 1. INSTALL: Cache essential files for the PWA to work offline
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching App Shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATE: Cleanup old caches if you update the version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. FETCH: Serve files from cache if offline (Fixes the "no-op" error)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// 4. PUSH: Listen for the message from Appwrite/Firebase
self.addEventListener('push', (event) => {
  let data = { title: 'MyWeb', body: 'You have a new update!' };

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    data = { title: 'MyWeb', body: event.data.text() };
  }

  const options = {
    body: data.body,
    icon: 'img/APP.png',
    badge: 'img/APP.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || './dashboard.html'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 5. NOTIFICATION CLICK: Open the dashboard when user clicks the popup
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If the app is already open, just switch to it
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      // Otherwise, open a new window to the dashboard
      return clients.openWindow(event.notification.data.url);
    })
  );
});
