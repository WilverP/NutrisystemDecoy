/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************************************!*\
  !*** ./resources/js/my-account/signup/signup_min.js ***!
  \******************************************************/
$(document).ready(function () {
  $("div.optional em:last-child").hide();
  $("#Phone").focus(function () {
    $("div.optional em:first-child").hide();
    $("div.optional em:last-child").css("display", "inline-block");
    $(".optin-boxes").slideDown("slow");
    /*var phoneType = $('input[name=phonetype]:checked').val();
    if ( phoneType === "Mobile" ){
        $("#textOptin2").slideDown("slow");
    }*/
  }); //When call is checked show note and when unchecked hide note

  $("#isAutodialOptin, #AutoDialIn").on("keyup change", function () {
    if ($(this).is(":checked")) {
      $("#phoneOptin2 em").show();
    } else {
      $("#phoneOptin2 em").hide();
    }
  }); //When text is checked show note and when unchecked hide note

  $("#isAutotextOptin").on("keyup change", function () {
    if ($(this).is(":checked")) {
      $("#textOptin2 em").show();
    } else {
      $("#textOptin2 em").hide();
    }
  });
  $("input[name=phonetype]").on("keyup change", function () {
    var phoneType = $('input[name=phonetype]:checked').val();

    if ($('.optin-boxes').css('display') == 'block' && $('#textOptin2').css('display') == 'block') {
      if (phoneType === "home" || phoneType === "other") {
        $("#textOptin2").hide(); // if user changes it to home or other uncheck text checkbox

        $("#isAutotextOptin").prop("checked", false);
        $("#textOptin2 em").hide();
      } else {
        $("#textOptin2").slideDown();
      }
    } else if ($('.optin-boxes').css('display') == 'block' && $('#textOptin2').css('display') == 'none') {
      if (phoneType === "home" || phoneType === "other") {
        $("#textOptin2").hide(); // if user changes it to home or other uncheck text checkbox

        $("#isAutotextOptin").prop("checked", false);
        $("#textOptin2 em").hide();
      } else {
        $("#textOptin2").slideDown();
      }
    }
  });

  if ($("#goal-weight").val()) {
    var a = $("#goal-weight").val();
    var b = parseFloat(a).toFixed(0);
    $("#goal-weight").val(b).attr({
      maxlength: "3",
      pattern: "[0-9]*"
    });
  }

  if ($("#goal-weight").length !== 0) {
    $("#goal-weight").attr({
      maxlength: "3",
      pattern: "[0-9]*"
    });
  }

  if ($("#current-weight").val()) {
    var a = $("#current-weight").val();
    var b = parseFloat(a).toFixed(0);
    $("#current-weight").val(b).attr({
      maxlength: "3",
      pattern: "[0-9]*"
    });
  }

  if ($("#current-weight").length !== 0) {
    $("#current-weight").attr({
      maxlength: "3",
      pattern: "[0-9]*"
    });
  }

  $("#PostalCode").blur(function () {
    var c = $("#City").val().substr(0, 40);
    $("#City").val(c);
  });
});
/******/ })()
;