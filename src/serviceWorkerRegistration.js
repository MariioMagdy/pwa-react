// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// Check if the app is running on localhost (for dev environment)
const isLocalhost = Boolean(
  window.location.hostname === "localhost" || // standard localhost
    window.location.hostname === "[::1]" || // IPv6 localhost
    window.location.hostname.match(
      // 127.x.x.x localhost range
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

/**
 * Registers the service worker if in production and supported by browser
 */
export function register(config) {
  // Only register SW if in production and service workers are supported
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // Resolve the full public URL of the service worker file
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    // Abort if service worker file is from a different origin (e.g., CDN)
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    // Register service worker once the page fully loads
    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // On localhost: check if an existing service worker is still active
        checkValidServiceWorker(swUrl, config);

        // Log helpful dev message about service workers
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service " +
              "worker. To learn more, visit https://cra.link/PWA"
          );
        });
      } else {
        // On production/non-localhost: simply register the service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

/**
 * Registers a valid service worker and handles updates
 */
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // Listen for new updates to the service worker
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) return;

        // Track changes in service worker's state
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // New content is available, but will be activated after tabs close
              console.log(
                "New content is available and will be used when all " +
                  "tabs for this page are closed. See https://cra.link/PWA."
              );

              // Optional callback if provided
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // No previous SW: this is the first precache
              console.log("Content is cached for offline use.");

              // Optional callback if provided
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

/**
 * Verifies the service worker is still valid; if not, unregisters it and reloads.
 */
function checkValidServiceWorker(swUrl, config) {
  // Try to fetch the service worker file directly
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");

      // If service worker file not found or not a JS file, unregister and reload
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload(); // reload page to recover
          });
        });
      } else {
        // Valid service worker found, proceed to register
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      // Network failure (offline), fallback to cached assets
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}
