self.addEventListener('install', async event => {
    console.log('install event')
  });
  
  self.addEventListener('fetch', async event => {
    console.log('fetch event')
  });

const cacheName = 'pwa-conf-v1';
const staticAssets = [
  './',
  './index.html',
  './assets/js/main.js',
  './assets/js/swiper-bundle.min.js',
  './assets/css/styles.css',
  './assets/img/about.jpg',
  './assets/img/prefil.png',
  './assets/img/portfolio1.jpg',
  './assets/img/portfolio2.jpg',
  './assets/img/portfolio3.jpg',
  './assets/img/blob.svg',
  './assets/css/swiper-bundle.min.css'
];

//Caching and serving static assets
self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
  });

//Serving cached content
self.addEventListener('fetch', event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));
  });

async function cacheFirst(req) {
    const cache = await caches.open(cacheName); 
    const cachedResponse = await cache.match(req); 
    return cachedResponse || fetch(req); 
  }

//Dynamic caching
self.addEventListener('fetch', event => {
    const req = event.request;
  
    if (/.*(json)$/.test(req.url)) {
      event.respondWith(networkFirst(req));
    } else {
      event.respondWith(cacheFirst(req));
    }
  });