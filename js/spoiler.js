/**
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


/**
 * jQuery-based Spoiler system
 */
(function($) {
  "use strict";

  // Variables for usage
  var spoilerID          = 0,
      btnSpoilerID       = 0,
      spoilerHeights     = [],
      paddingValue       = "5px",
      btnSpoiler         = "btn-spoiler",
      spoiler            = "spoiler",
      spoilerShownClass  = "spoiler-shown",
      $btnSpoiler        = $(".btn-spoiler"),
      $spoiler           = $(".spoiler"),
      spoilerActiveClass = "btn-spoiler-active";

  // Add IDs to each spoiler
  $spoiler.each(function(index, value) {
    $(value).attr("id", spoiler + "-" + spoilerID);
    spoilerID += 1;

    // Get the height of the content to be spoilered now,
    // as once we hide the text it cannot be restored.
    // Add `paddingValue` for a bit of extra space to
    // prevent content from being cut off.
    spoilerHeights.push(parseInt($(value).css("height").slice(0, -2)) + paddingValue);
  });

  // Add the toggle button
  $spoiler.before("<div class='" + btnSpoiler + "'><span>Spoiler</span></div>");

  // Add matching IDs to each toggle button
  $btnSpoiler.each(function(index, value) {
    $(value).attr("id", btnSpoiler + "-" + btnSpoilerID);
    btnSpoilerID += 1;
  });

  // Now that we have the height, hide all content
  $spoiler.css("height", "0");

  $btnSpoiler.on("click", function() {
    // Get the ID for the clicked spoiler button so only that one is triggered
    var thisSpoilerID = "#" + $(this).attr("id").replace(/btn-/, ""),
        thisSpoilerNumber = thisSpoilerID.slice(thisSpoilerID.length - 1),
        $thisSpoiler  = $(thisSpoilerID);

    // Upon clicking the spoiler button,
    // if the content is hidden, reveal it.
    // Otherwise, hide it.
    if ($thisSpoiler.hasClass(spoilerShownClass)) {
      $thisSpoiler.css("height", "0");
    } else {
      $thisSpoiler.css("height", spoilerHeights[thisSpoilerNumber]);
    }
    $thisSpoiler.toggleClass(spoilerShownClass);
    $(this).toggleClass(spoilerActiveClass);
  });
})(jQuery);
