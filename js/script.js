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
   * Scroll to top button
   * Based on example from
   * http://briancray.com/posts/scroll-to-top-link-jquery-css/
   */
  function toggleScrollUp() {
    if ($(window).scrollTop() >= 100) {
      $(".btn-scroll-up").css("opacity", "1");
    } else {
      $(".btn-scroll-up").css("opacity", "");
    }
  }

  $(function() {
    // NOTE Work around a weird bug affecting only the Projects page
    // where the button does not reappear when the page is scrolled
    // to visibility then reloaded.
    toggleScrollUp();
    $(window).scroll(function() {
      // Of course, call it when the page is scrolled too
      toggleScrollUp();
    });

    // Scroll up button action
    $(".btn-scroll-up").on("click", function() {
      $("html, body").animate({scrollTop: 0}, 1200, "easeInOutQuad");
    });

    // Fully center the items that need centering
    var $centered = $(".fully-centered");
    $centered.css({"margin-left": -$centered.width() / 2, "margin-top": -$centered.height() / 2});

    // Add text to Project WIP label
    $(".project-wip").wrap("<div class='text-center'/>")
                     .html("Work in Progress");

//    // Get the featured content feed
//    $.ajax({
//      dataType: "json",
//      url: "/json/featured.json",
//      success: function(data) {
//        // Display the featured code snippet
//        $("#featured-code-box").css("display", "block");
//        $("#featured-code-box").html(data.featuredCode[0].snippet);
//        $("#featured-code-desc").html(data.featuredCode[0].description);
//
//        // Display the featured project
//        $("#featured-project-name").html(data.featuredProject[0].name);
//        $("#featured-project-name").wrap("<a target='_blank' href='{0}'></a>".format(
//          data.featuredProject[0].url));
//
//        // Add the version and description
//        $("#featured-project-version").html(data.featuredProject[0].version);
//        $("#featured-project-desc").html(" " + data.featuredProject[0].description);
//
//        // Open links in featured descriptions in a new tab/window
//        $("#featured-project-desc, #featured-code-desc").find("a").each(function() {
//          $(this).attr("target", "_blank");
//        });
//      }
//    });
  });
})(jQuery);
