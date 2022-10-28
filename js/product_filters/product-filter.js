/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./resources/js/product_filters/product-filter.js ***!
  \********************************************************/
$(document).ready(function () {
  $("#productdetailsModal").on('shown.bs.modal', function (event) {
    $("#productdetailsModal .qty-wrapper button.lower-qty:not(.disabled):visible").focus().select();

    if ($('#productdetailsModal button.add-cta:not(.disabled)').css('display') == 'none') {
      $("#productdetailsModal .qty-wrapper input.input-lg:not(.disabled)").focus().select();
    } else {
      $("#productdetailsModal .qty-wrapper button.add-cta:not(.disabled)").focus();
    }
  });
  $('.more-link').click(function () {
    var txt = $("#more-filters-wrap").is(':visible') ? 'more...' : 'less';
    $(this).text(txt);
  });

  if ($(window).width() <= 750 && $('.non-mobile').length) {
    $('.non-mobile').first().remove();
  } else if ($('.mobile-devices').length) {
    $('.mobile-devices').first().remove();
  } // added for NS-33087


  $(window).on("orientationchange", function () {
    if (window.orientation == 90 || window.orientation == -90) // Landscape
      {
        if ($("#content").hasClass("a-la-cart")) {
          $("#filter-checks-wrap").removeClass("collapse");
        }
      }

    if (window.orientation == 0) // Portrait
      {
        if ($("#content").hasClass("a-la-cart")) {
          $("#filter-checks-wrap").addClass("collapse");
        }
      }
  }); //mobile grid togggle

  $("#grid-toggle").click(function () {
    $(this).children('.glyphicon').toggleClass('glyphicon-th-large').toggleClass('glyphicon-th-list');
    $(".product-grid .product").toggleClass('col-xs-12').toggleClass('col-xs-6');

    if (window.location.href.indexOf("/jsps_hmr/customize/alacarte.jsp") > -1) {
      $(".product-grid .product-image").toggleClass("col-xs-5").toggleClass("col-xs-12");
      $(".product-grid .product-info").toggleClass("col-xs-7").toggleClass("col-xs-12");
    } else {
      $(".product-grid .product-image").toggleClass("col-xs-5").toggleClass("col-xs-12");
      $(".product-grid .product-info").toggleClass("col-xs-7").toggleClass("col-xs-12");
    }
  });
  initFilter();
  $('.filter-by-trigger').click(function () {
    if (!$('#filterFlex').hasClass('in')) {
      setTimeout(function () {
        $('.navbar-fixed-top').removeClass('shadow');
        $('.navbar-fixed-top').removeClass('shadow');

        if ($('.product-grid button.add-cta').css('display') == 'none') {
          $('.product-grid input.input-lg').first().focus().select();
        } else {
          $('.product-grid input.input-lg').first().blur();
          $(".product-grid button.add-cta").first().focus();
        }
      }, 500);
    }
  });
  $('.close').click(function () {
    setTimeout(function () {
      if ($('.product-grid button.add-cta').css('display') == 'none') {
        $('.product-grid input.input-lg').first().focus().select();
      } else {
        $('.product-grid input.input-lg').first().blur();
        $(".product-grid button.add-cta").first().focus();
      }
    }, 500);
  });
  $('.btn-primary-outline').click(function () {
    if ($('.product-grid button.add-cta').css('display') == 'none') {
      $('.product-grid input.input-lg').first().focus().select();
    } else {
      $('.product-grid input.input-lg').first().blur();
      $(".product-grid button.add-cta").first().focus();
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 250);
    }
  });
  $('#fuzzy-input-shown').keyup(function () {
    productList.fuzzySearch.search(this.value.trim());
  });

  if (Boolean(overviewFiltering)) {
    hidePreSelectedCheckBoxes();
    doFilter(); //displayProductCount();
  }

  $(document).delegate('.qty-wrapper input.qty', 'keyup', function (e) {
    e.preventDefault();
    var keyCode = e.keyCode || e.which;

    if ($(this).parents('.product').find('button.add-cta').css('display') == 'none' && keyCode == '9') {
      $(this).parents('.product').find('.qty-wrapper input.qty').show().focus().select();
    } else {
      $(this).parents('.product').find('button.add-cta').first().focus();
    }
  }); //IE Enter Key Fix

  $(document).keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    var hasClassIn = $(document.activeElement).hasClass('add-cta');
    var hasClassDiabled = $(document.activeElement).hasClass('disabled');
    var hasClassQty = $(document.activeElement).hasClass('qty');
    var hasClassLowerQty = $(document.activeElement).hasClass('lower-qty');
    setTimeout(function () {
      if (keycode == '13' && hasClassIn && !hasClassDiabled) {
        $(document.activeElement).parents('.product').find('.add-cta').hide();
        $(document.activeElement).parents('.product').find('.qty-wrapper input.qty').show().select();
        $(document.activeElement).parents('#productdetailsModal').find('.qty-wrapper input.qty').show().select().focus();
      } else if (keycode == '13' && hasClassQty) {
        $(document.activeElement).parents('.product').find('.qty-wrapper input.qty').show().select();
      }
    }, 500);
  });
});
/*overviewFiltering flag is used to execute the extra filtering needed
 on alacarte overview page. On overview page it is marked as true
 */

