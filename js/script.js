/*
 * Created 2014-2015 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


(function($) {
  "use strict";
  /**
   * Scroll to top button.
   */
  function toggleScrollUp() {
    var QbtnScrollUp = document.querySelector(".btn-scroll-up");
    (window.scrollY >= 100) ? QbtnScrollUp.style.opacity = "1" : QbtnScrollUp.style.opacity = "";
  }

  $(function() {
    // Show/hide the scroll to top button
    toggleScrollUp();
    window.addEventListener("scroll", toggleScrollUp);

    // Scroll up button action
    $(".btn-scroll-up").on("click", function() {
      $("html, body").animate({scrollTop: 0}, 500, "easeInOutQuad");
    });

    // Fully center the items that need centering
    var $centered = $(".fully-centered");
    $centered.css({"margin-left": -$centered.width() / 2, "margin-top": -$centered.height() / 2});

    // Add text to Project WIP label
    $(".project-wip").wrap("<div class='text-center'/>")
                     .html("Work in Progress");
  });
})(jQuery);
