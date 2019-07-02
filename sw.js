importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js')
importScripts('./swPlugin.js')
if (workbox) {
  console.log('workbox loaded')
  // 配置缓存前缀
  workbox.core.setCacheNameDetails({
    prefix: 'my-app',
    suffix: 'v1',
    precache: 'myPrecache',
    runtime: 'myRuntime'
  });
  // 预加载
  workbox.precaching.precacheAndRoute([
    '/homework-browser-network/index.css',
    '/homework-browser-network/main.js'
  ]);
  // networkFirst / cacheFirst / cacheOnly / networkOnly / staleWhileRevalidate
  // 一般JS带hash使用:cacheFirst;否则用:staleWhileRevalidate(但发版时后用户打开网页可能还需要再刷新一次才能获取到最新版本)
  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst({
      cacheName: 'cacheJS',
      plugins: [
        new workbox.expiration.Plugin({
            maxEntries: 1, // 最大缓存数
            maxAgeSeconds: 60, // 过期时间(秒),测试发现只有关闭浏览器再打开会生效,浏览器开着时并不会清除过期文件
        }),
      ],
    })
  );
  // 需要离线:networkFirst 不需要离线:networkOnly
  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    workbox.strategies.networkOnly({
      cacheName: 'cacheHtml'
    })
  );
  // 自定义策略:哇哈哈,红背景被我拦截成了蓝背景了;然而我并没有想到实际开发环境有什么卵用...
  workbox.routing.registerRoute(
    ({url, event}) => {
      if (/(index\.css)$/.test(url.pathname)) {
        return true // 这里可以输入一个值对应下面函数的params
      } else {
        return false
      }
    },
    ({url, event, params}) => {
      return new Response(
        'body{background: blue}', 
        {status: 301, statusText: 'move https://aaa.com/index.css', headers: {"Content-Type": "text/css"}});
    }
  );
}