overviewFiltering = false;
hiddenFilters = false;
ANDFilters = ["diabetes_friendly", "vegetarian", "lower_sodium", "good_source_of_protein", "good_source_of_fiber", "no_cholesterol", "no_milk", "no_eggs", "no_wheat", "no_shellfish", "no_treenuts", "no_fish", "not_spicy"];
narrowByFilter = ["favorites", "best_sellers", "premium", "mixed", "carb_conscious", "balanced", "new", "bars_and_bites", "chocolate", "sweet_eats", "muffins_baked_goods", "hot_breakfasts", "burgers_melts_and_sandwiches", "soups_stews_bowls", "pastas_and_rice", "tastes_of_italy", "pizzas", "chicken_dishes", "beef_dishes", "pork_dishes", "seafood"];
StoringConditionFilter = ["non_frozen", "frozen"];
specialDietoryNeeds = ["diabetes_friendly", "vegetarian"];
nutrition = ["lower_sodium", "good_source_of_protein", "good_source_of_fiber", "no_cholesterol"];
preparation = ["no_prep_needed", "microwave", "stove", "toaster_oven", "conventional_oven"];
categoryFilter = ["breakfast", "lunch", "dinner", "snacks", "lifestyle", "shakes_and_bars", "sampler_packs"];
andFilters = ["please_exclude"];
pleaseExcludeFilter = ["not_spicy", "no_wheat", "no_milk", "lactose_intolerance", "no_treenuts", "no_fish", "no_shellfish", "no_eggs", "no_tomatoes", "no_pork_or_gelatin", "no_chocolate", "no_sugar_alcohols", "no_onions", "diverticulosis"];
personalizedCategories = ["carb_conscious", "mixed", "balanced"];
isFCRPage = false;
personalizedCategory = "";
var categoryFiltersWithCount = [];

window.initFilter = function () {
  options = {
    valueNames: ['product-name', {
      data: ['id', 'filter', 'rating-average', 'productname', 'sellerWeightAndRatingRanking', 'favorite-count']
    }]
  }; // FCR : FTO and autoship

  if (typeof foodCustomizer !== 'undefined' && typeof mealIndex !== 'undefined' && $('#category' + mealIndex).length > 0) {
    productList = new List('food-grid', options);
  } // view menu and alacarte grid


  if ($('#product-list').length > 0) {
    productList = new List('product-list', options);
  }

  if (typeof productList === 'undefined') {
    return;
  }

  productList.on('updated', function (list) {
    toggleErrorMessage();
  });
  displayProductCount();

  if (window.location.pathname.indexOf("/jsps_hmr/catalog/overview.jsp") > -1) {
    doFilter();
  }

  displayCategoryFilterProductCount();
  var defaultSelectedSortingOption = $("#sort-options option:selected").val();
  $('#sort-options').val(defaultSelectedSortingOption).change();
  filterCookie.populateUI(); // Best for you changes : START

  if (window.location.pathname.indexOf("/jsps_hmr/customize") > -1) {
    isFCRPage = true;
  }

  personalizedCategory = ""; //nsLayer.profile.personalizedCategory;

  if (isFCRPage && typeof foodCustomizer !== 'undefined' && foodCustomizer.isPersonalizedCategoryExist && personalizedCategory !== "" && !foodCustomizer.isAlaCarte) {
    //addPersonalizedCategoryCrumb();
    if ($("span:contains('favorited')").length > 0 || $("#product-filter-form input:checkbox:checked").length > 0) {
      $('.filter-chosen').show();
    } else {
      $('.filter-chosen').hide();
    } //$('#best_for_you').show();

  } else if (!isFCRPage && typeof foodCustomizer !== 'undefined' && !foodCustomizer.isPersonalizedCategoryExist && personalizedCategory !== "") {
    manageFilterCrumbs.removeCrumb(personalizedCategory);
    $('#best_for_you').hide();
  } else {
    $('#best_for_you').hide();
  } // Best for you changes : END

};

