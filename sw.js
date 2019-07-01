importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! workbox is loaded 🎉`);

  workbox.routing.registerRoute(
    /.*\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'css-cache',
    })
  );

  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.CacheFirst({
      cacheName: 'js-cache',
    })
  );
  
  workbox.routing.registerRoute(
    //只缓存三找那个图片中2.png
    new RegExp('2.png'),
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // 只缓存1张图片
          maxEntries: 1,
          // 缓存时间100秒.
          maxAgeSeconds: 100,
        })
      ],
    })
  );
  
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
