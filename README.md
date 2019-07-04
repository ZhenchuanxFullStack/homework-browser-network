# homework-browser-network

## html
> HTML，如果你想让页面离线可以访问，使用 NetworkFirst，如果不需要离线访问，使用 NetworkOnly，其他策略均不建议对 HTML 使用。

- NetworkFirst
- NetworkOnly

```js
  workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    new workbox.strategies.NetworkFirst()
  );
```

## CSS JS
- CacheFirst

> 如果你的 CSS，JS 与站点在同一个域下，并且文件名中带了 Hash 版本号，那可以直接使用 Cache First 策略。
```js
  workbox.routing.registerRoute(
    new RegExp('.*\.(?:js|css)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'my-static-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
          maxAgeSeconds: 60, // 这只最长缓存时间为 60s
        })
      ]
    })
  );
  ```

## img
- Cache First

> 图片建议使用 Cache First，并设置一定的失效时间，请求一次就不会再变动了。
```js
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/g,
  new workbox.strategies.CacheFirst({
    cacheName: 'my-image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
        maxAgeSeconds: 60, // 这只最长缓存时间为 60s
      })
    ]
  })
);
```

## 缓存第三方请求的结果
- plugins

```js
  workbox.routing.registerRoute(
    'https://www.baidu.com/img/bd_logo1.png',
    new workbox.strategies.CacheFirst({
      plugins: [
        // 这个插件是让匹配的请求的符合开发者指定的条件的返回结果可以被缓存
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );
```

## 一般建议不要对接口的数据进行缓存