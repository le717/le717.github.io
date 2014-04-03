/*
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


function makeAnnouncement(message) {
  "use strict";
  /* Show announcement box */
  $("#announcement a").html(message);

  // Trigger the fade-in transitions
  $("#announcement").css("display", "block");
  $("#announcement").css("transform", "translate3d(0, -220px, 0)");
}


$("#announcement").on("click", function() {
  "use strict";
  /* Hide announcement box */
  $("#announcement").css("opacity", "0");

  // Make it where the box does not effect any elements after it is hidden
  $("#announcement").bind("transitionend", function(e) {
    if (e.originalEvent.propertyName == "opacity") {
      $("#announcement").css("display", "none");
    }
  });
});


function detectBrowser() {
  "use strict";
  /* Detect incompatible or unsupported browser
   * and display message to that extent.
   */

  var finalMessage, theBrowser,
      // Default message to display for an incompatible browser
      theBrowserMessage = "You might experience some issues while browsing my site.";

  if ($.browser.safari) {
    // This is Safari
    theBrowser = "Safari";

    // Display error message for Safari 5 and below
    if ($.browser.versionNumber <= 5) {
      theBrowserMessage = "Your Safari version does not support my site. " +
      "Please visit browsehappy.com to research a modern browser.";
    }

  } else if ($.browser.msie) {
    // This is Internet Explorer
    // TODO IE11 on Windows 7 is broken, but IE11 on Win8.1 works? Huh?
    // Display error message on IE 9 and below
    if ($.browser.versionNumber <= 9) {
      theBrowser = "Internet Explorer";
      theBrowserMessage = "Your IE version does not support my site. " +
      "Please visit browsehappy.com to research a modern browser.";
    }

  } else if (!$.browser.chrome && !$.browser.mozilla && !$.browser.opr && !$.browser.cros) {
    // Some other browser
    theBrowser = "an unidentified browser";
    theBrowserMessage = "Please submit an issue on GitHub with compatibility results. :)";
  }

  else if ($.browser.mobile) {
    // Mobile browsers
    theBrowser = "a mobile browser";
    /* jshint ignore:start */
    theBrowserMessage = '<span class="text-bold">Triangle Land</span> is not yet optimized for mobile browsing.';
    /* jshint ignore:end */
  }

  // Create final message
  finalMessage = 'You are using<br>{0}<br>{1}'.format(theBrowser, theBrowserMessage);

  // Make the announcement if there is one to make
  if (finalMessage.length > 0) {
    makeAnnouncement(finalMessage);
  }
}


(function() {
  "use strict";
  // Run process to detect visitor's browser
  detectBrowser();

  // Replace the SVG with a PNG on IE (IE does not always like SVGs)
  if ($.browser.msie) {
    $(".my-logo").attr("src", "img/Triangle717-Logo.png");
  }

  if ($.browser.mobile) {
    // NOTE Hide text on mobile browsers until I can work on them
    $("#subpages").css("display", "none");
    $("#subsites").css("display", "none");
  }

//  // Get date of last commit using GitHub Pages API
//  $.getJSON("https://api.github.com/repos/le717/le717.github.io",
//    function(data) {
//      var lastUpdate = data.updated_at.replace(/(T(.*))$/g, "");
//      //var lastUpdate = "Right now";
//      $("#last-update").text("Last update: {0}".format(lastUpdate));
//    }, "json");
})();
