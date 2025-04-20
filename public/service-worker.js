// service-worker.js
const CACHE_NAME = "react-pwa-cache-v1";

// Assets to cache (include your routes, JS, CSS, and other assets)
const CACHED_ASSETS = [
  "/",
  "/index.html",
  "/about",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/static/js/bundle.js",
  "/static/css/main.chunk.css",
  "/manifest.json",
  "/favicon.ico", // Added favicon explicitly
  "/logo192.png",
  "/logo512.png",
];

var self = this; // For use in event listeners
// Install event - cache assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching assets");
      return cache.addAll(CACHED_ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Clearing old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  // Only process HTTP/HTTPS requests
  if (!event.request.url.startsWith("http")) {
    return;
  }

  const url = new URL(event.request.url);

  // Skip for contact page
  if (url.pathname.includes("/contact")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200) {
            return response;
          }

          // Don't cache non-GET requests or chrome-extension URLs
          if (
            event.request.method !== "GET" ||
            !event.request.url.startsWith("http")
          ) {
            return response;
          }

          // Clone the response as it can only be consumed once
          const responseToCache = response.clone();

          // Add to cache for future requests
          caches.open(CACHE_NAME).then((cache) => {
            try {
              cache.put(event.request, responseToCache);
            } catch (error) {
              console.error("Cache put error:", error);
            }
          });

          return response;
        })
        .catch(() => {
          // If both cache and network fail, show a fallback page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html").then((response) => {
              if (response) return response;
              return caches.match("/index.html");
            });
          }

          // For image requests, return a placeholder
          if (event.request.destination === "image") {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#999">Image</text></svg>',
              { headers: { "Content-Type": "image/svg+xml" } }
            );
          }
        });
    })
  );
});
