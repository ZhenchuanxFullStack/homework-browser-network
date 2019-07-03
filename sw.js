/**
 * Created by jinmengxian on 2019/7/3
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    workbox.strategies.networkFirst()
  );
  workbox.routing.registerRoute(
    new RegExp('.*\.(?:js|css)'),
    workbox.strategies.cacheFirst()
  );
  workbox.routing.registerRoute(
    new RegExp('https://your\.cdn\.com/'),
    workbox.strategies.staleWhileRevalidate()
  );
  workbox.routing.registerRoute(
    new RegExp('.*\.(?:jpg|png|jpge|gif)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'imgs'
    })
  );

} else {
  console.log('error, cannot loading workbox!');
}
