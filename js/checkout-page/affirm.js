/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/js/checkout-page/affirm.js ***!
  \**********************************************/
var affirmCheckoutJSON = window.Laravel.affirmClientCheckout;
var _affirm_config = {
  public_api_key: affirmCheckoutJSON.merchant.public_api_key,
  script: affirmCheckoutJSON.merchant.jsUrl
};

(function (m, g, n, d, a, e, h, c) {
  var b = m[n] || {},
      k = document.createElement(e),
      p = document.getElementsByTagName(e)[0],
      l = function l(a, b, c) {
    return function () {
      a[b]._.push([c, arguments]);
    };
  };

  b[d] = l(b, d, "set");
  var f = b[d];
  b[a] = {};
  b[a]._ = [];
  f._ = [];
  b._ = [];
  b[a][h] = l(b, a, h);

  b[c] = function () {
    b._.push([h, arguments]);
  };

  a = 0;

  for (c = "set add save post open empty reset on off trigger ready setProduct".split(" "); a < c.length; a++) {
    f[c[a]] = l(b, d, c[a]);
  }

  a = 0;

  for (c = ["get", "token", "url", "items"]; a < c.length; a++) {
    f[c[a]] = function () {};
  }

  k.async = !0;
  k.src = g[e];
  p.parentNode.insertBefore(k, p);
  delete g[e];
  f(g);
  m[n] = b;
})(window, _affirm_config, "affirm", "checkout", "ui", "script", "ready", "jsReady");
/******/ })()
;