// install service worker
self.addEventListener("install", (evt) => {
  console.log("Service worker has been installed");
});

// listen for activate event
self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
});

// fetch event
self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt);
});
