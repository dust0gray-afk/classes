var C='planner-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  function store(res){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)});return res}
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(store).catch(function(){return caches.match('index.html')}));return}
  e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(store)}));
});