window.filterFunc = function (item) {
  if (typeof item._values.filter == 'undefined' || item._values.filter === null) {
    return false;
  }

  var productInfoArr = item._values.filter.split(",");

  if (productInfoArr === null || typeof selected == 'undefined') {
    return false;
  }
  /*Within the filter Category we need to perform OR function and amongs the filter categories we need to perform AND function.
    More details on requirement NS-1978
  */


  var matchFound;
  $.each(selectedFilterJson, function (index, filters) {
    //iterating over json of filters of selectedFilters
    matchFound = false;

    if (andFilters.indexOf(index) > -1) {
      var foundCount = 0;
      $.each(filters, function (index1, selectedFilter) {
        if (productInfoArr.indexOf(selectedFilter) > -1) {
          foundCount++;
        } else {
          return false;
        }
      });

      if (foundCount == filters.length) {
        matchFound = true;
      }
    } else {
      $.each(filters, function (index1, selectedFilter) {
        //Iterating over array of selected filter of one category
        if (selectedFilter != 'new' && productInfoArr.indexOf(selectedFilter) > -1) {
          matchFound = true; //returning false is same as breaking the loop

          return false;
        } //If the selectedFilter is new, then search for NEW! text.
        else if (selectedFilter == 'new') {
            if (item.elm.innerHTML.indexOf('NEW! ') > -1) {
              matchFound = true; //returning false is same as breaking the loop

              return false;
            }
          }
      });
    } //if OrFilter is still false then


    if (!matchFound) {
      return false;
    }
  }); //console.log("Selected Filters: "+selected+"\n Product: "+item._values.productname+" \n Product Filter Attributes : "+ productInfoArr+"\n Matches:" + matchFound);

  return matchFound;
};
/*
 * This method is segregating the selected filters amongs the filter categories.
 * Then we can use this segregation to iterate to suite our AND OR behavior for filter.
 */


window.arrangeSelectedFilters = function (selectedFilters) {
  var narrowByFilterCollection = new Array();
  var StoringConditionFilterCollection = new Array();
  var specialDietoryNeedsCollection = new Array();
  var nutritionCollection = new Array();
  var preparationCollection = new Array();
  var catgeoriesCollection = new Array();
  var pleaseExcludeCollection = new Array();
  selectedFilterJson = {};

  for (var i = 0; i < selectedFilters.length; i++) {
    if (jQuery.inArray(selectedFilters[i], narrowByFilter) > -1) {
      narrowByFilterCollection.push(selectedFilters[i]);
      selectedFilterJson['narrowBy'] = narrowByFilterCollection;
      continue;
    } else if (jQuery.inArray(selectedFilters[i], StoringConditionFilter) > -1) {
      StoringConditionFilterCollection.push(selectedFilters[i]);
      selectedFilterJson['storing'] = StoringConditionFilterCollection;
      continue;
    } else if (jQuery.inArray(selectedFilters[i], specialDietoryNeeds) > -1) {
      specialDietoryNeedsCollection.push(selectedFilters[i]);
      selectedFilterJson['specialNeeds'] = specialDietoryNeedsCollection;
      continue;
    } else if (jQuery.inArray(selectedFilters[i], nutrition) > -1) {
      nutritionCollection.push(selectedFilters[i]);
      selectedFilterJson['nutrition'] = nutritionCollection;
      continue;
    } else if (jQuery.inArray(selectedFilters[i], preparation) > -1) {
      preparationCollection.push(selectedFilters[i]);
      selectedFilterJson['preparation'] = preparationCollection;
      continue;
    } else if (jQuery.inArray(selectedFilters[i], categoryFilter) > -1) {
      catgeoriesCollection.push(selectedFilters[i]);
      selectedFilterJson['categories'] = catgeoriesCollection;
      continue;
    } else if (jQuery.inArray(selectedFilters[i], pleaseExcludeFilter) > -1) {
      pleaseExcludeCollection.push(selectedFilters[i]);
      selectedFilterJson['please_exclude'] = pleaseExcludeCollection;
      continue;
    }
  }
  /*for(var index in selectedFilterJson) {
      console.log(selectedFilterJson[index]);
  }*/

};

