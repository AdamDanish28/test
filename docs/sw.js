// Revise service worker: offline cache + background reminder checks
const CACHE = 'revise-shell-v4';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE && k !== 'revise-data').map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
// Network first (so updates arrive), fall back to cache when offline
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});

const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

async function backgroundCheck() {
  const cache = await caches.open('revise-data');
  const res = await cache.match('/__revise_due.json');
  if (!res) return;
  const data = await res.json();
  if (!data.notify) return;
  const now = new Date(); const today = ymd(now);
  const [hh, mm] = (data.time || '08:00').split(':').map(Number);
  if (now.getHours() * 60 + now.getMinutes() < hh * 60 + mm) return;
  if (data.last === today) return;
  const due = data.pend.filter(p => p.due <= today);
  if (!due.length) return;
  data.last = today;
  await cache.put('/__revise_due.json', new Response(JSON.stringify(data)));
  const names = due.slice(0, 3).map(d => d.title).join(', ');
  await self.registration.showNotification(`📖 ${due.length} review${due.length > 1 ? 's' : ''} due`, {
    body: names + (due.length > 3 ? ` and ${due.length - 3} more` : ''),
    icon: 'icon-192.png', badge: 'icon-192.png', tag: 'revise-due'
  });
}
self.addEventListener('periodicsync', e => { if (e.tag === 'revise-daily') e.waitUntil(backgroundCheck()); });

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) return c.focus();
    return self.clients.openWindow('./');
  }));
});
