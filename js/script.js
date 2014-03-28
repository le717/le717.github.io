/*
  Created 2014 Triangle717
  <http://Triangle717.WordPress.com/>

  Licensed under The MIT License
  <http://opensource.org/licenses/MIT/>
*/

var $userBrowser = $("#yourBrowser");


function hideBrowserBox() {
  "use strict";
  /* Hide the browser box */
  // Trigger the fade-out transition
  $userBrowser.css("opacity", "0");
}


function detectBrowser() {
  "use strict";
  /* Detect the user's web browser and display message */
  var theBrowser, theBrowserLogo,
      $theBrowserVersion = $.browser.versionNumber,

      // Default compatibility message
      theBrowserMessage = "You should be able to view my site error free!<br>",

      // Message to display for incompatible browser
      theBrowserMessageError = "You might experience some issues while browsing my site. " +
      "If you do, please report them for me to fix.";

  // This is Google Chrome
  if ($.browser.chrome) {
    theBrowser = "Google Chrome";
    theBrowserLogo = "img/chrome.png";

  } else if ($.browser.mozilla) {
    // This is Mozilla Firefox
    theBrowser = "Mozilla Firefox";
    theBrowserLogo = "img/firefox.png";

  } else if ($.browser.safari) {
    // This is Safari
    theBrowser = "Apple Safari";
    theBrowserLogo = "img/safari.png";
    theBrowserMessage = theBrowserMessageError;

    // Display error message for Safari 5 and below
    if ($theBrowserVersion <= 5) {
      theBrowserMessage = "Your version of Safari does not support my site. " +
      "Please visit browsehappy.com to research a modern browser.";
    }

  } else if ($.browser.opr) {
    // This is Opera
    theBrowser = "Opera";
    theBrowserLogo = "img/opera.png";

  } else if ($.browser.msie) {
    // This is Internet Explorer
    theBrowser = "Internet Explorer";
    theBrowserLogo = "img/ie.png";

    //TODO IE11 on Windows 7 is broken, but IE11 on Win8.1 works? Huh?
    // Display error message for IE 9 and below
    if ($theBrowserVersion <= 9) {
      theBrowserMessage = "Your version of IE does not support my site. " +
      "Please visit browsehappy.com to research a modern browser.";
    }

  } else {
    // Some other browser
    theBrowser = "An Unidentified Browser";
    $theBrowserVersion = "";
    theBrowserLogo = "img/globe-blue.png";
    theBrowserMessage = "If you will, please submit an issue on GitHub with compatibility " +
        "results so I can develop for this browser.";
  }

    // Insert message and browser logo
    /* jshint ignore:start */
    $("#yourBrowser a").append('You are using<br>{0} {1}.<br>{2}<br><img alt="{0}" width="90" height="90" src="{3}" />'.format(
   theBrowser, $theBrowserVersion, theBrowserMessage, theBrowserLogo));
    /* jshint ignore:end */

  // Trigger the fade-in transitions
  $userBrowser.css("transform", "translateY(-230px)");
}

$(function() {
  // Run function to detect visitor's browser
  detectBrowser();

//  // Get date of last commit using GitHub Pages API
//  $.getJSON("https://api.github.com/repos/le717/le717.github.io",
//    function(data) {
//      var lastUpdate = data.updated_at.replace(/(T(.*))$/g, "");
//      //var lastUpdate = "Right now";
//      $("#last-update").text("Last update: {0}".format(lastUpdate));
//    }, "json");
});
