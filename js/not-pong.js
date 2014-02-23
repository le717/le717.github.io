/*
    Created 2014 Triangle717
    <http://Triangle717.WordPress.com/>

    Licensed under The MIT License
    <http://opensource.org/licenses/MIT/>
*/

function stopAll() {
    "use strict";
    /* Stop the Not Pong animation and display (pitiful) page contents */

    // Stop animations
    $(".slide-ani").css("animationPlayState", "paused");
    $(".rotate-ani").css("animationPlayState", "paused");
    $(".racket-ani").css("animationPlayState", "paused");

    // Hide animation elements
    $("#wait-link").css("display", "none");
    $("#wrapper").css("display", "none");

    // Display (pitiful) page contents
    $("#subpages").css("display", "block");
}
