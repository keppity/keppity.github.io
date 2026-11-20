// Notebook service worker: lets it open from the home screen and load on a
// shaky connection. Network first, so updates on GitHub show up right away.
const CACHE = "notebook-30370fd5";
const SHELL = ["./", "index.html", "app.js", "style.css", "config.js", "manifest.webmanifest", "icons/icon-192.png", "fonts/onest-latin-wght-normal.woff2", "fonts/onest-cyrillic-wght-normal.woff2"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("notebook-") && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // only this site's own folder (not Media log next door)
  if (!url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res && res.ok) { const c = await caches.open(CACHE); c.put(req, res.clone()); }
      return res;
    } catch (err) {
      const hit = await caches.match(req, { ignoreSearch: true }) || (req.mode === "navigate" ? await caches.match("index.html") : null);
      if (hit) return hit;
      throw err;
    }
  })());
});
