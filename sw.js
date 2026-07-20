const CACHE_NAME = 'reternia-cache-v1';

// Daftar aset inti yang akan langsung diunduh dan disimpan (Pre-cache)
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/tailwind.js',
    '/fonts.css',
    '/portfolio.json',
    '/reternia.svg',
    // Modul pihak ketiga yang besar
    '/vendor/three/three.module.js',
    '/vendor/animejs/modules/index.js',
    '/vendor/animejs/modules/adapters/three/index.js'
];

// 1. Event Install: Menyimpan semua aset inti ke dalam Cache
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Memaksa SW baru segera aktif
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Pre-caching assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
    );
});

// 2. Event Activate: Menghapus cache versi lama (jika ada pembaruan versi)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Menghapus cache lama:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. Event Fetch: Stale-While-Revalidate (Ambil dari cache jika ada, lalu diam-diam perbarui dari internet)
self.addEventListener('fetch', (event) => {
    // Kita abaikan request yang bukan GET (misal POST) atau ekstensi Chrome
    if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Jalankan pengambilan dari internet (Network) di belakang layar
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Simpan versi terbaru ke dalam cache untuk kunjungan berikutnya
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Jika jaringan mati (offline) dan tidak ada di cache, abaikan saja
                // atau Anda bisa mengembalikan fallback
            });

            // Langsung kembalikan respons dari Cache (sangat cepat),
            // atau jika belum ada di cache, tunggu respons dari jaringan.
            return cachedResponse || fetchPromise;
        })
    );
});
