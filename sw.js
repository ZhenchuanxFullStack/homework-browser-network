// 首先引入 Workbox 框架
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
  // html的缓存策略
  workbox.routing.registerRoute(
    new RegExp('.*.html'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'html-cache'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('.*.(?:js|css)'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'js-css-cache'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('.*.(?:png|jpg|gif|ico)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'img-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 3,
          maxAgeSeconds: 60
        })
      ]
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
