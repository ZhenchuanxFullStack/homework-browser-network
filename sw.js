importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');
if (workbox) {
  console.log('workbox loaded')
  workbox.core.setCacheNameDetails({
    prefix: 'my-app',
    suffix: 'v1',
    precache: 'myPrecache',// 不设置的话默认值为 'precache'
    runtime: 'myRuntime' // 不设置的话默认值为 'runtime'
  });
  workbox.precaching.precacheAndRoute([
    '/homework-browser-network/index.css',
    '/homework-browser-network/main.js'
  ]);
  // networkFirst / cacheFirst / cacheOnly / staleWhileRevalidate
  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst({
      cacheName: 'cacheJS',
      plugins: [
        new workbox.expiration.Plugin({
            maxEntries: 1, // 最大的缓存数，清除最老最少使用缓存
            maxAgeSeconds: 60, // 这只最长缓存时间为单位秒(测试是要关闭浏览器才会生效)
        }),
      ],
    })
  );
}