console.log('1. Service Worker Loading...')

const cacheStorageKey = 'intro-1'

const cacheList = ['/', 'index.html', 'style.css', 'logo.png']

// 安装
self.addEventListener('install', (e) => {
  console.log('2. Installing...')
  e.waitUntil(
    caches
      .open(cacheStorageKey)
      .then((cache) => {
        console.log('2-1. Adding File to Cache: ', cacheList)
        return cache.addAll(cacheList)
      })
      .then(function () {
        console.log('2-2. Skip Waiting')
        return self.skipWaiting()
      })
  )
})

// 更新
self.addEventListener('activate', (e) => {
  console.log('3, Activate Running...')
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames
          .map((name) => {
            if (name !== cacheStorageKey) {
              console.log(`3-1. Removeing: ${caches[name]}`)
              return caches.delete(name)
            }
          })
      ).then(() => {
        console.log('3-2. Update Reload')
      })
    })
  )
})

// 获取
self.addEventListener('fetch', (e) => {
  console.log('4. Fetch:', e.request.url)
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res != null) {
        console.log('4-1. Using cache for:', e.request.url)
        return res
      }
      console.log('4-2. Fallback to fetch:', e.request.url)
      return fetch(e.request.url)
    })
  )
})
