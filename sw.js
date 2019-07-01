var cacheStorageKey = 'cachesName'
var cacheList = []

self.addEventListener('install', function (event) {
  console.log('install')
  event.waitUntil(
    caches.open(cacheStorageKey).then(function (cache) {
      return cache.addAll(cacheList)
    })
  )
})
