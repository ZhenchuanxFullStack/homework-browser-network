importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js')

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
  // html 的缓存策略：离线推荐 networkFirst，不离线推荐 networkOnly
  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    workbox.strategies.networkFirst({
      cacheName: 'html-cache'
    })
  )

  // js\css 的缓存策略：文件都在同一域名下，且文件带了 hash 版本号推荐 cacheFirst，否则推荐 staleWhileRevalidate
  workbox.routing.registerRoute(
    new RegExp('.*\.(?:js|css)'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'js-css-cache'
    })
  )

  // img 的缓存策略：文件都在同一域名下，且文件带了 hash 版本号推荐 cacheFirst，否则推荐 staleWhileRevalidate
  workbox.routing.registerRoute(
    new RegExp('.*\.(jpg|png|gif)'),
    workbox.strategies.cacheFirst({
      cacheName: 'jpg-png-gif-cache'
    })
  )
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}
