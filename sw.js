importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-alpha.3/workbox-sw.js');

if (workbox) {
    console.log(`Yay! workbox is loaded 🎉`);
    //html采用网络优先
    workbox.routing.registerRoute(
        new RegExp('.*\.html'),
        workbox.strategies.networkFirst()
    )
    //js、css采用缓存优先
    workbox.routing.registerRoute(
        new RegExp('.*\.(?:js||css)'),
        workbox.strategies.cacheFirst()
    )
    //cdn采取先load再validate
    workbox.routing.registerRoute(
        new RegExp('https://your\.cdn\.com/'),
        workbox.strategies.staleWhileRevalidate()
    )

    // 图片采用缓存优先
    workbox.routing.registerRoute(
        new RegExp('https://*.img'),
        workbox.strategies.cacheFirst()
    )

}
else {
    console.log(`Boo! workbox didn't load 😬`);
}