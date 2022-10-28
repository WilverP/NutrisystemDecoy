/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/js/feedback/star-rating.js ***!
  \**********************************************/
$(document).ready(function () {
  starDisplay();
});

window.starDisplay = function () {
  // insert LTO Badge - customize page
  $('[data-filter*="lto"]').find('.product-image-link').append('<strong class="lto-badge">Limited Time Only</strong>');
  var isCustomizationPage = false;

  if (window.location.pathname.indexOf("alacarte.jsp") > -1 || window.location.pathname.indexOf("/jsps_hmr/catalog/menu/food.jsp") > -1) {
    isCustomizationPage = true;
  }
  /*    if(nsLayer.profile.personalizedCategory != undefined && !isCustomizationPage){
          // remove all existing frozen icons to avoid adding second time.
          $('.frozen-icon').detach();
          // insert frozen Banner - customize page
          if(window.location.pathname.indexOf("manage-next-order.jsp") > -1){
              var frozenItem = $('[data-filter*="frozen"]').not('[data-filter*="non_frozen"]');
              if(frozenItem.find('frozen-icon').length == 0){
                  for(var i=0;i<frozenItem.length;i++){
                      $('<img alt="Frozen" src="https://content.nutrisystem.com/images/icons/frozen.png" class="frozen-icon" style="margin-left:10px;">').insertAfter(frozenItem[i])
                  }
              }
          }
          else{
              var frozenItem = $('[data-filter*="frozen"]').not('[data-filter*="non_frozen"]').find('.product-name');
              if(frozenItem.parent('.product-info').length > 0 && frozenItem.parent('.product-info').find('span.frozen-badge,span.frozen-badge-modal').length == 0){
                  $('<span class="frozen-badge">FROZEN</span>').insertBefore(frozenItem);
              }
          }
      } else{*/


  if (window.location.pathname.indexOf("/menu") != 0) {
    var frozenItem = $('[data-filter*="frozen"]').not('[data-filter*="non_frozen"]').find('.product-name');
    $('<span class="frozen-badge">FROZEN</span>').insertBefore(frozenItem);
  } //}
  // render stars for individual food items


  if ($('.product-rating').length) {
    $('.product-rating').each(function (index) {
      var count = index + 1; //Added fix to display star rating display in view menu page NS-57862

      if (window.location.pathname != "/menu") {
        //this is the fix for the cause of Double Rating
        if ($(this).find('.rating-stars').length > 0) {
          return true;
        }
      }

      var display_new_string = " "; //        var display_vegetarian_value = " ";
      //        var display_diabetic_value= " ";

      var ratingDiv = $(this).closest('div[star_display_toggle=true]');
      var display_new_value = ratingDiv.attr('display_new');
      console.log("Inaise:: " + display_new_value);

      if (display_new_value !== undefined && display_new_value === "true") {
        ratingDiv.find('.product-name').prepend('<strong class="text-purple">NEW!</span> ');
      }
      /* We no longer display veg & D icons in grid but leaving it here in case we bring it back one day
      var display_vegetarian= ratingDiv.attr('display_vegetarian');
      var display_diabetic= ratingDiv.attr('display_diabetic');
      if(display_vegetarian!=undefined && display_vegetarian == "true"){
           display_vegetarian_value="<div style='background-image:url(/images/food-custom/ico-vegetarians.png);'></div>";
      }
      if(display_diabetic!=undefined && display_diabetic == "true"){
           display_diabetic_value="<div style='background-image:url(/images/food-custom/ico-diabetics.png);'></div>";
      }*/


      var star_display_toggle = ratingDiv.attr("star_display_toggle");

      if (star_display_toggle != undefined && star_display_toggle == "true") {
        //get additional data
        var user_rating_num = ratingDiv.attr('rating_num'); //total count of user who rated this item

        var avg_user_rating = ratingDiv.attr('rating_average'); //average user rating number from 1 - 5, rounded to the nearest tenth

        var avg_user_rating = parseFloat(avg_user_rating).toFixed(1);
        var str = '<span class="sr-only">' + count + ' out of 5</span><div class="rating-stars" id="rating-stars' + count + '"></div>';
        $(this).addClass('rating-applied clearfix').attr('id', 'productRating' + count).prepend(str);
        var t = $('#rating-stars' + count).ourrating(true, {
          maxvalue: 5,
          param1: avg_user_rating,
          param2: true,
          param3: 'rating-stars' + count
        });

        if ($('.short-rating-count').length !== 0) {
          $("#rating-stars" + count).next('.short-rating-count').html('&nbsp;(' + user_rating_num + ")");
        }

        if ($('.rating-count').length !== 0) {
          $("#rating-stars" + count).next('.rating-count').html('&nbsp;(' + user_rating_num + "<span class='hidden-xs hidden-sm'> Reviews</span>)");
        }

        if ($('.reviews-link').length !== 0) {
          $("#rating-stars" + count).next('.reviews-link').html('&nbsp;' + user_rating_num + " Reviews");
        }

        if ($('.reviews-summary').length !== 0) {
          $("#rating-stars" + count).parent('.product-rating').prev('.reviews-summary').html('&nbsp;<span class="review-count"><span itemprop="reviewcount">' + user_rating_num + '</span> Reviews</span> <span class="out-of"><b><span itemprop="ratingValue">' + avg_user_rating + '</span> out of 5</b></span>');
        } //

      }
    });
  }
};
/*************************************************
Star Rating System
First Version: 21 November, 2006
Revised: November 30, 2010
Author/s: Ritesh Agrawal, Cornelius Pitts
Inspiration: Will Stuckey's star rating system (http://sandbox.wilstuckey.com/jquery-ratings/)
Demonstration: http://php.scripts.psu.edu/rja171/widgets/rating.php
Usage: $('#rating').rating(true, {maxvalue:5, curvalue:0});


arguments
show: display the set of stars
options
    maxvalue: number of stars
    curvalue: number of selected stars


************************************************/


