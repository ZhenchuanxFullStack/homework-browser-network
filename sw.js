importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');

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
    new RegExp('.*\.(jpg|png|gif)'),
    workbox.strategies.cacheFirst({
        cacheName: 'img-cache'
    })
    );
} else {
    console.log('workbox does not exist');
}