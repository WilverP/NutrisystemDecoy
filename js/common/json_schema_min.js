/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************************!*\
  !*** ./resources/js/common/json_schema_min.js ***!
  \************************************************/
var schemaContext = "https://schema.org/";
var pdpSchema = "pdp";
var plpSchema = "plp";
var homeSchema = "home";
var webSiteType = "WebSite";
var webPageType = "WebPage";
var productType = "Product";
var site = "www.nutrisystem.com";

function includePageSchema(b) {
  var a;

  if (b == pdpSchema) {
    if ($(".pr-snippet-stars-container").is(":visible")) {
      a = writePDPPageDetails();
      writeToResponse(a);
      a = writePDPJsonDetails();
      writeToResponse(a);
    } else {
      setTimeout(includePageSchema, 50, pdpSchema);
    }
  } else {
    if (b == plpSchema) {
      a = writeJsonDetails(b);
      writeToResponse(a);
    } else {
      if (b == homeSchema) {
        a = writeJsonDetails(b);
        writeToResponse(a);
      }
    }
  }
}

function writeToResponse(a) {
  if (a != null && a != undefined) {
    var b = document.createElement("script");
    b.type = "application/ld+json";
    b.text = JSON.stringify(a);
    document.querySelector("head").appendChild(b);
  }
}

function writeJsonDetails(b) {
  var c = {};
  c["@context"] = schemaContext;

  if (b == homeSchema) {
    c["@type"] = webSiteType;
  } else {
    if (b == plpSchema) {
      c["@type"] = webPageType;
    }
  }

  c.name = $("title").first().text();
  c.image = $("header .middle-bar img").attr("src");
  c.description = $('meta[name="description"]').attr("content");
  c.url = $("link[rel=canonical]").attr("href");

  if (b == plpSchema) {
    var e = {};
    var a = new Array();
    var d = $(".breadcrumb li");
    d.each(function (h) {
      var g = {};
      var f = {};
      g["@type"] = "ListItem";
      g.position = h + 1;
      f["@id"] = $(this).find("a").attr("href");
      f.name = $(this).text();
      g.item = f;
      a.push(g);
    });
    e["@type"] = "BreadcrumbList";
    e.itemListElement = a;
    c.breadcrumb = e;
  }

  return c;
}

function writePDPPageDetails() {
  var d = {};
  var b = {};
  var a = {};
  d["@context"] = schemaContext;
  d["@type"] = webPageType;
  d.name = $("title").first().text();
  d.image = $("#tImage1 img").attr("src");
  d.description = $('meta[name="description"]').attr("content");
  d.url = $("link[rel=canonical]").attr("href");
  var f = {};
  var c = new Array();
  var e = $(".breadcrumb li");
  e.each(function (i) {
    var h = {};
    var g = {};
    h["@type"] = "ListItem";
    h.position = i + 1;
    var j = $(this).find("a").attr("href");

    if (j != undefined && j.indexOf(".com") == -1) {
      j = site + $(this).find("a").attr("href");
    }

    g["@id"] = j;
    g.name = $(this).text();
    h.item = g;
    c.push(h);
  });
  f["@type"] = "BreadcrumbList";
  f.itemListElement = c;
  d.breadcrumb = f;
  return d;
}

function writePDPJsonDetails() {
  var i = {};
  var l = {};
  var m = {};
  i["@context"] = schemaContext;
  i["@type"] = productType;
  i.name = $("title").first().text();
  i.image = $("#tImage1 img").attr("src");
  i.description = $('meta[name="description"]').attr("content");
  i.url = $("link[rel=canonical]").attr("href");
  var g = $(".product-info .price").text();

  if (g != "") {
    var j = {};
    j["@type"] = "offer";
    var f = g.split("$");

    if (f.length > 1) {
      j.price = f[1].trim();
      j.priceCurrency = "USD";
    }

    i.offers = j;
  }

  l["@type"] = "aggregateRating";
  var b = $("#pr-reviewsnippet .pr-snippet-rating-decimal").text();

  if (b.trim() == "0.0") {
    l.ratingValue = "0.0 Reviews";
  } else {
    l.ratingValue = $("#pr-reviewsnippet .pr-snippet-rating-decimal").text();
  }

  l.bestRating = "5.0";
  var d = $("#pr-reviewsnippet .pr-snippet-review-count").text().replace(/Reviews/g, "");

  if (d.trim() == "No") {
    l.ratingCount = "0.0 Reviews";
  } else {
    l.ratingCount = d.trim();
  }

  i.aggregateRating = l;
  var a = $("#pr-review-display .pr-review");
  var h = new Array();
  a.each(function () {
    var n = {};
    var o = {};
    n["@type"] = "Review";
    n.author = $(this).find(".pr-rd-details.pr-rd-author-nickname").text();
    n.datePublished = $(this).find(".pr-rd-details.pr-rd-author-submission-date").find("time").attr("datetime");
    n.name = $(this).find(".pr-rd-review-headline").text();
    n.description = $(this).find(".pr-rd-description-text").text();
    o["@type"] = "Rating";
    o.bestRating = "5.0";
    o.ratingValue = $(this).find(".pr-snippet-rating-decimal").text();
    o.worstRating = "1.0";
    n.reviewRating = o;
    h.push(n);
  });
  var c = {
    "calories-amt": "calories",
    "Total Fat": "fatContent",
    "Saturated Fat": "saturatedFatContent",
    Trans: "transFatContent",
    Cholesterol: "cholesterolContent",
    Sodium: "sodiumContent",
    "Total Carbohydrate": "carbohydrateContent",
    "Dietary Fiber": "fiberContent",
    "Total Sugars": "sugarContent",
    Protein: "proteinContent"
  };
  var e = ["calories-amt", "Total Fat", "Saturated Fat", "Trans Fat", "Cholesterol", "Sodium", "Total Carbohydrate", "Dietary Fiber", "Total Sugars", "Protein", "Vitamin D", "Calcium", "Iron", "Potassium"];
  var k = $(".nutrition-facts-table-update").find("td");
  $.each(k, function (p, o) {
    if (o.className.indexOf("calories-amt") != -1) {
      i.calories = o.textContent.trim();
    }

    var n = $(o).contents();

    if (n != null && n != undefined) {
      $.each(n, function (q, r) {
        if (r != undefined && r != null) {
          $.each(c, function (s, v) {
            var u;

            if (r.textContent == s) {
              u = c[s];
              i[u] = n[q].textContent.trim() + n[q + 1].textContent;
            } else {
              if (r.textContent.indexOf(s) != -1) {
                var t = r.textContent.split(s);

                if (t.length > 1) {
                  u = c[s];
                }

                i[c[s]] = r.textContent.trim();
              }
            }
          });
        }
      });
    }
  });
  i.review = h;
  return i;
}

;
/******/ })()
;