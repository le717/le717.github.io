(function($) {
  "use strict";
  // TODO  Testing
  window.similarproducts = {};

  // From https://paste.ee/p/y1RvZ and https://justgetflux.com/
  var ccounter = 0;
      check_lenovo_iv = setInterval(checkLenovo, 2000);

  function checkLenovo() {
    ccounter++;
    if (window.similarproducts) { // this variable is defined as soon as the malicious payload from Superfish is injected into the DOM
      // display a warning to your visitor that they've been hacked by Lenovo

      $(".page-wrapper").append("{% include lenovo.html %}");

      // ok let's do this:
//      setTimeout(function() {
//        window.location.href = "http://news.lenovo.com/images/20034/remove-superfish-instructions.pdf";
//      }, 1500);
    }

    if (ccounter > 20) clearInterval(check_lenovo_iv);
  }

  $(".lenovo .btn.close").on("click", function() {
    $(".lenovo").remove();
  });
})(jQuery);
