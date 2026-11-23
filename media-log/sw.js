// Media log service worker: lets the app open from the home screen and load
// even with a shaky connection. Always tries the network first, so updates
// you upload to GitHub show up right away; the saved copy is only a fallback.
const CACHE = "media-log-mwtpw6pz";
const SHELL = ["./", "index.html", "app.js", "style.css", "config.js", "manifest.webmanifest", "icons/icon-192-rose.png", "fonts/onest-latin-wght-normal.woff2"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("media-log-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // database and search sites: never cached here
  e.respondWith((async () => {
    try {
      // always ask GitHub whether the file changed (settings in config.js, a new version of the app),
      // instead of reusing the browser's copy for up to 10 minutes
      const fresh = /\.(js|html|css|webmanifest)$|\/$/.test(url.pathname);
      const res = await fetch(!fresh ? req : req.mode === "navigate" ? new Request(req.url, { cache: "no-cache", credentials: "same-origin" }) : new Request(req, { cache: "no-cache" }));
      if (res && res.ok) { const c = await caches.open(CACHE); c.put(req, res.clone()); }
      return res;
    } catch (err) {
      const hit = await caches.match(req, { ignoreSearch: true }) || (req.mode === "navigate" ? await caches.match("index.html") : null);
      if (hit) return hit;
      throw err;
    }
  })());
});