window.doFilter = function () {
  var cookieJsonObj = [];
  selected = $("#product-filter-form input:checked").map(function (i, el) {
    return el.value;
  }).get(); //changed id to value. data doesn't change

  categoryfilters = $("#meal-filter input:checked").map(function (i, el) {
    return el.value;
  }).get();
  selected = selected.concat(categoryfilters);
  personalizedCategory = ""; //nsLayer.profile.personalizedCategory;

  if (isFCRPage && typeof selected !== 'undefined' && selected.length == 0 && personalizedCategory !== "" && foodCustomizer.isPersonalizedCategoryExist) {
    showNonPersCategories('none');
  } else if (typeof selected !== 'undefined' && selected.length == 0) {
    resetFilter(true);
  } else {
    arrangeSelectedFilters(selected);
    productList.filter(filterFunc);
    manageFilterCrumbs.clearCrumbs();

    for (i = 0; i < selected.length; i++) {
      var item = {};
      item["id"] = selected[i];
      cookieJsonObj.push(item);

      if (!(isFCRPage && personalizedCategory !== "" && selected[i] == personalizedCategory && foodCustomizer.isPersonalizedCategoryExist == false)) {
        manageFilterCrumbs.addCrumb(selected[i]);
      }
    }

    if (selected.length > 0) {
      $('.filter-chosen').show();
    }

    toggleErrorMessage();
  } //Making sure that we are retaining user selected filter which can not be applied on this page.


  cookieJsonObj = addDisabledFilters(cookieJsonObj);

  if (!overviewFiltering) {
    filterCookie.set(cookieJsonObj);
  }

  if (isFCRPage && foodCustomizer.isPersonalizedCategoryExist && personalizedCategory !== undefined && !foodCustomizer.isAlaCarte) {
    // NS-37689 : Removed hiding "Best for you" and showing for customer
    //$('#' + personalizedCategory + '_crumb').hide();
    starDisplay();
  }
};

window.resetFilter = function (resetUI) {
  if (typeof productList !== 'undefined') {
    productList.filter();
    manageFilterCrumbs.clearCrumbs();

    if (typeof foodCustomizer !== 'undefined') {
      foodCustomizer.updateCategoryFilter();
    }

    if (resetUI !== undefined && !resetUI) {
      filterCookie.set();
    } //Returning all results after cleaing the search box


    if ($("#fuzzy-input-shown").length) {
      if ($("#fuzzy-input-shown").val().length > 0) {
        $("#fuzzy-input-shown").val('');
        productList.fuzzySearch.search('');
      }
    }

    toggleErrorMessage(); //Preconfigured filters on overview page as made display:none so they are not visible and hence wont be unchecked for resetting the filter

    $("#product-filter-form input").prop('checked', false); //Below step is needed as we dont want preconfigured filters coming via URL to be cleared when we clear all filters

    if ($("#fuzzy-input-shown").length) {
      if (hiddenFilters) {
        // This will restore the preconfigured filters again.
        doFilter();
      }
    }
  }
};

