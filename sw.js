importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');
if (workbox) {
  console.log('workbox loaded')
  workbox.core.setCacheNameDetails({
    prefix: 'my-app',
    suffix: 'v1',
    precache: 'myPrecache',// �����õĻ�Ĭ��ֵΪ 'precache'
    runtime: 'myRuntime' // �����õĻ�Ĭ��ֵΪ 'runtime'
  });
  workbox.precaching.precacheAndRoute([
    '/homework-browser-network/index.css',
    '/homework-browser-network/main.js'
  ]);
  // networkFirst / cacheFirst / cacheOnly / staleWhileRevalidate
  workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst({
      cacheName: 'cacheJS',
      plugins: [
        new workbox.expiration.Plugin({
            maxEntries: 1, // ���Ļ������������������ʹ�û���
            maxAgeSeconds: 60, // ��ֻ�����ʱ��Ϊ��λ��(������Ҫ�ر�������Ż���Ч)
        }),
      ],
    })
  );
}