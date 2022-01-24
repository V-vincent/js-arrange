
// 注册service Worker
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('sw.js')
    .then(function (registration) {
      console.log('service worker 注册成功')
    })
    .catch(function (err) {
      console.log('service worker 注册失败')
    })
}

// sw.js
// 缓存文件
let urlsToCache = ['./index.html', './06-this.js'];
// 监听 `install` 事件，回调中缓存所需文件
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll(urlsToCache)
    })
  )
})

// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      if (response) {
        return response
      }
      console.log('fetch source')
    })
  )
})