/*
    Created 2014 Triangle717
    <http://Triangle717.WordPress.com/>

    Licensed under The MIT License
    <http://opensource.org/licenses/MIT/>
*/

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

function detectBrowser() {
    /*
    The the web browser the user is running. Taken from
    https://developer.mozilla.org/en-US/docs/Web/API/window.navigator#Example_.231.3A_Browser_detect_and_return_a_string
    and slightly edited to clean it up a bit.
    */
    var theBrowser, sUsrAg = navigator.userAgent;

    if (sUsrAg.indexOf("Chrome") > -1) {
        theBrowser = "Google Chrome";
    } else if (sUsrAg.indexOf("Safari") > -1) {
        theBrowser = "Apple Safari";
    } else if (sUsrAg.indexOf("Opera") > -1) {
        theBrowser = "Opera";
    } else if (sUsrAg.indexOf("Firefox") > -1) {
        theBrowser = "Mozilla Firefox";
    } else if (sUsrAg.indexOf("MSIE") > -1) {
        theBrowser = "Microsoft Internet Explorer";
    }

    var yourBrowser = document.querySelector("#yourBrowser");
    yourBrowser.innerHTML = "You are using " + theBrowser + " to view my website!";
}

detectBrowser();
