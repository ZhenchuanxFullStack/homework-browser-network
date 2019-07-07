// 首先引入 Workbox 框架
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');
if(workbox) {
    // 静态资源缓存
    workbox.precaching([
        '/js/test.js',
        '/imgs/1.jpeg'
    ])

    // html的缓存策略
    workbox.routing.registerRoute(
        new RegExp('.*\.html'),
        workbox.strategies.networkFirst()
    )

    workbox.routing.registerRoute(
        new RegExp('.*\.(?:js|css)'),
        workbox.strategies.cacheFirst()
    );
    
    workbox.routing.registerRoute(
        new RegExp('https://your\.cdn\.com/'),
        workbox.strategies.staleWhileRevalidate()
    );
    
    workbox.routing.registerRoute(
        new RegExp('https://your\.img\.cdn\.com/'),
        workbox.strategies.cacheFirst({
            cacheName: 'example:img'
        })
    );
} else {
    console.log(`workbox is didn't load`);
}
