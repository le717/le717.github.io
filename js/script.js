/*
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


(function() {
  "use strict";
  /* Show sidebar once button is clicked/tapped */
  $(".sidebar-btn").on("click", function() {
    $(".sidebar").toggleClass("sidebar-hidden");
    $(".sidebar-btn").toggleClass("sidebar-btn-rotate");
  });

  /*$(window).resize(function() {
    if (($(window).width() >= 320 || $(window).width() <= 320) && $(window).width() <= 720) {
      $("#sidebar-btn").addClass("sidebar-btn-visible");
      $("#sidebar").addClass("sidebar-hidden");

    } else {
      $("#sidebar-btn").removeClass("sidebar-btn-visible");
      $("#sidebar").removeClass("sidebar-hidden");
    }
  });*/
})();

function shrinkImages() {
  "use strict";
  /* Resize images on mobile devices */

  $("body").find("img").each(function() {
    var $this = $(this),
    $imgWidth = $this.width();

    // If this is a mobile browser, scale down non-exempt image sizes
//    if ($.browser.mobile || $.browser.desktop) {
    if ($.browser.mobile) {
      if (!$this.hasClass("no-mobile-resize") && !$this.hasClass("emoji")) {

        // However, do it only if the image is wider than the screen
//        console.log("Image width: " + $imgWidth);
//        console.log("Image src: " + $this.attr("src"));
//        console.log("Window Width: " + $(window).width());
//        console.log($(window).width() % $imgWidth >= 100);

        if ($imgWidth % $imgWidth >= 50) {
          $this.width($imgWidth - ($imgWidth / 2));
        }
      }
    }
  });
}


$(function() {
  "use strict";

  //http://briancray.com/posts/scroll-to-top-link-jquery-css/

  shrinkImages();

  // Replace the SVG with a PNG on IE (IE HATES SVGs)
  if ($.browser.msie) {
    var $imgSrc = $(".ie-svg").attr("src");
    $(".ie-svg").attr("src", $imgSrc.substr(0, $imgSrc.length - 3) + "png");
  }

  // Scroll to top button
  $(".scroll-up").on("click", function() {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  // Mobile-only actions
  if ($.browser.mobile) {
    // Hide not-mobile-ready elements
    $(".no-mobile").css("display", "none");
    $(".sidebar").addClass("sidebar-hidden");
    $(".sidebar-btn").removeClass("sidebar-btn-rotate");
  }

  // Fully center the items that need centering
  var $centered = $(".fully-centered");
  $centered.css("margin-left", -$centered.width() / 2);
  $centered.css("margin-top", -$centered.height() / 2);

  // Get the featured content feed
  $.ajax({
    dataType: "json",
    url: "/json/featured.json",
    success: function(data) {

      // Display the featured code snippet
      $("#featured-code-box").css("display", "block");
      $("#featured-code-box").html(data.featuredCode[0].snippet);
      $("#featured-code-desc").html(data.featuredCode[0].description);

      // Display the featured project
      $("#featured-project-name").html(data.featuredProject[0].name);
      $("#featured-project-name").wrap(
        "<a target='_blank' href='{0}'></a>".format(data.featuredProject[0].url));

      $("#featured-project-version").html(data.featuredProject[0].version);
      $("#featured-project-desc").html(" " + data.featuredProject[0].description);
    }
  });


  /* ------- Spoiler handling ------- */


  var spoilerHeights = [],
      spoilerID      = 0,
      spoilerBtnID   = 0,
      $spoilerClass  = $(".spoiler");

  // Add IDs to each spoiler
  $spoilerClass.each(function(index, value) {
    $(value).attr("id", "spoiler-" + spoilerID);
    spoilerID += 1;

    // Get the height of the content to be spoilered now,
    // as once we hide the text it cannot be restored.
    // Add 5px for a bit of extra space to prevent text getting cutting off
    spoilerHeights.push(parseInt($(value).css("height").slice(0, -2)) + 5 + "px");
  });

  // Add the toggle button (we need it for this to even work :P)
  $spoilerClass.before("<div class='spoiler-btn'><span>Spoiler</span></div>");

  // Add matching IDs to each toggle button
  $(".spoiler-btn").each(function(index, value) {
    $(value).attr("id", "spoiler-btn-" + spoilerBtnID);
    spoilerBtnID += 1;
  });

  // Now that we have the height, hide the text
  $spoilerClass.css("height", "0");

  $(".spoiler-btn").on("click", function() {
    // Get the ID for the clicked spoiler button so only that one is triggered
    var thisSpoilerID = "#" + $(this).attr("id").replace(/-btn/, ""),
        thisSpoilerNumber = thisSpoilerID.slice(thisSpoilerID.length - 1),
        $thisSpoiler  = $(thisSpoilerID);

    // Upon clicking the spoiler button,
    // if the content is hidden, reveal it.
    // Otherwise, hide it.
    if ($thisSpoiler.hasClass("spoiler-shown")) {
      $thisSpoiler.css("height", "0");
    } else {
      $thisSpoiler.css("height", spoilerHeights[thisSpoilerNumber]);
    }
    $thisSpoiler.toggleClass("spoiler-shown");
    $(this).toggleClass("spoiler-btn-active");
  });

//  // Get date of last commit using GitHub Pages API
//  $.getJSON("https://api.github.com/repos/le717/le717.github.io", function(data) {
//      var lastUpdate = data.updated_at.replace(/(T(.*))$/g, "");
//      //var lastUpdate = "Right now";
//      $("#last-update").text("Last update: {0}".format(lastUpdate));
//    });
});
