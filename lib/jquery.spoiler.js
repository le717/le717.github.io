/*
 * jQuery Spoiler
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

  $.fn.spoiler = function(options) {
    // Default options
    var settings = $.extend({
      paddingValue       : "0.375em", // 6px
      buttonName         : "Spoiler",
      buttonClass        : "btn-spoiler",
      buttonActiveClass  : "btn-spoiler-active",
      spoilerVisibleClass: "spoiler-visible"
    }, options);

    // Variables for usage
    var spoilerID          = 0,
        btnSpoilerID       = 0,
        spoilerHeights     = [],
        buttonClass        = "." + settings.buttonClass;

    // Assign IDs to each spoiler
    $(this).each(function() {
      var $this = $(this);
      $this.attr("id", $this.attr("class") + "-" + spoilerID);
      spoilerID += 1;

      // The only CSS requirement for this to work for the spoilered content
      // to have an overflow: hidden rule applied.
      $this.css("overflow", "hidden");

      // Get the height of the content to be spoilered now,
      // as once we hide the text it cannot be restored.
      // Add `paddingValue` for a bit of extra space to
      // prevent content from being cut off.
      spoilerHeights.push($this.css("height"));
    });

    // Add the toggle button
    $(this).before("<div class='" + settings.buttonClass + "'><span>" +
                   settings.buttonName + "</span></div>");

    // Add matching IDs to each toggle button
    $(buttonClass).each(function() {
      $(this).attr("id", settings.buttonClass + "-" + btnSpoilerID);
      btnSpoilerID += 1;
    });

    // Now that we have the height, hide all content
    $(this).css("height", "0");

    $(buttonClass).on("click", function() {
      // Get the ID for the clicked spoiler button so only that one is triggered
      var spoilerID = "#" + $(this).attr("id").replace(/btn-/, ""),
          spoilerNum = spoilerID.slice(spoilerID.length - 1),
          $this  = $(spoilerID);

      // Upon clicking the spoiler button,
      // if the content is hidden, reveal it.
      // Otherwise, hide it.
      if ($this.hasClass(settings.spoilerVisibleClass)) {
        $this.css({"height": "0", "padding-bottom": ""});
      } else {
        $this.css({"height": spoilerHeights[spoilerNum], "padding-bottom": settings.paddingValue});
      }
      $this.toggleClass(settings.spoilerVisibleClass);
      // Also toggle between button active classes
      $(this).toggleClass(settings.buttonActiveClass);
    });
    return this;
  };
})(jQuery);
