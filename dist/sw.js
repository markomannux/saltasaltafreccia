var serviceWorkerOption = {
  "assets": [
    "/saltasaltafreccia/88a77472df7cefb943edf57936e85c01.png",
    "/saltasaltafreccia/fce4c7e80852ca0ead81b531e6fc3928.png",
    "/saltasaltafreccia/ad48e6cf3bea06bf9a730ef89cd126ef.png",
    "/saltasaltafreccia/main.js",
    "/saltasaltafreccia/index.html"
  ]
};
        
        !function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){self.addEventListener("install",function(e){console.log("A *new* Service Worker installing."),e.waitUntil(caches.open("ssf-cache-v9").then(function(e){return e.addAll([...serviceWorkerOption.assets,"/saltasaltafreccia/"])}))}),self.addEventListener("activate",function(e){console.log("Service Worker activating."),e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return"ssf-cache-v9"!=e}).map(function(e){return console.log(`Deleting ${e}`),caches.delete(e)}))}))}),self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(t){return t||fetch(e.request)}))})}]);