/*
 * Created 2014-2015 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


(function($) {
  "use strict";
  $(function() {
    $.each($(".project-item h1"), function(i, ele) {
      var $this  = $(ele),
          anchor = $this.parent().attr("id");
      $this.append("<a class='fa fa-link perma-anchor' href='#" + anchor + "'></a>");
    });

    // Add text to Project WIP label
    $(".project-wip").wrap("<div class='text-center'/>")
                     .html("Work in Progress");
  });
})(jQuery);
