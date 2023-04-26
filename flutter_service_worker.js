'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "8f95347fdae1c1682ed097cf2fddc471",
"index.html": "b32b3bbdce6270ce18432aed0523dbfc",
"/": "b32b3bbdce6270ce18432aed0523dbfc",
"main.dart.js": "a56faaf0becc371e71fac0338427bfdf",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "4a6450039ab39a04263eb643b50a2185",
"assets/AssetManifest.json": "8ca76212b5693f1f984eb2121b8c2e42",
"assets/NOTICES": "3e0a4469550ec67f1d22f13fddf6071c",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "9cda082bd7cc5642096b56fa8db15b45",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "0a94bab8e306520dc6ae14c2573972ad",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "b00363533ebe0bfdb95f3694d7647f6d",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/demo-landscape.pdf": "8860c0a0ea8e3bd1db2756c3492dcdf6",
"assets/assets/corrupted.pdf": "8860c0a0ea8e3bd1db2756c3492dcdf6",
"assets/assets/book3.jpg": "ffeca639b12c1527df53bd7c3f5ea0af",
"assets/assets/logo_high.jpg": "aad09e74fe88a2412239777947e4c7c9",
"assets/assets/book2.jpg": "0f6acd4cd05ac439cdb94ac303e8a001",
"assets/assets/k1.jpg": "557d7256719a47b1acf99e143fe64928",
"assets/assets/k3.jpg": "eff086b94fe94fdb93cc2825f0f7dc49",
"assets/assets/book1.jpg": "033a539c4121c3c1613d28be56946ed1",
"assets/assets/k2.jpg": "56a714c2a8657794627277b11e80fced",
"assets/assets/book5.jpg": "d1f36f6e86dc81304347fe6f9688c45e",
"assets/assets/test2.pdf": "bb136f528ee51d7726eaac9875c314a5",
"assets/assets/book4.jpg": "7c0a31675a537beb1f4872d65ca5abb3",
"assets/assets/book6.jpg": "bf8051d40f8465d0f66d7600e51d8806",
"assets/assets/book7.jpg": "744cd573d6d81171a941fb5fab23ee79",
"assets/assets/e2.jpg": "27ac83bce919b902ba7cde876f7354fd",
"assets/assets/book14.jpg": "24b6d7ef5147e2a1e553a422c3b25a63",
"assets/assets/e3.jpg": "602eff7959a707a81c1f5ce030555d11",
"assets/assets/e1.jpg": "0f5ceae80fcb14cf81d71d35242a7758",
"assets/assets/test.pdf": "55b84fd6c05641659b7ba068179c4891",
"assets/assets/book9.jpg": "a2b5fd1d8c8c780795e5f8fa205bfe38",
"assets/assets/book8.jpg": "5fe965455ce2ba795f1bb5b50c77b6be",
"assets/assets/book13.jpg": "1ea158f1f5189e50bd7eab539afee400",
"assets/assets/book12.jpg": "932fd1620f43eceb23fde351f695d442",
"assets/assets/book10.jpg": "82d5cf065cb4840146f114fc2725c0be",
"assets/assets/book11.jpg": "20a545f8e510c5c463fb206f08237da4",
"assets/assets/demo-link.pdf": "8860c0a0ea8e3bd1db2756c3492dcdf6",
"assets/assets/sc1.jpg": "223f80346c9654fd280012d7049dbfa7",
"assets/assets/sc3.jpg": "8e81599837dafdfd1d807362ec67b2ba",
"assets/assets/solution.pdf": "d0216c9585abb2f696870fbcf740702d",
"assets/assets/sc2.jpg": "7eec7d75f5ddbc9e06c7841486fba6e3",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