filterCookie = {
  name: "filterCk",
  expHrs: 6,
  //hours till expire
  domain: document.domain,
  get: function get() {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + this.name + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined; // String or undefined
  },
  set: function set(value) {
    //value example currently in prod:    [{"id":"lower_sodium"},{"id":"diabetes_friendly"}]
    var date = new Date();
    date.setHours(date.getHours() + this.expHrs);
    document.cookie = this.name + "=" + JSON.stringify(value) + "; expires=" + date + "; domain=" + this.domain + "; path=/";
  },
  populateUI: function populateUI() {
    var obj = this.get();

    if (typeof obj != "undefined" && obj != "undefined") {
      var objJSON = $.parseJSON(obj);
      $.each(objJSON, function (i, item) {
        //Dont apply filters which are marked as disabled due to zero product count on this page
        if (!$("#product-filter-form input[value='" + item.id + "']").prop("disabled")) {
          $("#product-filter-form input[value='" + item.id + "']").prop("checked", true).trigger("change");
        }

        if (!$("#meal-filter input[value='" + item.id + "']").prop("disabled")) {
          $("#meal-filter input[value='" + item.id + "']").prop("checked", true).trigger("change");
        }
      });
    }
  }
};
manageFilterCrumbs = {
  addCrumb: function addCrumb(filterId) {
    var filterName = $("label[for=" + filterId + "]").text().replace(/([^a-z-\s]+)\$amp;/gi, '');
    var elements = $('.filter-chosen');
    var isCountExist = false;

    if (filterName.indexOf(")") > -1) {
      isCountExist = true;
    }

    if (isCountExist && !$('#' + manageFilterCrumbs.getCrumbId(filterId), elements).length && !$('#' + filterId).prop("disabled")) {
      if ($('#' + filterId).attr('name') == 'food_preferences' && filterName.indexOf("Intolerance") == -1) {
        $('.filter-chosen').append('<a href="javascript:void(0)" onclick="manageFilterCrumbs.removeCrumb(\'' + filterId + '\');omni_track(\'remove_' + filterId + '\');" id=' + manageFilterCrumbs.getCrumbId(filterId) + '><span class="glyphicon glyphicon-remove"></span>No ' + filterName + '</a>');
      } else if (filterId == 'premium') {
        var premiumFilterName = filterName.substr(0, filterName.indexOf("("));
        premiumFilterName = premiumFilterName.replace(/ /g, "");
        $('.filter-chosen').append('<a href="javascript:void(0)" onclick="manageFilterCrumbs.removeCrumb(\'' + filterId + '\');omni_track(\'remove_' + premiumFilterName + '\');" id=' + manageFilterCrumbs.getCrumbId(filterId) + '><span class="glyphicon glyphicon-remove"></span>' + filterName + '</a>');
      } else {
        $('.filter-chosen').append('<a href="javascript:void(0)" onclick="manageFilterCrumbs.removeCrumb(\'' + filterId + '\');omni_track(\'remove_' + filterId + '\');" id=' + manageFilterCrumbs.getCrumbId(filterId) + '><span class="glyphicon glyphicon-remove"></span>' + filterName + '</a>');
      }
    }
  },
  removeCrumb: function removeCrumb(filterId) {
    $('.filter-chosen').children('#' + manageFilterCrumbs.getCrumbId(filterId)).remove();
    $("#product-filter-form input[value='" + filterId + "']").prop('checked', false);
    $("#meal-filter input[value='" + filterId + "']").prop('checked', false);
    doFilter();

    if (personalizedCategory !== undefined && $('.options-link').length > 0 && filterId == personalizedCategory) {
      showNonPersCategories('none');
    } //added for NS-19425


    if (typeof csrUser !== 'undefined' && csrUser) {
      var products = $('.product');
      products.each(function () {
        var attributes = $(this).attr('data-filter').split(',');
        var frozenlocation = $.inArray("frozen", attributes);
        var nonfrozenlocation = $.inArray("non_frozen", attributes);

        if (frozenlocation > -1 && nonfrozenlocation <= -1 && !$('.frozen-icon', this).length) {
          $(this).find('.product-name').append('<img alt="Frozen" src="/images/icons/frozen.png" class="frozen-icon" style="height: 18px; margin-left: 4px;">');
        }

        var dblocation = $.inArray("diabetes_friendly", attributes);

        if (dblocation > -1 && !$('.diabetes-icon', this).length) {
          $(this).find('.product-name').append('<img alt="Diabetes Friendly" src="/images/icons/diabetes-friendly.png" class="diabetes-icon" style="height: 18px; margin-left: 4px;">');
        }

        var veglocation = $.inArray("vegetarian", attributes);

        if (veglocation > -1 && !$('.veg-icon', this).length) {
          $(this).find('.product-name').append('<img alt="Vegetarian" src="/images/icons/vegetarian.png" class="veg-icon" style="height: 18px; margin-left: 4px;">');
        }
      });
      var hasClassIn = $('#filterFlex').hasClass('in');

      if (!hasClassIn) {
        if ($('.product-grid button.add-cta').css('display') == 'none') {
          $('.product-grid input.input-lg').first().select();
        } else {
          $('.product-grid input.input-lg').first().blur();
          $(".product-grid button.add-cta").first().focus();
          setTimeout(function () {
            window.scrollTo(0, 0);
          }, 250);
        }
      }
    }
  },
  getCrumbId: function getCrumbId(filterId) {
    return filterId + '_crumb';
  },
  clearCrumbs: function clearCrumbs() {
    $('.filter-chosen').children('a').remove();
  }
};