jQuery.fn.ourrating = function (show, options) {
  //if(url == null) return;
  if (show == false) {
    return;
  }

  var rating = new String(options.param1);
  var left = rating.substring(0, 1);
  var rightvalue = rating.substring(2);
  var right = rightvalue.substring(0, 1);
  var cName;
  var flag;
  var settings = {
    show: show,
    url: 'none',
    // post changes to
    maxvalue: 5,
    // max number of stars
    curvalue: 0 // number of selected stars

  };

  if (options) {
    jQuery.extend(settings, options);
  }

  ;
  jQuery.extend(settings, {
    cancel: settings.maxvalue > 1 ? true : false
  });
  var container = jQuery(this);
  jQuery.extend(container, {
    averageRating: settings.curvalue,
    url: settings.url
  }); //use index to track where we are are

  for (var i = 0; i <= settings.maxvalue; i++) {
    var size = i;

    if (i == 1) {
      cName = !options.param2 ? 'star' : 'star_first'; //render the star

      if (settings.cancel == true) {
        var div = '<div class="first ' + cName + '"></div>';
        container.append(div);
      } //color the star with conditions


      if (options.param2 == true) {
        if (parseInt(left) >= i) {
          if (parseInt(left) == 1 && right > 0) {
            flag = true;
          }

          $('#' + options.param3).find('div.first', this).addClass('on');
        }
      }
    } else if (i == 2) {
      cName = !options.param2 ? 'star' : 'star_second';

      if (settings.cancel == true) {
        var div = '<div class="second ' + cName + '"></div>';
        container.append(div);
      } //color the star with conditions


      if (flag == true) {
        $('#' + options.param3).find('div.second', this).addClass(chooseClass(parseInt(right)));
        flag = false;
        continue;
      }

      if (options.param2 == true) {
        if (parseInt(left) >= i) {
          if (parseInt(left) == i) {
            //stay here and get right side of decimal
            if (parseInt(right) > 0) {
              $('#' + options.param3).find('div.second', this).addClass('on');
              flag = true;
            }
          } else {
            $('#' + options.param3).find('div.second', this).addClass('on');
          }
        } else {}
      }
    } else if (i == 3) {
      cName = !options.param2 ? 'star' : 'star_third';

      if (settings.cancel == true) {
        var div = '<div class="third ' + cName + '"></div>';
        container.append(div);
      }

      if (flag == true) {
        $('#' + options.param3).find('div.third', this).addClass(chooseClass(parseInt(right)));
        flag = false;
        continue;
      } //color the star with conditions


      if (options.param2 >= true) {
        if (parseInt(left) >= i) {
          if (parseInt(left) == i) {
            if (parseInt(right) > 0) {
              $('#' + options.param3).find('div.third', this).addClass('on');
              flag = true;
            }
          }

          $('#' + options.param3).find('div.third', this).addClass('on');
        }
      }
    } else if (i == 4) {
      cName = !options.param2 ? 'star' : 'star_fourth'; //draw the star first

      if (settings.cancel == true) {
        var div = '<div class="fourth ' + cName + '"></div>';
        container.append(div);
      }

      if (flag == true) {
        $('#' + options.param3).find('div.fourth', this).addClass(chooseClass(parseInt(right)));
        flag = false;
        continue;
      } //color the star with conditions


      if (options.param2 == true) {
        if (parseInt(left) >= i) {
          //if true this is the rating
          if (parseInt(left) == i) {
            if (parseInt(right) > 0) {
              $('#' + options.param3).find('div.fourth', this).addClass('on');
              flag = true;
            }
          }

          $('#' + options.param3).find('div.fourth', this).addClass('on');
        }
      }
    } else if (i == 5) {
      cName = !options.param2 ? 'star' : 'star_fifth';

      if (settings.cancel == true) {
        var div = '<div class="fifth ' + cName + '"></div>';
        container.append(div);
      }

      if (flag == true) {
        //$('#'+options.param3).find('div#fifth',this).removeClass('star_fifth');
        $('#' + options.param3).find('div.fifth', this).addClass(chooseClass(parseInt(right)));
        flag = false;
        continue;
      } //color the star with conditions


      if (options.param2 == true) {
        if (parseInt(left) >= i) {
          //if true this is the rating
          if (parseInt(left) == i) {
            if (parseInt(right) > 0) {
              $('#' + options.param3).find('div.fifth', this).addClass('on');
              flag = true;
            }
          }

          $('#' + options.param3).find('div.fifth', this).addClass('on');
        }
      }
    }
  } //    var stars = jQuery(container).children('.star');
  //    var cancel = jQuery(container).children('.cancel');
  //
  //        stars
  //            .mouseover(function(){
  //                event.drain();
  //                event.fill(this);
  //            })
  //            .mouseout(function(){
  //                event.drain();
  //                event.reset();
  //            })
  //            .focus(function(){
  //                event.drain();
  //                event.fill(this);
  //            })
  //            .blur(function(){
  //                event.drain();
  //                event.reset();
  //            });
  //
  //    stars.click(function(){
  //        if(settings.cancel == true){
  //            settings.curvalue = stars.index(this) + 1;
  //            jQuery.post(container.url, {
  //                "rating": jQuery(this).children('a')[0].href.split('#')[1]
  //            });
  //            return false;
  //        }
  //        else if(settings.maxvalue == 1){
  //            settings.curvalue = (settings.curvalue == 0) ? 1 : 0;
  //            $(this).toggleClass('on');
  //            jQuery.post(container.url, {
  //                "rating": jQuery(this).children('a')[0].href.split('#')[1]
  //            });
  //            return false;
  //        }
  //        return true;
  //
  //    });
  //
  //    // cancel button events
  //    if(cancel){
  //        cancel
  //            .mouseover(function(){
  //                event.showtooltip();
  //                event.drain();
  //                jQuery(this).addClass('on');
  //            })
  //            .mouseout(function(){
  //                event.reset();
  //                jQuery(this).removeClass('on');
  //            })
  //            .focus(function(){
  //                event.drain();
  //                jQuery(this).addClass('on');
  //            })
  //            .blur(function(){
  //                event.reset();
  //                jQuery(this).removeClass('on');
  //            });
  //
  //        // click events.
  //        cancel.click(function(){
  //            event.drain();
  //            settings.curvalue = 0;
  //            jQuery.post(container.url, {
  //                "rating": jQuery(this).children('a')[0].href.split('#')[1]
  //            });
  //            return false;
  //        });
  //    }
  //
  //    var event = {
  //        fill: function(el){ // fill to the current mouse position.
  //            var index = stars.index(el) + 1;
  //            stars
  //                .children('a').css('width', '100%').end()
  //                .lt(index).addClass('hover').end();
  //        },
  //        drain: function() { // drain all the stars.
  //            stars
  //                .filter('.on').removeClass('on').end()
  //                .filter('.hover').removeClass('hover').end();
  //        },
  //        reset: function(){ // Reset the stars to the default index.
  //            stars.lt(settings.curvalue).addClass('on').end();
  //        },
  //        showtooltip: function() {
  //            stars.lt(index).addClass('ToolTextHover1');
  //        }
  //    }
  //    event.reset();
  //
  //    return(this);

};

