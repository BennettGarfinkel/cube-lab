// Cube Lab service worker: keeps the app on the device so it opens with no internet.
// The saved page opens right away. The newest page downloads in the background, and the
// worker tells the page which build it got, so the page can offer a one-tap update.
const CACHE = 'cube-lab-v1';
const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const FONTS_CSS = 'https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;600&display=swap';
const LOCAL = ['/', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png',
  '/icons/maskable-192.png', '/icons/maskable-512.png', '/icons/apple-touch-icon.png'];
// Hosts whose files are worth keeping offline: the 3D library and the fonts
const KEEP_HOSTS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(LOCAL.map(u => new Request(u, { cache: 'reload' })));
    // Cross-origin extras are best effort, so a slow CDN can't block the install
    await Promise.all([THREE_URL, FONTS_CSS].map(u =>
      fetch(u, { mode: 'cors' }).then(r => r.ok && c.put(u, r)).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

// Download the newest page into the cache and read its build stamp (data-build on <html>)
async function refreshPage() {
  try {
    const r = await fetch(new Request('/', { cache: 'no-cache' }));
    if (!r.ok) return null;
    const head = (await r.clone().text()).slice(0, 4000);
    await (await caches.open(CACHE)).put('/', r.clone());
    const m = head.match(/data-build="([^"]*)"/);
    return { res: r, build: m ? m[1] : null };
  } catch (err) { return null; }
}

// Tell every open copy of the app which build is now saved
async function announce(got) {
  if (!got || !got.build) return;
  for (const c of await self.clients.matchAll({ type: 'window' })) c.postMessage({ type: 'build', build: got.build });
}

// The page asks for a check when it opens, comes back to the front, or taps Check for updates
self.addEventListener('message', e => {
  if (!e.data || e.data.type !== 'check') return;
  const port = e.ports && e.ports[0];
  e.waitUntil(refreshPage().then(got => { if (port) port.postMessage({ build: got ? got.build : null }); }));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The page itself: open the saved copy right away, refresh it in the background
  if (req.mode === 'navigate' && url.origin === location.origin) {
    e.respondWith((async () => {
      const cached = await caches.match('/');
      const fresh = refreshPage();
      if (cached) { e.waitUntil(fresh.then(announce)); return cached; }
      const got = await fresh;
      return (got && got.res) || new Response('Cube Lab is offline and has not been saved on this device yet. Open it once with internet first.',
        { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    })());
    return;
  }

  // Icons, manifest, 3D library, fonts: saved copy first, network to fill in anything missing
  if (url.origin === location.origin || KEEP_HOSTS.includes(url.hostname)) {
    e.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const r = await fetch(req);
        if (r.ok || r.type === 'opaque') (await caches.open(CACHE)).put(req, r.clone());
        return r;
      } catch (err) { return Response.error(); }
    })());
  }
});
