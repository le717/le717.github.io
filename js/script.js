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

  // Add the box to the page
  var announcementBox = '<div class="announcement"><a title="Click to dismiss message"></a></div>';
  $("body").append(announcementBox);

  // Add the message
  $(".announcement a").html(message);

  // Trigger the fade-in transitions
  $(".announcement").css("display", "block");
  $(".announcement").css("transform", "translate3d(0, 220px, 0)");
}


$(".announcement").on("click", function() {
  "use strict";
  /* Hide announcement box */
  $(".announcement").css("opacity", "0");

  // Make it where the box does not effect any elements after it is hidden
  $(".announcement").bind("transitionend", function(e) {
    if (e.originalEvent.propertyName === "opacity") {
      $(".announcement").css("display", "none");
    }
  });
});


function detectBrowser() {
  "use strict";
  /* Detect incompatible or unsupported browser
   * and display message to that extent.
   */

  var finalMessage, theBrowser, theBrowserMessage;

  // This is Safari 5 or lower
  if ($.browser.safari && $.browser.versionNumber <= 5) {
    theBrowser = "Safari";
    theBrowserMessage = "Your Safari version does not support my site. " +
    "Please visit browsehappy.com to research a modern browser.";

  } else if ($.browser.msie && $.browser.versionNumber <= 9) {
    // This is Internet Explorer 9 or lower
    theBrowser = "Internet Explorer";
    theBrowserMessage = "Your browser does not support my site. " +
    "Please visit browsehappy.com to research a modern browser.";

    // IE 9 does not like the text-shadow
    $("#announcement a").css("color", "black");

  } else if (!$.browser.chrome && !$.browser.mozilla && !$.browser.msie && !$.browser.opr && !$.browser.cros) {
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
  finalMessage = 'You are using<br>{0}.<br>{1}'.format(theBrowser, theBrowserMessage);

  // Make the announcement if there is one to make
  if (theBrowser !== undefined) {
    makeAnnouncement(finalMessage);
  }
}


$(function() {
  "use strict";
  // Run process to detect visitor's browser
  detectBrowser();

  // IE renders SVGs at half their proper size
  // Fix that by doubling their width and height
  if ($.browser.msie) {
    var $myLogo = $(".my-logo");
    $myLogo.width($myLogo.width() * 2);
    $myLogo.height($myLogo.widheightth() * 2);
  }

  // Hide text on mobile browsers until I can work on them
  if ($.browser.mobile) {
    $("#subpages").css("display", "none");
    $("#subsites").css("display", "none");
  }

  // Fully center the items that need centering
  var $centered = $(".centered");
  $centered.css("margin-left", -$centered.width() / 2);
  $centered.css("margin-top", -$centered.height() / 2);

//  // Get date of last commit using GitHub Pages API
//  $.getJSON("https://api.github.com/repos/le717/le717.github.io", function(data) {
//      var lastUpdate = data.updated_at.replace(/(T(.*))$/g, "");
//      //var lastUpdate = "Right now";
//      $("#last-update").text("Last update: {0}".format(lastUpdate));
//    });
});
