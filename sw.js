importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if(workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    // html 请求优先
    workbox.routing.registerRoute(
        new RegExp('.*\.html'),
        workbox.strategies.networkFirst()
    );

    // js css 没有版本号 staleWhileRevalidate
    workbox.routing.registerRoute(
        new RegExp('.*\.(?:js|css)'),
        workbox.strategies.staleWhileRevalidate()
    );

    // 图片缓存优先
    workbox.routing.registerRoute(
        new RegExp('.*\.(png|gif|ico)'),
        workbox.strategies.cacheFirst()
    )

    // 强制jpg图片始终走请求 测试
    workbox.routing.registerRoute(
        new RegExp('.*\.jpg'),
        workbox.strategies.networkOnly()
    )
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
