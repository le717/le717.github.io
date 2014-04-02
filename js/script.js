/*
  Created 2014 Triangle717
  <http://Triangle717.WordPress.com/>

  Licensed under The MIT License
  <http://opensource.org/licenses/MIT/>
*/


$("#yourBrowser").on("click", function() {
  "use strict";
  /* Hide the browser ID box */
  $("#yourBrowser").css("opacity", "0");
  $("#yourBrowser").bind("transitionend", function(e) {
    if (e.originalEvent.propertyName == "opacity") {
      $("#yourBrowser").css("display", "none");
      $("#yourBrowser a").css("display", "none");
    }
  });
});


function detectBrowser() {
  "use strict";
  /* Detect visitor's web browser and display message accordingly */
  var theBrowser,
      $theBrowserVersion = $.browser.versionNumber,
      showPanel = false,

      // Default compatibility message
      theBrowserMessage = "You should be able to view my site error free!",

      // Message to display for incompatible browser
      theBrowserMessageError = "You might experience some issues while browsing my site.";

  if ($.browser.safari) {
    // This is Safari
    theBrowser = "Safari";
    theBrowserMessage = theBrowserMessageError;
    showPanel = true;

    // Display error message for Safari 5 and below
    if ($theBrowserVersion <= 5) {
      theBrowserMessage = "Your Safari version does not support my site. " +
      "Please visit browsehappy.com to research a modern browser.";
    }

  } else if ($.browser.msie) {
    // This is Internet Explorer
    // TODO IE11 on Windows 7 is broken, but IE11 on Win8.1 works? Huh?
    // Display error message on IE 9 and below
    if ($theBrowserVersion <= 9) {
      theBrowser = "Internet Explorer";
      theBrowserMessage = "Your IE version does not support my site. " +
      "Please visit browsehappy.com to research a modern browser.";
      showPanel = true;
    }

  } else if (!$.browser.chrome /*&& !$.browser.mozilla*/ && !$.browser.opr && !$.browser.cros) {
    // Some other browser
    theBrowser = "an unidentified browser";
    $theBrowserVersion = "";
    theBrowserMessage = "Please submit an issue on GitHub with compatibility results. :)";
    showPanel = true;
  }

  else if ($.browser.mobile) {
    // Mobile browsers
    theBrowser = "a mobile browser";
    $theBrowserVersion = "";
    theBrowserMessage = '<span class="text-bold">Triangle Land</span> is not yet optimized for mobile browsers.';
    showPanel = true;
  }

  // Insert message and browser logo
  if (showPanel) {
      /* jshint ignore:start */
      $("#yourBrowser a").append('You are using<br>{0} {1}.<br>{2}'.format(
     theBrowser, $theBrowserVersion, theBrowserMessage));
      /* jshint ignore:end */

    // Trigger the fade-in transitions
    $("#yourBrowser").css("display", "block");
    $("#yourBrowser").css("transform", "translate3d(0, -220px, 0)");
  }
}

(function() {
  "use strict";
  // Run process to detect visitor's browser
  detectBrowser();

  // Replace the SVG with a PNG on IE (IE does not always like SVGs)
  if ($.browser.msie) {
    $("#my-logo").attr("src", "img/Triangle717-Logo.png");
  }

//  // Get date of last commit using GitHub Pages API
//  $.getJSON("https://api.github.com/repos/le717/le717.github.io",
//    function(data) {
//      var lastUpdate = data.updated_at.replace(/(T(.*))$/g, "");
//      //var lastUpdate = "Right now";
//      $("#last-update").text("Last update: {0}".format(lastUpdate));
//    }, "json");
})();
