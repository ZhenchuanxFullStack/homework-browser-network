try {
  importScripts('[https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js](https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js)');
} catch (e) {
  console.error(e)
}
if (!workbox) {
  // 若找不到workbox则退出
  return false;
}

workbox.precaching([
  // 注册成功后要立即缓存的资源列表
]);

// html优先请求获取，确保用户看到的是最新的页面
workbox.routing.registerRoute(
  new RegExp('.*\.html'),
  workbox.strategies.networkFirst()
);

// js、css文件基本不变，如果更新了修改html中的引用路径（例如添加版本号）去更新
workbox.routing.registerRoute(
  new RegExp('.*\.(?:js|css)'),
  workbox.strategies.cacheFirst()
);

// cdn上的静态资源文件优先从缓存获取，之后再消耗带宽去拿请求结果
// 例如静态图片不一定需要第一时间更新，但用户下次访问也可以发生变化
workbox.routing.registerRoute(
  new RegExp('*\.cdn\.com/'),
  workbox.strategies.staleWhileRevalidate()
);