function chooseClass(r) {
  switch (r) {
    case 1:
    case 2:
      //return 'star_first';
      return 'one';
      break;

    case 3:
    case 4:
      return 'two';
      break;

    case 5:
      return 'three';
      break;

    case 6:
    case 7:
      return 'four';
      break;

    case 8:
    case 9:
      return 'five';
  }
}

(function (jQuery) {
  $.fn.qsort = function (o) {
    qlog = function qlog(m) {
      if (window.console && console.log) {
        console.log(m);
      } else {
        alert(m);
      }
    };

    function partition(array, begin, end, pivot) {
      var pvt = array[pivot];
      array = swap(array, pivot, end - 1);
      var store = begin;
      var ptr;

      for (ptr = begin; ptr < end - 1; ++ptr) {
        if (array[ptr] <= pvt) {
          array = swap(array, store, ptr);
          ++store;
        }
      }

      array = swap(array, end - 1, store);
      return store;
    }

    ;

    function qsort(array, begin, end) {
      if (end - 1 > begin) {
        var pivot = begin + Math.floor(Math.random() * (end - begin));
        pivot = partition(array, begin, end, pivot);
        qsort(array, begin, pivot);
        qsort(array, pivot + 1, end);
      }
    }

    ;

    function quick_sort(array) {
      qsort(array, 0, array.length);
    }

    ;

    function swap(array, a, b) {
      var tmp = array[a];
      array[a] = array[b];
      array[b] = tmp;
      return array;
    }

    ;

    function convertToLower(arr) {
      var igAr = new Array();
      $(arr).each(function (i) {
        igAr.push(this.toString().toLowerCase());
      });
      return igAr;
    }

    ;
    var defaults = {
      order: "asc",
      attr: "value",
      ignoreCase: false,
      digits: false
    };
    o = $.extend(defaults, o);

    try {
      var values = new Array();
      var oldValues = new Array();
      var elems = new Array();
      var i = 0;
      $(this).each(function () {
        elems.push($(this));
        var v = $(this).attr(o.attr);

        if (o.digits == true) {
          v = parseInt(v);
        }

        oldValues.push(v);
        values.push(v);
      });

      if (o.ignoreCase == true) {
        values = convertToLower(values);
        oldValues = convertToLower(oldValues);
      }

      quick_sort(values);
      var sortedElems = new Array();
      $(values).each(function () {
        var loc = -1;

        if (o.digits == true) {
          loc = $.inArray(parseInt(this.toString()), oldValues);
        } else {
          loc = $.inArray(this.toString(), oldValues);
        }

        sortedElems.push(elems[loc]);
        oldValues[loc] = null;
      });

      if (o.order == "desc") {
        for (i = 0; i < oldValues.length - 1; i++) {
          $(sortedElems[i]).before($(sortedElems[i + 1]));
        }
      } else {
        for (i = 0; i < oldValues.length - 1; i++) {
          $(sortedElems[i]).after($(sortedElems[i + 1]));
        }
      }

      return $(this);
    } catch (e) {
      qlog("qsort says: There was an error while selecting elements or the options.");
    }
  };
})(jQuery); // JavaScript Document
/******/ })()
;