window.sortProducts = function () {
  var sortType = $('#sort-options').find('option:selected').attr('sort-type');
  var value = $('#sort-options').find('option:selected').val();
  productList.sort(value, {
    order: sortType
  });

  if ($('body').hasClass('impersonate')) {
    tabbingCustomization();
    $(".product .add-cta").each(function () {
      if ($(this).is(":visible")) {
        $(this).parent().find("button:not(.add-cta),input").hide();
      }
    });
  }
};

window.toggleErrorMessage = function () {
  if (productList.visibleItems.length > 0) {
    $('#no-results').addClass('hide');
  } else {
    $('#no-results').removeClass('hide');
  }
};

window.addPersonalizedCategoryCrumb = function () {
  var filterLabels = $('#product-filter-form input');
  filterLabels.each(function () {
    var filterId = $(this).attr('id');
    var count = getProductCount(filterId);

    if (filterId == nsLayer.profile.personalizedCategory) {
      var personalizedCrumbFilterName = "";
      var personalizedCrumbId = "#" + nsLayer.profile.personalizedCategory + "_crumb";
      var personalizedCrumb = $('.filter-chosen').find(personalizedCrumbId);

      if (personalizedCrumb.length > 0) {
        var personalizedCrumbFilterName = personalizedCrumb.text().replace(/([^a-z-\s]+)\$amp;/gi, '');
      }

      var filterName = "Best for you " + count;

      if (personalizedCrumb.length == 0 || personalizedCrumbFilterName !== filterName) {
        $(personalizedCrumbId).remove();
        $('.filter-chosen').append('<a href="javascript:void(0)" onclick="manageFilterCrumbs.removeCrumb(\'' + filterId + '\');omni_track(\'remove_' + filterId + '\');" id=' + manageFilterCrumbs.getCrumbId(filterId) + '><span class="glyphicon glyphicon-remove"></span>' + filterName + '</a>');
        return;
      }
    }
  });
};

