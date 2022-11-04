var CACHE = "my-site-cache-v1";

var urlsToCache = [
    '/',
    './style.css',
    './main.js'
]

self.addEventListener('install', evt => {
    console.log('Service Worker has been installed!');
    evt.waitUntil(
        caches.open(CACHE).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', evt => {
    console.log('Service Worker has been activated!');

    var cacheWhiteList = [CACHE];

    evt.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', evt => {
    console.log('Ressource récupérée '+ evt.request.url);
});