importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js"
);
if (workbox) {
  console.log("workbox imported");

  workbox.routing.registerRoute(
    new RegExp('.*\.(?:js|css)'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "js-cache"
    })
  );

  workbox.routing.registerRoute(
    /\.img$/,
    workbox.strategies.networkFirst({
      cacheName: "img-cache"
    })
  );

  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    workbox.strategies.networkFirst()
  );


} else {
  console.log("workbox import failed");
}
