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