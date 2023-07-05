const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/fallback.html",
  "/assets/styles/main.css",
  "/assets/styles/responsive.css",
  "/assets/js/main.js",
  "/assets/images/wm-logo.PNG",
  "/assets/images/chijioke.jpg",
  "/assets/images/matching_card_game.PNG",
  "/assets/images/quote_generator.jpg",
];
// install service worker //
self.addEventListener("install", (evt) => {
  // console.log("Service worker has been installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching all assets");
      cache.addAll(assets);
    })
  );
});

// listen for activate event
self.addEventListener("activate", (evt) => {
  // delete old cache version
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  // console.log("fetch event", evt);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheResponse) => {
        return (
          cacheResponse ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/fallback.html");
        }
      })
  );
});
