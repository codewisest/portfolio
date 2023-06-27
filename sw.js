const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/assets/styles/main.css",
  "/assets/styles/responsive.css",
  "/assets/js/main.js",
  "/assets/images/wm-logo.PNG",
  "/assets/images/chijioke.jpg",
  "/assets/images/matching_card_game.PNG",
  "/assets/images/quote_generator.jpg",
];
// install service worker
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
  // console.log("service worker has been activated");
});

// fetch event
self.addEventListener("fetch", (evt) => {
  // console.log("fetch event", evt);
  evt.respondWith(
    caches.match(evt.request).then((cacheResponse) => {
      return cacheResponse || fetch(evt.request);
    })
  );
});
