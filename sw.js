try {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

  if (workbox) {
  console.log(`Yay! workbox is loaded 🎉`);
  workbox.precaching.precacheAndRoute([
    // 注册成功后要立即缓存的资源列表
    './css/index.css'
  ])
  // 如果你的 CSS，JS 与站点在同一个域下，并且文件名中带了 Hash 版本号，那可以直接使用 Cache First 策略。
  workbox.routing.registerRoute(
    new RegExp('.*\.(?:js|css)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'my-static-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
          maxAgeSeconds: 60, // 这只最长缓存时间为 60s
        })
      ]
    })
  );
  // HTML，如果你想让页面离线可以访问，使用 NetworkFirst，如果不需要离线访问，使用 NetworkOnly，其他策略均不建议对 HTML 使用。
  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'html-cache',
    })
  );

  
  // 图片建议使用 Cache First，并设置一定的失效时间，请求一次就不会再变动了。
  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/g,
    new workbox.strategies.CacheFirst({
      cacheName: 'my-image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
          maxAgeSeconds: 60, // 这只最长缓存时间为 60s
        })
      ]
    })
  );
  // 可以尝试自定义策略拦截非法请求
  workbox.routing.registerRoute(
    ({url, event}) => {
      if (url.href == 'https://www.baidu.com/img/bd_logo1.png') return true
    },
    ({url, event, params}) => {
      console.log(234424234)
      event.respondWith(new Response('123'))
    }
  );
  
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
} catch (error) {
  // 静默失败
  console.log(error)
}
