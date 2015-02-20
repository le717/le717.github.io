(function($) {
  "use strict";
  // From https://paste.ee/p/y1RvZ and https://justgetflux.com/
  // Modified by le717

  // TODO Testing
  window.similarproducts = {};

  function checkLenovo() {
    if (window.similarproducts) { // this variable is defined as soon as the malicious payload from Superfish is injected into the DOM
      // display a warning to your visitor that they've been hacked by Lenovo
      $(".page-wrapper").prepend("{% include lenovo.html %}");
    }
  }

  $(".lenovo .btn.close").on("click", function() {
    $(".lenovo").remove();
  });

  window.setTimeout(checkLenovo, 5000);
})(jQuery);
