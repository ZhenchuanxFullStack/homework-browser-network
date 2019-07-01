# homework-browser-network
### 使用serviceWorker缓存3张图片中其中一张
![缓存结果](./huancunpng.png)
### 请求演示
![网络请求](./huancunquest.png)
### 总结
+ precaching最新的workbox库中已被移除无法使用
+ StaleWhileRevalidate代表资源的缓存过期之后，如果想再次使用它，需要先对该缓存进行 revalidate，这里使用它没有在缓存中看到效果。