window.displayProductCount = function () {
  var filterLabels = $('#product-filter-form input');
  filterLabels.each(function () {
    var filterLabelId = $(this).attr('id');
    var count = getProductCount(filterLabelId);
    $('label[for=' + filterLabelId + ']').find('.related-product-count').text(count);
    count = count.replace(/[()]/g, '') * 1;

    if (count == 0) {
      $('input[id=' + filterLabelId + ']').prop('disabled', true);
      $('input[id=' + filterLabelId + ']').prop('checked', false); //We have to retain filters from previous category which can not be applied on this page,so that if user goes back he can see the same gets applied.

      var filterInCookie = isFilterInCookie(filterLabelId);

      if (filterInCookie) {
        //Adding addition parameter to input checkbox so that we can re construct filters.
        $('input[id=' + filterLabelId + ']').attr('data-selected-filters', 'true');
      }
    } else {
      $('input[id=' + filterLabelId + ']').removeAttr('disabled');
      $('input[id=' + filterLabelId + ']').removeAttr('data-selected-filters');
      $('label[for=' + filterLabelId + ']').removeClass('text-gray');
      $('label[for=' + filterLabelId + ']').show();
    }
  });
  $('.filter-checkboxes .small:contains("(0)")').parent("label").addClass("text-gray"); //hide filters with 0 in narrow by

  $('.filter-checkboxes #narrowBy .small:contains("(0)")').parent("label").hide(); //hide narrow by headline if all are hidden

  if ($('.filter-checkboxes #narrowBy .small:contains("(0)")').length == $('.filter-checkboxes #narrowBy .small').length) {
    $('#narrowBy .section-label').hide();
  } else {
    $('#narrowBy .section-label').show();
  }
  /*if(nsLayer.profile.securityStatus <= 5){
      $('.filter-checkboxes .impersonate-only').hide();
  }*/

  /*Start - show category filters for Bars and Sampler-packs sections only */
  //FTO Alc page


  if (window.location.href.indexOf("a-la-carte.jsp") > -1 || window.location.href.indexOf("/jsps_hmr/catalog/overview.jsp") > -1) {
    var preConfiguredFilters = $.urlParam('categoryId');

    if (preConfiguredFilters == '54' || preConfiguredFilters == '40068' || window.location.href.indexOf("/jsps_hmr/catalog/overview.jsp") > -1) {
      $("#category").css("display", "block");
    } else {
      $("#category").css("display", "none");
    }
  }
  /*End - show category filters for Bars and Sampler-packs sections only */

};

window.displayCategoryFilterProductCount = function () {
  var filterLabels = $('#meal-filter input');
  categoryFiltersWithCount = [];
  filterLabels.each(function () {
    var filterLabelId = $(this).attr('id');
    var count = getCategoryProductCount(filterLabelId);
    $('label[for=' + filterLabelId + ']').find('.related-product-count').text(count);
    count = count.replace(/[()]/g, '') * 1;

    if (count == 0) {
      $('input[id=' + filterLabelId + ']').prop('disabled', true);
      $('input[id=' + filterLabelId + ']').prop('checked', false); //We have to retain filters from previous category which can not be applied on this page,so that if user goes back he can see the same gets applied.

      var filterInCookie = isFilterInCookie(filterLabelId);

      if (filterInCookie) {
        //Adding addition parameter to input checkbox so that we can re construct filters.
        $('input[id=' + filterLabelId + ']').attr('data-selected-filters', 'true');
      }
    } else {
      $('input[id=' + filterLabelId + ']').removeAttr('disabled');
      $('input[id=' + filterLabelId + ']').removeAttr('data-selected-filters');
      $('label[for=' + filterLabelId + ']').removeClass('text-gray');
      $('label[for=' + filterLabelId + ']').show();
    }
  });
  $('.meal-check-wrap .small:contains("(0)")').parent("label").addClass("text-gray"); //hide filters with 0 in narrow by

  $('.filter-checkboxes #narrowBy .small:contains("(0)")').parent("label").hide();

  if (typeof foodCustomizer !== 'undefined' && !foodCustomizer.isAlaCarte) {
    if (programSubCatType != undefined && programSubCatType == 'Flex Non Transition') {
      foodCustomizer.categoryProductCount(foodCustomizer.currentMealIndex);
    }
  }
};

window.getCategoryProductCount = function (filterId) {
  var products = $('.product');
  var productsFound = 0;
  var totalProducts = products.length;
  var categoryFiltersCount = new Object();
  categoryFiltersCount.filterId = filterId;
  categoryFiltersCount.products = new Array();
  var productsArray = [];
  products.each(function () {
    var attributes = $(this).attr('data-filter').split(',');
    var location = $.inArray(filterId, attributes);

    if (location > -1) {
      productsFound++;
      var productId = $(this).attr('data-id');
      productsArray.push(productId);
    }
  });
  categoryFiltersCount.products = productsArray;

  if ($("label[for='" + filterId + "']").find("input").attr("name") == 'food_preferences') {
    count = totalProducts - productsFound;
  } else {
    count = productsFound;
  }

  categoryFiltersWithCount.push(categoryFiltersCount);
  return '(' + count + ')';
};

