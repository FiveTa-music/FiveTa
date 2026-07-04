var CACHE_STATIC_NAME = 'static-v13';
var CACHE_DYNAMIC_NAME = 'dynamic-v5';

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/connectionLostPage/',
          '/connectionLostPage/css/style.css',
          '/assets/jplayer.flat.css',
          '/assets/app.v1.css',
          '/static_assets/app_002.js',
          '/static_assets/jquery.js',
          '/static_assets/jplayer.js',
          '/static_assets/demo.js',
          '/static_assets/jquery.pjax.min.js',
          '/fonts/Simple-Line-Icons.woff',
          '/fonts/sourcesanspro/sourcesanspro.woff',
          '/fonts/sourcesanspro/sourcesanspro-bold.woff',
          '/fonts/fontawesome-webfont.woff?v=4.0.3',
        ]);
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 })
//             })
//             .catch(function(err) {
//               return caches.open(CACHE_STATIC_NAME)
//                 .then(function(cache) {
//                   return cache.match('/offline.html');
//                 });
//             });
//         }
//       })
//   );
// });
function isFile(pathname) {
    return pathname.split('/').pop().indexOf('.') > -1;
}

self.addEventListener('fetch', function(event) {
    if (isFile(event.request.url)) {
        event.respondWith(
          caches.match(event.request)
            .then(function (response) {
              if (response) {
                return response;
              } else {
                return fetch(event.request)
                  .then(function (res) {
                    return caches.open(CACHE_STATIC_NAME)
                      .then(function (cache) {
                        //   console.log(res);
                        //   console.log(res.headers.get("content-length"))
                        //   console.log("size:" + res.length );
                        if (res.ok && res.headers.get("content-length") > 1000) {
                          cache.put(event.request.url, res.clone());
                        }
                        return res;
                      })
                  })
                  .catch(function (err) {
                    return caches.open(CACHE_STATIC_NAME)
                      .then(function (cache) {
                          return cache.match('/connectionLostPage/');
                      });
                  });
              }
            })
        );
    }
    else{
    event.respondWith(
        fetch(event.request)
          .then(function(res) {
            return caches.open(CACHE_DYNAMIC_NAME)
                    .then(function(cache) {
                      if(res.ok){
                        cache.put(event.request.url, res.clone());
                      }
                      return res;
                    })
          })
          .catch(function(err) {
                return caches.open(CACHE_STATIC_NAME)
                  .then(function (cache) {
                    return caches.match(event.request)
                        .then(function (response) {
                          if (response) {
                            return response;
                          } else {
                            return cache.match('/connectionLostPage/');
                          }
                        })
                  });
            
          })
        );
        
    }
});




// Cache-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//   );
// });

// Network-only
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     fetch(event.request)
//   );
// });