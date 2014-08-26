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
    $(".btn-navbar").on("click", function() {
      $(".navbar").toggleClass("navbar-hidden");
      $(".btn-navbar").toggleClass("btn-navbar-rotate");
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
      // Hide non-mobile-ready elements
//      $(".navbar").addClass("navbar-hidden");
//      $(".btn-navbar").removeClass("btn-navbar-rotate");
    }

    // Fully center the items that need centering
    var $centered = $(".fully-centered");
    $centered.css({"margin-left": -$centered.width() / 2, "margin-top": -$centered.height() / 2});

    // Add text to WIP label
    $(".portfolio-wip").html("Work in Progress");

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
          $(this).attr("target", "_blank");
        });
      }
    });
  });
})(jQuery);
