/*
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
      $("html, body").animate({scrollTop: 0}, 500);
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
  });
})(jQuery);
