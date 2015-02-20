---
---

(function($) {
  "use strict";
  // From https://paste.ee/p/y1RvZ and https://justgetflux.com/
  // Modified by le717

  function checkLenovo() {
    // This variable is defined as soon as the malicious payload from Superfish is injected into the DOM
    if (window.similarproducts) {
      // Display a warning to your visitor that they've been hacked by Lenovo
      $(".page-wrapper").prepend('{% include lenovo-min.html %}');

      // Add button listeners
      setTimeout(function() {
        $(".lenovo .btn.remove").on("click", function() {
          window.location.href = "https://lastpass.com/superfish/";
        });

        $(".lenovo .btn.close").on("click", function() {
          $(".lenovo").remove();
        });
      }, 1);
    }
  }

  window.setTimeout(checkLenovo, 5000);
})(jQuery);
