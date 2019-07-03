// 首先引入 Workbox 框架
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');

/* workbox.precaching([
  // 注册成功后要立即缓存的资源列表
  '/'
]); */

// html 缓存策略
workbox.routing.registerRoute(
  new RegExp('.*\.html'),
  workbox.strategies.networkFirst()
);

// css 和 js 缓存策略
workbox.routing.registerRoute(
  new RegExp('.*\.(?:js|css)'),
  workbox.strategies.cacheFirst()
);

// 图片缓存策略
workbox.routing.registerRoute(
  new RegExp('.*\.(?:jpg|png|jpge|gif)'),
  workbox.strategies.cacheFirst()
);