/*
    Created 2014 Triangle717
    <http://Triangle717.WordPress.com/>

    Licensed under The MIT License
    <http://opensource.org/licenses/MIT/>
*/

var $yourBrowser = $("#yourBrowser");

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
    
    // Display (lame) page contents
    $("#subpages").css("display", "table");
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


function hideBrowserBox() {
    "use strict";
    /* Hide the browser box */
    // Trigger the fade-out transition
    $yourBrowser.css("opacity", "0");
    
    // Trigger the sliding transition
    $yourBrowser.css("transform", "translateY(220px)");
}


function detectBrowser() {
    "use strict";
    /* Detect the user's web browser and display message */
    var theBrowser,
        theBrowserLogo,
        usrAgent = navigator.userAgent,
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
        theBrowserMessage = theBrowserMessageError;
        theBrowserMessage = theBrowserMessageError;
        
        // This is Mozilla Firefox
    } else if ($.browser.mozilla) {
        theBrowser = "Mozilla Firefox";
        theBrowserLogo = "img/firefox.png";
        
        // This is Safari
    } else if ($.browser.safari) {
        theBrowser = "Apple Safari";
        theBrowserLogo = "img/safari.png";
        
        // Display error message for Safari 5 and below
        if ($theBrowserVersion <= 5) {
            theBrowserMessage = theBrowserMessageError;
        }
        
        // This is Opera
    } else if ($.browser.opr) {
        theBrowser = "Opera";
        theBrowserLogo = "img/opera.png";
        theBrowserMessage = theBrowserMessageError;
        
        //TODO Old IE (<= 9, MSIE) check
    } else if ($.browser.msie) {
        theBrowser = "Internet Explorer";
        theBrowserLogo = "img/ie.png";
        theBrowserMessage = theBrowserMessageError;
        
        // Some other browser
    } else {
        theBrowser = "An Unidentified Browser";
        $theBrowserVersion = "";
        theBrowserLogo = "img/globe-blue.png";
        theBrowserMessage = "If you will, please submit an issue on GitHub with compatibility " +
            "results so I can develop for this browser.";
    }
    
    // Insert message and browser logo
    $("#yourBrowser a").append("You are using<br>" + theBrowser + " " + $theBrowserVersion +
                               ".<br>" + theBrowserMessage + '<br><img alt="Browser logo" ' +
                               'width="90" height="90" src="' + theBrowserLogo + '" />');
    
    // Trigger the fade-in transition
    $yourBrowser.css("opacity", "1");
    
    // Trigger the sliding transition
    $yourBrowser.css("transform", "translateY(-220px)");
}

// Get date of last commit using GitHub API
// Taken from http://buzz.jaysalvat.com/
$(function() {
    $.getJSON("https://api.github.com/repos/le717/le717.github.io/commits/master?callback=?",
              function(data) {
                    var date = data.data.commit.committer.date.replace(/(T(.*))$/g, "");
                    //var date = "Right now";
                    $("#last-update").text("Site last updated on: " + date);
                }, "json");
});
