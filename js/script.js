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
    (window.pageYOffset >= 100) ? QbtnScrollUp.classList.add("visible") : QbtnScrollUp.classList.remove("visible");
  }

  $(function() {
    // Show/hide the scroll to top button
    toggleScrollUp();
    window.addEventListener("scroll", toggleScrollUp);

    // Scroll up button action
    $(".btn-scroll-up").on("click", function() {
      $("html, body").animate({scrollTop: 0}, 500, "easeInOutQuad");
    });

    $.each($(".project-item h1"), function(i, ele) {
      var $this  = $(ele),
          anchor = $this.parent().attr("id");
      $this.append("<a class='fa fa-link perma-anchor' href='#" + anchor + "'></a>");
    });

    // Add text to Project WIP label
    $(".project-wip").wrap("<div class='text-center'/>")
                     .html("Work in Progress");
  });

  var QbtnEmail    = document.querySelector(".contact-email"),
      QemailDialog = document.querySelector("#diag-email-wrapper");

  QbtnEmail.addEventListener("click", function() {
    QemailDialog.classList.add("fade-in");
  });

  // TODO proper closing
  document.querySelector("#form-email .btn.cancel").addEventListener("click", function() {
    if (QemailDialog.classList.contains("fade-in")) {
      QemailDialog.classList.remove("fade-in");
      QemailDialog.classList.add("fade-out");
    }
  });

  QemailDialog.addEventListener("animationend", function(e) {
    console.log(e);
    if (e.animationName === "fade-out") {
      QemailDialog.classList.remove(e.animationName);
    }
  });

})(jQuery);
