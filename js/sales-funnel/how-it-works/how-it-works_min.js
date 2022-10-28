/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************************************!*\
  !*** ./resources/js/sales-funnel/how-it-works/how-it-works_min.js ***!
  \********************************************************************/
$('.faq .panel-collapse').on('shown.bs.collapse', function (e) {
  var $panel = $(this).closest('.panel');
  $('html,body').animate({
    scrollTop: $panel.offset().top
  }, 200);
});
/******/ })()
;