# homework-browser-network
### 使用serviceWorker缓存3张图片中其中一张
![缓存结果](./huancunpng.png)
### 请求演示
![网络请求](./huancunquest.png)
### 总结
+ servicework必须启动在web上，本地访问会报错。
+ StaleWhileRevalidate是同时向cache和网络发出请求，如果cache可用，那么返回cache，如果cache失效，那么等待网络结果。如果都失效，那么返回错误。
  无论cache是否可用，都会用最新的网络请求结果更新cache，所以这个策略非常适合cdn的资源。