/*
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */

function showSidebar() {
  "use strict";

  if ($("#sidebar").css("transform") === "matrix(1, 0, 0, 1, 0, 0)") {
    $("#sidebar").css("transform", "");
  } else {
    $("#sidebar").css("transform", "translate3d(0, 0, 0)");
  }
}


function makeAnnouncement(message) {
  "use strict";
  /* Show announcement box */

  // Add the box to the page only if one does not exist already
  var announcementBox = '<div class="announcement" onclick="hideAnnouncement();"><a></a></div>';
  if ($("body").find(".announcement").length !== 1) {
    $("body").append(announcementBox);

    // Add the message
    $(".announcement a").html(message);

    // Trigger the fade-in transitions
    $(".announcement").css("display", "block");
    $(".announcement").css("transform", "translate3d(0, 220px, 0)");
  }
}

function hideAnnouncement() {
  "use strict";
  /* Hide announcement box */
  $(".announcement").addClass("fadeout-ani");
}


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
    $(".announcement a").css("color", "black");

  } else if (!$.browser.chrome && !$.browser.mozilla &&
             !$.browser.msie&& !$.browser.opr && !$.browser.cros) {
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

function shrinkImages() {
  "use strict";
  /* Resize images on mobile devices */

  $(postContainer).find("img").each(function() {
    var $this = $(this);

    // If this is a mobile browser, third designated image sizes
    if (!$this.hasClass("no-mobile-resize")) {
      if ($.browser.mobile) {
        $this.width($this.width() / 3);
        $this.height($this.height() / 3);
      }
    }
  });
}


$(function() {
  "use strict";
  // Shrink images on mobile and run process
  // to detect visitor's browser
  shrinkImages();
  detectBrowser();

  // Replace the SVG with a PNG on IE (IE HATES SVGs)
  if ($.browser.msie) {
    var $imgSrc = $(".loading-ani, .my-logo").attr("src");
    $(".loading-ani, .my-logo").attr("src", $imgSrc.substring(0, $imgSrc.length - 3) + "png");
  }

  // Hide non-mobile-ready elements
  if ($.browser.mobile) {
    $(".no-mobile").css("display", "none");
  }

  // Fully center the items that need centering
  var $centered = $(".fully-centered");
  $centered.css("margin-left", -$centered.width() / 2);
  $centered.css("margin-top", -$centered.height() / 2);

//  // Get date of last commit using GitHub Pages API
//  $.getJSON("https://api.github.com/repos/le717/le717.github.io", function(data) {
//      var lastUpdate = data.updated_at.replace(/(T(.*))$/g, "");
//      //var lastUpdate = "Right now";
//      $("#last-update").text("Last update: {0}".format(lastUpdate));
//    });
});
