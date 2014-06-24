/**
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


(function($) {
  "use strict";

  /**
   * Show sidebar once button is clicked/tapped
  */
  (function() {
    $(".sidebar-btn").on("click", function() {
      $(".sidebar").toggleClass("sidebar-hidden");
      $(".sidebar-btn").toggleClass("sidebar-btn-rotate");
    });
  })();

  /**
   * Scroll to top button
   * Based on example from
   * http://briancray.com/posts/scroll-to-top-link-jquery-css/
   */
  $(function() {
    $(window).scroll(function() {
      // Show the scroll up button
      if ($(window).scrollTop() > 100) {
        $(".scroll-up").css("transform", "translate3d(0, 0, 0)");

        // Hide the button
      } else {
        $(".scroll-up").css("transform", "");
      }
    });

    // Scroll up button action
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
        $("#featured-project-name").wrap("<a target='_blank' href='{0}'></a>".format(
          data.featuredProject[0].url));

        // Add the version and description
        $("#featured-project-version").html(data.featuredProject[0].version);
        $("#featured-project-desc").html(" " + data.featuredProject[0].description);

        // Open links in featured descriptions in a new tab/window
        $("#featured-project-desc, #featured-code-desc").find("a").each(function() {
          var $this = jQuery(this);
          $this.attr("target", "_blank");
        });
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
  });
})(jQuery);
