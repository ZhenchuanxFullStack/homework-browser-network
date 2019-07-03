// 首先引入 Workbox 框架
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  workbox.precaching.precacheAndRoute([
    // 注册成功后要立即缓存的资源列表
  ]);

// html的缓存策略
  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    new RegExp('.*\.(?:js|css)'),
    new workbox.strategies.CacheFirst()
  );

  workbox.routing.registerRoute(
    new RegExp('.*\.(?:jpg|png|jpge|gif)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'workbox:imgs'
    })
  );
} else {
  console.log('错误：workbox 没有正常加载！');
}
