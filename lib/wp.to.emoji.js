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
    ":)" : ":grinning:",
    ";)" : ":wink:",
    ":D" : ":smiley:",
    "XD" : ":laughing:",
    // FIXME Needs suitable substitute
    //">:D": "",
    //"&gt;:D": "",
    ":(" : ":frowning:",
    ":'(": ":cry:",
    ":|" : ":expressionless:",
    ":/" : ":unamused:",
    ":O" : ":open_mouth:",
    ":P" : ":stuck_out_tongue:",
    ">:(": ":rage:",
    "&gt;:(": ":rage:",
    // FIXME Needs suitable substitute
    //"o_O": "",
    "8-)": ":sunglasses:",
    "^^'": ":blush:",
    "&lt;3" : ":heart:",
    "<3" : ":heart:",
    ":?" : "confused",
    "=^-^=" : ":smiley_cat:",
    ":evil:": ":imp:",
    ":twisted:": ":smiling_imp:",
    ":mrgreen:": ":alien:",
    ":oops:": ":flushed:",
    // FIXME Needs suitable substitute
    //":roll:": "",
    ":idea:": ":bulb:",
    ":!:": ":grey_exclamation:",
    ":?:": ":grey_question:",
    // The :bear: code is exactly the same
    // The :star: code is exactly the same
    ":arrow:": ":arrow_right:",

    /* Begin secret WordPress emoticons
     * http://wp.me/pBMYe-51I
     */

    // There is no suitable replacement for :(W):
    ">-I": ":cocktail:",
    "&gt;-I": ":cocktail:",
    "|_|": ":tea:",
    // There is no suitable replacement for :developer:
    // There is no suitable replacement for :burrito:
  };


  function escapeString(s) {
    /* Taken from http://stackoverflow.com/a/18620139
     * Escape all characters to create a valud regex value
     */
    return s.replace(/[$-\/?[-^{|}]/g, '\\$&');
  }


  $.fn.wpToEmoji = function() {
    "use strict";
    /* Convert WordPress.com emoticons to GitHub Pages compatible versions */

    // Support multiple selectors
    // TODO This does not quite work correctly
    $(this.selector.split(" ")).each(function(index, codeSelector) {

      // Find all possible occurances of WordPress emoticons
      var $allEmotes = $(codeSelector).find(".wp-smiley"),
          $postText = $(codeSelector).html();

      // Convert each emoticon
      $allEmotes.each(function(position, wpEmote) {
        var $rawWPCode = $(wpEmote).html();
        var $HTMLElement = $(wpEmote);

        // Create a regex constructor for the paticular emoticon
        var re = new RegExp(escapeString($rawWPCode), "gi");

        // A WordPress emoticon was found
        if ($postText.indexOf($rawWPCode) > -1) {

          // Ensure there is a mapping for this paticular emoticon
          if (emoteCodes[$rawWPCode] !== undefined) {

            // Convert the emoticon to a suitable substitute as defined in the conversion table
            $HTMLElement = $rawWPCode.replace(re, emoteCodes[$rawWPCode]);

            // Update the page with the updated emoticon
            $(wpEmote).html($HTMLElement);
          }
        }
      });
    });
  };
}(jQuery));
