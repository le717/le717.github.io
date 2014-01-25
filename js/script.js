/*
    Created 2014 Triangle717
    <http://Triangle717.WordPress.com/>

    Licensed under The MIT License
    <http://opensource.org/licenses/MIT/>
*/

var yourBrowser = document.querySelector("#yourBrowser");

function stopAll() {
    "use strict";
    /* Stop the animation and display (pittyful) page contents */
    var aniOne = document.querySelector(".slide-ani");
    var aniTwo = document.querySelector(".rotate-ani");
    var racketAni = document.querySelector(".racket-ani");
    var waitLink = document.querySelector("#wait-link");
    var loadingText = document.querySelector("#loading p");
    var pageContent = document.querySelector("#subpages");
    var wrapper = document.querySelector("#wrapper");

    // Stop animations
    aniOne.style.animationPlayState = "paused";
    aniTwo.style.animationPlayState = "paused";
    racketAni.style.animationPlayState = "paused";

    // Stop animations on Webkit too (Grrr Chrome)
    aniOne.style.webkitAnimationPlayState = "paused";
    aniTwo.style.webkitAnimationPlayState = "paused";
    racketAni.style.webkitAnimationPlayState = "paused";

    // Hide animation elements
    waitLink.style.display = "none";
    wrapper.style.display = "none";

    // Display (lame) page contents
    pageContent.style.display = "table";
}


function hideBrowserBox() {
    "use strict";
    /* Hide the browser box */
    // Trigger the fade-out transition
    yourBrowser.style.opacity = "0";

    // Trigger the sliding transition
    yourBrowser.style.webkitTransform = "translateY(220px)";
    yourBrowser.style.transform = "translateY(220px)";
}


function detectBrowser() {
    "use strict";
    /* Detect the user's web browser and display message */
    var theBrowser,
        theBrowserLogo,
        usrAgent = navigator.userAgent,
        theBrowserVersion = $.browser.versionNumber,
        yourBrowserA = document.querySelector("#yourBrowser a"),
        // Default message
        theBrowserMessage = "You should be able to view my site error free!<br>";

    // This is Google Chrome
    if ($.browser.chrome) {
        theBrowser = "Google Chrome";
        theBrowserLogo = "img/chrome.png";

    // This is Mozilla Firefox
    } else if ($.browser.mozilla) {
        theBrowser = "Mozilla Firefox";
        theBrowserLogo = "img/firefox.png";

    // This is Safari
    //else if (usrAgent.indexOf("Safari") > -1) {
    } else if ($.browser.safari) {
        theBrowser = "Apple Safari";
        theBrowserLogo = "img/safari.png";
        theBrowserMessage = "You might experience some issues while browsing my site. " +
        "If you do, please report it so I may look into fixing them.";

    // This is Opera
    } else if ($.browser.opr) {
        theBrowser = "Opera";
        theBrowserLogo = "img/opera.png";
        theBrowserMessage = "You might experience some issues while browsing my site. " +
        "If you do, please report it so I may look into fixing them.";

    //TODO Old IE (<= 9, MSIE) check
    } else if ($.browser.msie) {
        theBrowser = "Internet Explorer";
        theBrowserLogo = "img/ie.png";
        theBrowserMessage = "You might experience some issues while browsing my site. " +
        "If you do, please report it so I may look into fixing them.";

    // Some other browser
    } else {
        theBrowser = "An Unidentified Browser";
        theBrowserVersion = "";
        theBrowserLogo = "img/globe-blue.png";
        theBrowserMessage = "If you will, please submit an issue on GitHub with compatibility " +
            "results so I can develop for this browser.";
    }

    // Insert message and browser logo
    yourBrowserA.innerHTML = "You are using<br>" + theBrowser + " " + theBrowserVersion + ".<br>" +
        theBrowserMessage + '<br><img alt="Browser logo" width="90" height="90" src="' +
        theBrowserLogo + '" />';

    // Trigger the fade-in transition
    yourBrowser.style.opacity = "1";

    // Trigger the sliding transition
    yourBrowser.style.webkitTransform = "translateY(-220px)";
    yourBrowser.style.transform = "translateY(-220px)";
}
