window.onload = function () {
  // register service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Service worker registered", reg);
      })
      .catch((err) => {
        console.log("service worker not registered", err);
      });
  }
};
