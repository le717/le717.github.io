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

function decreaseSpeed(){
    "use strict";
    /* Decrease the animation speed of Not Pong */
    var $slideAniSpeed, $rotateAniSpeed, $racketAniSpeed;

    // Get the current speed values
    var $slideAni = $(".slide-ani").css("animation-duration");
    var $rotateAni = $(".rotate-ani").css("animation-duration");
    var $racketAni = $(".racket-ani").css("animation-duration");

    // Remove the returned "s"
    $slideAni = $slideAni.slice(0, -1);
    $rotateAni = $rotateAni.slice(0, -1);
    $racketAni = $racketAni.slice(0, -1);

    // Convert the strings to integers
    $slideAni = parseInt($slideAni);
    $rotateAni = parseInt($rotateAni);
    $racketAni = parseInt($racketAni);

    /* For simplicity, decrease the speed of each animation by one second increments
     In addition, all three animation speeds must be decreased at once for it to work.
     Well, the rotate animation does not, but if the animation slows down, then wouldn't
     the ball slow down too? */

    // If the ball sliding animation speed is more than 7 seconds,
    // go back to initial speeds.
    if ($slideAni > 7) {
        $slideAniSpeed = 2;
        $rotateAniSpeed = 3;
        $racketAniSpeed = 2;

        // Otherwise, decrease the animation speeds
    } else {
        $slideAniSpeed = $slideAni + 1;
        $rotateAniSpeed = $rotateAni + 1;
        $racketAniSpeed = $racketAni + 1;
    }

    // Convert the values back to strings, restore the "s"
    $slideAniSpeed = $slideAniSpeed.toString() + "s";
    $rotateAniSpeed = $rotateAniSpeed.toString() + "s";
    $racketAniSpeed = $racketAniSpeed.toString() + "s";

    // Update CSS with the new, slower animation speeds
    $(".slide-ani").css("animation-duration", $slideAniSpeed);
    $(".rotate-ani").css("animation-duration", $rotateAniSpeed);
    $(".racket-ani").css("animation-duration", $racketAniSpeed);
}


function increaseSpeed(){
    "use strict";
    /* Decrease the animation speed of Not Pong */
    var $slideAniSpeed, $rotateAniSpeed, $racketAniSpeed;

    // Get the current speed values
    var $slideAni = $(".slide-ani").css("animation-duration");
    var $rotateAni = $(".rotate-ani").css("animation-duration");
    var $racketAni = $(".racket-ani").css("animation-duration");

    // Remove the returned "s"
    $slideAni = $slideAni.slice(0, -1);
    $rotateAni = $rotateAni.slice(0, -1);
    $racketAni = $racketAni.slice(0, -1);

    // Convert the strings to integers
    $slideAni = parseInt($slideAni);
    $rotateAni = parseInt($rotateAni);
    $racketAni = parseInt($racketAni);

    /* For simplicity, increase the speed of each animation by one second increments
     In addition, all three animation speeds must be increased at once for it to work.
     Well, the rotate animation does not, but if the animation speeds up, then wouldn't
     the ball speed up too? */

    // If the ball sliding animation speed is less than 1 second,
    // go back to initial speeds.
    if ($slideAni <= 1) {
        $slideAniSpeed = 2;
        $rotateAniSpeed = 3;
        $racketAniSpeed = 2;

        // Otherwise, increase the animation speeds
    } else {
        $slideAniSpeed = $slideAni - 1;
        $rotateAniSpeed = $rotateAni - 1;
        $racketAniSpeed = $racketAni - 1;
    }

    // Convert the values back to strings, restore the "s"
    $slideAniSpeed = $slideAniSpeed.toString() + "s";
    $rotateAniSpeed = $rotateAniSpeed.toString() + "s";
    $racketAniSpeed = $racketAniSpeed.toString() + "s";

    // Update CSS with the new, faster animation speeds
    $(".slide-ani").css("animation-duration", $slideAniSpeed);
    $(".rotate-ani").css("animation-duration", $rotateAniSpeed);
    $(".racket-ani").css("animation-duration", $racketAniSpeed);
}
