importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/1af475e9eebe68c310cf.js",
    "revision": "b517f932d56b60fa25cb0cef19339566"
  },
  {
    "url": "/_nuxt/3a2d2d0ce0851ba05e45.js",
    "revision": "d6b002bab5ac1baf5079dc02856a9e55"
  },
  {
    "url": "/_nuxt/65b63489c57a597a357e.js",
    "revision": "c1b988c7de270fa026291fd6c0e87ea0"
  },
  {
    "url": "/_nuxt/7d0746b5936842f204cb.js",
    "revision": "791d7b5de185184891f9e6599341e6a2"
  },
  {
    "url": "/_nuxt/7fb7b1bf38bf05161b4b.js",
    "revision": "9c395ab670c7edd0b050c9fa89ff1933"
  },
  {
    "url": "/_nuxt/96f60e98cab10ad081bc.js",
    "revision": "ae342eef93a734bc3f0c510f0f694eca"
  },
  {
    "url": "/_nuxt/987a4d4cce787eff0e92.js",
    "revision": "0ce9c09ef3af818f2c344904781cb0ce"
  },
  {
    "url": "/_nuxt/b227a6a9c9a250148c8b.js",
    "revision": "c29e4e0e7034cfdf43a7d477daac556f"
  },
  {
    "url": "/_nuxt/d969c98f25d3b1668652.js",
    "revision": "a79fd96984f95b3f0c656be6df2d5974"
  },
  {
    "url": "/_nuxt/e68868ce191ca8da2510.js",
    "revision": "1ff68bb0b1fc069e029d94637538320e"
  },
  {
    "url": "/_nuxt/f3b2b3a6e4de8b726450.js",
    "revision": "6c2dce7d15f3f3bbc2f6726f109c9d01"
  },
  {
    "url": "/_nuxt/f7612ce0c81c5bc72cba.js",
    "revision": "3d4bd64d20fa06779b43affb34da4c20"
  }
], {
  "cacheId": "passport",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
