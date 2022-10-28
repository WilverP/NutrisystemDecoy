/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************************************************!*\
  !*** ./resources/js/sales-funnel/bmi-validation/bmi-home-min.js ***!
  \******************************************************************/
/******/
(function () {
  // webpackBootstrap
  var __webpack_exports__ = {};
  /*!******************************************************************!*\
    !*** ./resources/js/sales-funnel/bmi-validation/bmi-home-min.js ***!
    \******************************************************************/

  $(document).ready(function () {
    $(window).width() < 975 ? ($("label[for=female]").addClass("checked"), $("label[for=female],label[for=male]").click(function () {
      $("label").removeClass("checked"), $(this).addClass("checked");
    })) : $("label").removeClass("checked");
    $("#diabetes").parent().hide();
    $(".pounds-label, #lbs-to-lose").parent().remove();
    $("#bmiFormSubmit").click(function () {
      var i = true;
      var h = false;
      var c = false;
      $("#weight-error").remove();

      if ($.isNumeric($("#weight").val())) {
        var g = $("input[name='gender']:checked").val();
        h = validateUnderWeight();
        c = validateOverWeight(g);

        if (h) {
          var b = 'Please check that your height and weight are correct. According to the height and weight you entered, your BMI is too low to begin a weight loss program. If you believe you&rsquo;ve received this message in error or have other questions, please give us a call at <a href="tel:+18004354074"onclick="omni_track(\'UnderweightErrorCall\');">1-800-435-4074</a>.';
          addError("#weight", b);
        } else {
          if (g == "female" && c) {
            var b = 'Women weighing in excess of 400 lbs. require doctor approval to be on Nutrisystem. To learn more, contact us at <a href="mailto:dietaryservices@nutrisystem.com"onclick="omni_track(\'OverweightErrorEmail\');">dietaryservices@nutrisystem.com</a> or <a href="tel:+18005855483" onclick="omni_track(\'OverweightErrorCall\');">1-800-585-5483</a>.';
            addError("#weight", b);
          } else {
            if (g == "male" && c) {
              var b = 'Men weighing in excess of 450 lbs. require doctor approval to be on Nutrisystem. To learn more, contact us at <a href="mailto:dietaryservices@nutrisystem.com"onclick="omni_track(\'OverweightErrorEmail\');">dietaryservices@nutrisystem.com</a> or <a href="tel:+18005855483" onclick="omni_track(\'OverweightErrorCall\');">1-800-585-5483</a>.';
              addError("#weight", b);
            } else {
              $(".goal-weight-error").hide();
              $(".pounds-label, #lbs-to-lose").removeClass("error");
              i = true;
            }
          }
        }
      } else {
        i = false;
      }

      var a = window.navigator.userAgent;
      var d = a.search("Trident");

      if (d < 0) {
        if ($("#bmi-form")[0].reportValidity()) {
          i = true;
        } else {
          i = false;
        }
      }

      $("#email-error").remove();

      if (i) {
        var e = $("#email").val();
        var f = false;

        if (e !== "" && !h && !c) {
          f = validateEmail(e);

          if (!f) {
            addError("#email", "Please enter a valid email address");
          }
        }
      }

      $("#bmi-form input[name][type!=hidden][type!=submit][type!=radio][type!=checkbox]").each(function (j, k) {
        if ($(k).val() != undefined && $(k).val() != "" && $(k).val() != null) {
          $("#" + $(k).attr("name") + "Form").val($(k).val());
        } else {
          i = false;
        }
      });
      $("#bmi-form input[type=radio]:checked").each(function (j, k) {
        $("#" + $(k).attr("name") + "Form").val($(k).val());
      });

      if ($("#diabetes").is(":checked")) {
        $("#livingDiab").val("true");
      }

      if ($(".goal-weight-error:visible").length > 0) {
        i = false;
      }

      if (!$("#bmi-form")[0].checkValidity()) {
        i = false;
      }

      if (i && !h && !c && f) {
        $("#bmi-form").submit();
      }
    });
    /* animation fade in from bottom */

    var $animation_elements = $('.animation-element');
    var $window = $(window);

    function check_if_in_view() {
      var window_height = $window.height();
      var window_top_position = $window.scrollTop();
      var window_bottom_position = window_top_position + window_height;
      $.each($animation_elements, function () {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = element_top_position + element_height; //check to see if this current container is within viewport

        if (element_bottom_position >= window_top_position && element_top_position <= window_bottom_position) {
          $element.addClass('in-view');
        } else {
          $element.removeClass('in-view');
        }
      });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');
    /*carousel with videos - pause on slide change or modal close*/

    $('#video-modal').on('slide.bs.carousel', function () {
      $('#video-kei').attr("src", $("#video-kei").attr("src"));
      $('#video-mic').attr("src", $("#video-mic").attr("src"));
      $('#video-bri').attr("src", $("#video-bri").attr("src"));
      $('#video-ken').attr("src", $("#video-ken").attr("src"));
      $('#video-mik').attr("src", $("#video-mik").attr("src"));
    });
    $('#video-modal').on('hidden.bs.modal', function (e) {
      $('#video-kei').attr("src", $("#video-kei").attr("src"));
      $('#video-mic').attr("src", $("#video-mic").attr("src"));
      $('#video-bri').attr("src", $("#video-bri").attr("src"));
      $('#video-ken').attr("src", $("#video-ken").attr("src"));
      $('#video-mik').attr("src", $("#video-mik").attr("src"));
    });
    /* touch swipe mobile carousel */

    $('#rp-carousel').on('touchstart', function (e) {
      window.swipeStartX = e.touches[0].clientX;
    });
    $('#rp-carousel').on('touchmove', function (e) {
      if (window.swipeStartX >= 0 && Math.abs(e.touches[0].clientX - window.swipeStartX) > 50) {
        $(window.swipeStartX - e.touches[0].clientX > 0 ? 'a.right' : 'a.left', '.real-people').click();
        window.swipeStartX = -1;
      }
    });
  });

  function bodyLeadSource() {
    $("#leadOriginated").attr("value", "Members:BMI:YourResults");
  }

  function validateEmail(b) {
    var a = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var c = a.test(b);
    return c;
  }

  function validateloseWeight() {
    var a = $("#weight").val();
    var b = $("#lbs-to-lose").val();

    if (Number(b) >= Number(a) || Number(a) - Number(b) < 91) {
      return true;
    } else {
      return false;
    }
  }

  function validateUnderWeight() {
    var c = Number($("#weight").val());
    var e = Number($("#height").val());
    var f = Number($("#inches").val());

    if (e > 0 && f > 0) {
      var b = e * 12 + f;
      var a = c / (b * b) * 703.2;
      var d = Math.ceil(a * 100) / 100;

      if (d < 19) {
        return true;
      }
    }

    return false;
  }

  function validateOverWeight(b) {
    var a = Number($("#weight").val());

    if (b == "female" && a > 400 || b == "male" && a > 450) {
      return true;
    }

    return false;
  }

  ;
  /******/
})();
/******/ })()
;