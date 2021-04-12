const diagnosticCache = "diagnostics-app-cache";
const assets = [
  "/",
  "assets/images",
  "css/style.css",
  "js/app.js",
  "tabs/",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(diagnosticCache).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
});
