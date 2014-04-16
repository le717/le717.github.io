/*
 * WordPress Emoticon to Emoji Converter
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */

(function($) {
  // WordPress to Emoji emoticon substitute table
  var emoteCodes = {
    "emoji-smile"          : ":grinning:",
    "emoji-wink"           : ":wink:",
    "emoji-bigsmile"       : ":smiley:",
    "emoji-lol"            : ":laughing:",
    // FIXME Needs suitable substitute
    //"emoji-evilgrin"     : "",
    "emoji-sad"            : ":frowning:",
    "emoji-cry"            : ":cry:",
    "emoji-neutral"        : ":expressionless:",
    "emoji-uneasy"         : ":unamused:",
    "emoji-surprised"      : ":open_mouth:",
    "emoji-tongue"         : ":stuck_out_tongue:",
    "emoji-angry"          : ":rage:",
    // FIXME Needs suitable substitute
    //"emoji-mindblown-alt": "",
    "emoji-cool"           : ":sunglasses:",
    "emoji-blush"          : ":blush:",
    "emoji-heart"          : ":heart:",
    "emoji-confused"       : "confused",
    "emoji-kitten"         : ":smiley_cat:",
    "emoji-evil"           : ":imp:",
    "emoji-twisted"        : ":smiling_imp:",
    "emoji-mrgreen"        : ":alien:",
    "emoji-oops"           : ":flushed:",
    // FIXME Needs suitable substitute
    //"emoji-rolleyes"     : "",
    "emoji-idea"           : ":bulb:",
    "emoji-exclaim"        : ":grey_exclamation:",
    "emoji-question"       : ":grey_question:",
    // The :bear: code is exactly the same
    // The :star: code is exactly the same
    "emoji-arrow"          : ":arrow_right:",

    /* Begin secret WordPress emoticons
     * http://wp.me/pBMYe-51I
     */

    // There is no suitable replacement for :(W):
    "emoji-martini"        : ":cocktail:",
    "emoji-whiterussian"   : ":tea:",
    // There is no suitable replacement for :developer:
    // There is no suitable replacement for :burrito:
  };


  $.fn.wpToEmoji = function() {
    "use strict";
    /* Convert WordPress.com emoticons to GitHub Pages compatible versions */

    // Support multiple selectors
    var elementSelector = this.selector.split(",");
    console.log(elementSelector);
    elementSelector.forEach(function(index, value){
      elementSelector[index] = value.toString().trim();
    });
    console.log(elementSelector);

    // TODO This line does not quite work correctly (see above for WIP fix)
    $(this.selector.split(",")).each(function(index, codeSelector) {

      console.log("codeSelector " + codeSelector);

      // Find all possible occurrences of WordPress emoticons
      var $allEmotes = $(codeSelector).find(".wp-smiley");

      console.log($allEmotes);

      // Convert each emoticon
      $allEmotes.each(function(position, wpEmote) {
        var $emoteClass = $(wpEmote).attr("class").split(" ")[2];
        var $HTMLElement = $(wpEmote);

        // A WordPress emoticon was found
        if ($HTMLElement.hasClass($emoteClass)) {

          // Ensure there is a mapping for this particular emoticon
          if (emoteCodes[$emoteClass] !== undefined) {

            // Update the class content with a suitable substitute
            // as defined in the conversion table
            $("." + $emoteClass).text(emoteCodes[$emoteClass]);

            console.log("Final pair: ." + $emoteClass + " " + emoteCodes[$emoteClass]);
          }
        }
      });
    });
    return this;
  };
}(window.jQuery || window.Zepto));
