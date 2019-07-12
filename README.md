# workbox

## 使用

workbox 常用的几个接口很简单，策略也封装的很好。
和写配置一样书写 sw 策略。

## 遗留问题

`workbox.precaching` 放什么资源？

第一次加载页面时，cache storage 为空，必须得刷一次才有数据。这正常吗，该如何改进？
