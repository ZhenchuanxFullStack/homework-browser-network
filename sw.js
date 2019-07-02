// 先引入Workbox 框架
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');

if(workbox) {
	// 缓存策略
	workbox.routing.registerRoute(
		new RegExp('.*\.js'),
		new workbox.strategies.CacheFirst({
		  cacheName: 'js-cache',
		})
	);
	
	workbox.routing.registerRoute(
		new RegExp('.*\.css'),
		new workbox.strategies.CacheFirst({
		  cacheName: 'css-cache',
		})
	);
	
	workbox.routing.registerRoute(
		new RegExp('.*\.(?:png|jpg|gif|ico)'),
		new workbox.strategies.CacheFirst({
		  cacheName: 'img-cache',
		})
	);
} else {
	console.log("workbox is not loaded")
}