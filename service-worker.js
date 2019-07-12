try {
	importScripts("./lib/workbox/4.3.1/workbox-sw.js");
	console.log(`try to load workbox library from self server`);
} catch (error) {
	importScripts(
		"https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
	);
	console.log(`try to load workbox library from google-cdn`);
}

function init(wb) {
	/*
	 * html资源
	 * 策略：NetworkFirst
	 */
	wb.routing.registerRoute(
		/\.html$/,
		new wb.strategies.NetworkFirst({
			cacheName: "html-cache"
		})
	);
	/*
	 * js和css资源
	 * 策略：CacheFirst + hash
	 */
	wb.routing.registerRoute(
		/\.(?:js|css)$/,
		new wb.strategies.CacheFirst({
			cacheName: "static-cache",
			plugins: [
				new wb.expiration.Plugin({
					maxEntries: 999, // 缓存数量
					maxAgeSeconds: 7 * 24 * 60 * 60 // 缓存时间
				})
			]
		})
	);
	/*
	 * 图片资源
	 * 策略：CacheFirst + chunkhash
	 */
	wb.routing.registerRoute(
		/\.(?:png|jpg|jpeg|svg|gif)$/,
		new wb.strategies.CacheFirst({
			cacheName: "image-cache",
			plugins: [
				new wb.expiration.Plugin({
					maxEntries: 999, // 缓存数量
					maxAgeSeconds: 30 * 24 * 60 * 60 // 缓存时间
				})
			]
		})
	);
	/* 缓存接口
	 * 策略：StaleWhileRevalidate
	 * 说明：自动更新缓存
	 */
	wb.routing.registerRoute(
		/\/api\//,
		new wb.strategies.StaleWhileRevalidate({
			cacheName: "data-cache",
			plugins: [
				new wb.cacheableResponse.Plugin({
					statuses: [200]
				})
			]
		})
	);
	// print
	console.log("workbox is loaded");
}

workbox && init(workbox);