window.getProductCount = function (filterId) {
  var products = $('.product');
  var productsFound = 0;
  var totalProducts = products.length;
  products.each(function () {
    if (filterId == 'new') {
      if ($(this).find('strong.text-purple').text() == 'NEW! ') productsFound++;
    } else {
      var attributes = $(this).attr('data-filter').split(',');
      var location = $.inArray(filterId, attributes);

      if (location > -1) {
        productsFound++;
      }
    }
  });

  if ($("label[for='" + filterId + "']").find("input").attr("name") == 'food_preferences') {
    count = totalProducts - productsFound;
  } else {
    count = productsFound;
  }

  return '(' + count + ')';
};
/* Hide the pre selected filters,these filters got applied based on
the url product-filter parameter. Marking the checkbox as preselect
happens inside jsp. This method just hides the preselected check boxes from user.
*/


window.hidePreSelectedCheckBoxes = function () {
  selected = $("#product-filter-form input:checked");

  if (typeof selected !== 'undefined' && selected.length > 0) {
    var preConfiguredFilters = getPreConfiguredFilters();

    if (preConfiguredFilters != null && preConfiguredFilters.length > 0) {
      for (i = 0; i < selected.length; i++) {
        if (preConfiguredFilters.indexOf(selected[i].id) > -1) {
          selected[i].style.display = "none";
          selected[i].closest("div.checkbox").style.display = "none"; //disable and dont display the preselected filter so that user can not see and uncheck it.

          selected[i].disabled = true;
          hiddenFilters = true;
        }
      }
    }
  }
};
/*
This method returns the filters from the request URL.
*/


window.getPreConfiguredFilters = function () {
  var attributes = null;
  var preConfiguredFilters = $.urlParam('productfilters');

  if (preConfiguredFilters != null) {
    attributes = preConfiguredFilters.split(',');
  }

  return attributes;
};

$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

  if (results == null) {
    return null;
  } else {
    return results[1] || 0;
  }
};
/*
 * This method checks if the filter which we are going to disabled due to zero product count present in filter cookie.
 */


window.isFilterInCookie = function (filterId) {
  var result = false;
  var obj = filterCookie.get();

  if (typeof obj != "undefined" && obj != "undefined") {
    var objJSON = $.parseJSON(obj);
    $.each(objJSON, function (i, item) {
      if (item.id == filterId) {
        result = true;
      }
    });
  }

  return result;
};
/*
 * This method will add filters which exist in cookie but not present on the page back to cookie.
 * We hide and disable filters which do not have product associated with filter i.e. filter with zero product count.
 */


window.addDisabledFilters = function (cookieJsonObj) {
  var obj = cookieJsonObj;
  var previousSelections = $("[data-selected-filters]");

  for (i = 0; i < previousSelections.length; i++) {
    var element = previousSelections[i];
    var item = {};
    item["id"] = element.id;
    obj.push(item);
  }

  return obj;
};

window.getProductFavoritesCount = function () {
  var prodFavCount = 0;

  for (i = 0; i < productList.items.length; i++) {
    if (productList.items[i]._values.filter != null && productList.items[i]._values.filter.indexOf('favorites') != -1) {
      prodFavCount++;
    }
  }

  return prodFavCount;
};

function tabbingCustomization() {
  setTimeout(function () {
    if ($('.product-grid button.add-cta:not(.disabled)').css('display') == 'none') {
      $('.product-grid input.input-lg:not(.disabled)').first().select();
      $('.product-grid button.add-cta:not(.disabled), .product-grid input.input-lg:not(.input-lg.disabled), .product-grid button.lower-qty, .product-grid button.add-qty:not(.add-qty.disabled)').attr('tabindex', function (index, attr) {
        return index + 1;
      });
    } else {
      $('.product-grid button.add-cta:not(.disabled)').first().focus();
      $('.product-grid button.add-cta:not(.disabled), .product-grid input.input-lg:not(.input-lg.disabled), .product-grid button.lower-qty, .product-grid button.add-qty:not(.add-qty.disabled)').attr('tabindex', function (index, attr) {
        return index + 1;
      });
    }

    $('#food-grid div.product:visible:first').find('.qty').first().select();
  }, 2500);
}
/******/ })()
;