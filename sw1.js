// 首先引入 Workbox 框架
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
workbox.precaching.precacheAndRoute([
  // 注册成功后要立即缓存的资源列表
]);


// html的缓存策略
workbox.routing.registerRoute(
  new RegExp('.*\.html'),
  new workbox.strategies.NetworkFirst() // 断网试试
);
// js css 的缓存策略
workbox.routing.registerRoute(
  new RegExp('.*\.(?:js|css)'),
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('.*\.(?:jpg|png|jpge|gif)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'my:img'
  })
);

// 缓存第三方资源
workbox.routing.registerRoute(
    'https://code.jquery.com/jquery-3.4.1.min.js',
    new workbox.strategies.CacheFirst({
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
          maxAgeSeconds: 30 * 24 * 60 * 60, // 这只最长缓存时间为 30 天
          // maxAgeSeconds: 5,
        }),
      ],
    })
)
