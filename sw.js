importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.setConfig({
  debug: false
});

var cacheList = [
  '/',
  '/about',
  '/prod'
];

const matchHtmlFunc = ({
  url,
  event
}) => {
  if (event.url.host === 'www.alexshan.com') {
    if (~cacheList.indexOf(event.url.pathname)) return true;
    else return false;
  } else {
    return false;
  }
};

workbox.routing.registerRoute(
  // html
  matchHtmlFunc,
  workbox.strategies.networkFirst({
    cacheName: 'ash:html',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('https://g\.alexshan\.com/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'ash:static',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20
      })
    ]
  })
);

workbox.routing.registerRoute(
  // img
  new RegExp('https://img\.alexshan\.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'ash:img',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 12 * 60 * 60
      })
    ]
  })
);