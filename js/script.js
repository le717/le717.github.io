/*
  Created 2014 Triangle717
  <http://Triangle717.WordPress.com/>

  Licensed under The MIT License
  <http://opensource.org/licenses/MIT/>
*/


function hideBrowserBox() {
  "use strict";
  /* Hide the browser box */
  // Trigger the fade-out transition
  $("#yourBrowser").css("opacity", "0");
}


function detectBrowser() {
  "use strict";
  /* Detect the user's web browser and display message */
  var theBrowser, theBrowserLogo,
      $theBrowserVersion = $.browser.versionNumber,
      showPanel = false,

      // Default compatibility message
      theBrowserMessage = "You should be able to view my site error free!<br>",

      // Message to display for incompatible browser
      theBrowserMessageError = "You might experience some issues while browsing my site. " +
      "If you do, please report them for me to fix.";

  if ($.browser.safari) {
    // This is Safari
    theBrowser = "Apple Safari";
    theBrowserLogo = "img/safari.png";
    theBrowserMessage = theBrowserMessageError;
    showPanel = true;

    // Display error message for Safari 5 and below
    if ($theBrowserVersion <= 5) {
      theBrowserMessage = "Your version of Safari does not support my site. " +
      "Please visit browsehappy.com to research a modern browser.";
    }

  } else if ($.browser.msie) {
    // This is Internet Explorer
    // TODO IE11 on Windows 7 is broken, but IE11 on Win8.1 works? Huh?
    // Display error message on IE 9 and below
    if ($theBrowserVersion <= 9) {
      theBrowser = "Internet Explorer";
      theBrowserLogo = "img/ie.png";
      theBrowserMessage = "Your version of IE does not support my site. " +
      "Please visit browsehappy.com to research a modern browser.";
      showPanel = true;
    }

  } else if (!$.browser.chrome && !$.browser.mozilla && !$.browser.opr) {
    // Some other browser
    theBrowser = "An Unidentified Browser";
    $theBrowserVersion = "";
    theBrowserLogo = "img/globe-blue.png";
    theBrowserMessage = "Please submit an issue on GitHub with compatibility results. :)";
    showPanel = true;
  }

  // Insert message and browser logo
  if (showPanel) {
      /* jshint ignore:start */
      $("#yourBrowser a").append('You are using<br>{0} {1}.<br>{2}<br><img alt="{0}" width="90" height="90" src="{3}" />'.format(
     theBrowser, $theBrowserVersion, theBrowserMessage, theBrowserLogo));
      /* jshint ignore:end */

    // Trigger the fade-in transitions
    $("#yourBrowser").css("transform", "translate3d(0, -230px, 0)");
  }
}

$(function() {
  "use strict";
  // Run process to detect visitor's browser
  detectBrowser();

  // Workaround for Ionicons XSS exception from their CDN on all browsers but Chrome
  if (!$.browser.chrome) {
    $("#gh-button").removeClass("icon");
    $("#gh-button").removeClass("ion-social-github");
    $("#gh-button").css("display", "inline-block");
    $("#gh-button").append('<img width="50" height="50" />');
    $("#gh-button img").attr("src", "img/ion-social-github.png");
  }

//  // Get date of last commit using GitHub Pages API
//  $.getJSON("https://api.github.com/repos/le717/le717.github.io",
//    function(data) {
//      var lastUpdate = data.updated_at.replace(/(T(.*))$/g, "");
//      //var lastUpdate = "Right now";
//      $("#last-update").text("Last update: {0}".format(lastUpdate));
//    }, "json");
});
