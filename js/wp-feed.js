(function($) {
  "use strict";
  /**
   * @constructor
   * Create a blog post object.
   */
  function BlogPost(id, date, title, url, content) {
    this.id        = "post-" + id;
    this.url       = url;
    this.date      = date;
    this.title     = title;
    this.final     = null;
    this.content   = content;
    this.selector  = "#" + this.id;
  }


  /**
   * [[Description]]
   * @returns {Boolean} Always returns true.
   */
  BlogPost.prototype.compile = function() {
    var final = ["<div class='single-post' id='", this.id, "'>"];

    // Post title and URL
    final.push("<a class='post-url' target='_blank' href='", this.url, "'>");
    final.push("<h1 class='post-title'>", this.title, "</h1></a>");

    // Post metadata
    this.createDate();
    final.push("<p class='post-meta'><span class='post-date'>", this.date, "</span></p>");

    // Post body
    this.cleanUp();
    final.push("<div class='post-content'>", this.content, "</div>");

    // Finally, close off the container
    final.push("</div>");
    this.final = final.join("");
  };

  /**
   * Convert a date/time stamp to the format "DD Month, YYYY".
   * @returns {String}.
   */
   BlogPost.prototype.createDate = function() {
    var months = {"01": "January", "02": "February", "03": "March", "04": "April",
                  "05": "May", "06": "June", "07": "July", "08": "August", "09": "September",
                  "10": "October", "11": "November", "12": "December"
                 };

    var dateParts = this.date.split("T")[0].split("-"),
        formatted = [dateParts[2], dateParts[1], dateParts[0]];
    formatted[1]  = months[formatted[1]] + ",";
    this.date = formatted.join(" ");
  };


  /**
   * Remove WordPress classes, IDs, and other unnecessary markup.
   * @returns {Boolean} Always returns true.
   */
  BlogPost.prototype.cleanUp = function() {
    // Alignment and captions
    this.content = this.content.replace(/align(?:none|left|center|right)/g, "");
    this.content = this.content.replace(/size-(?:thumbnail|full|medium|large)/g, "");
    this.content = this.content.replace(/wp-caption(?!-)/g, "text-center");

    // Divs
    this.content = this.content.replace(/div\s?(?:(.*?) id=".*?")/g, "div$1");
    this.content = this.content.replace(/div\s?(?:(.*?) style=".*?")/g, "div$1");

    // Images
    this.content = this.content.replace(/img(?:\s?(.*?)\s?class=".*?")/g, "img$1");
    this.content = this.content.replace(/img(?:\s?(.*?)\s?id=".*?")/g, "img$1");
    this.content = this.content.replace(/img(?:\s?(.*?)\s?style=".*?")/g, "img$1");

    // Spans (WordPress emotes)
    this.content = this.content.replace(/span(.*)class='.*?'/g, "span$1");
    this.content = this.content.replace(/span(.*)title='.*?'/g, "span$1");

    // Blank attributes
    this.content = this.content.replace(/\s*class="\s?"/g, "");
    this.content = this.content.replace(/\s*style="\s?"/g, "");
    return true;
  };


  /**
   * Create a blog post object.
   */
  var posts  = [];
  (function() {
    var numOfPosts = 5;

    $.ajax({
      dataType: "json",
      url: "//public-api.wordpress.com/rest/v1.1/sites/triangle717.wordpress.com/posts/?number=" +
      numOfPosts + "&callback=?",
      success: function(data) {
        data.posts.forEach(function(postInfo) {

          // Create the post object and store it
          var myPost = new BlogPost(postInfo.guid.substr(-4), postInfo.date,
                                    postInfo.title, postInfo.short_URL, postInfo.content);
          myPost.compile();
          posts.push(myPost);
        });

        // Now that the posts are stored, go through and display them
        // and stop the loading animation
        $(".loading-dots").remove();
        $(".blog-posts").removeClass("page-section");
        $(".end-of-posts").removeClass("hidden");
        showPosts();
        return true;
      }
    });
  })();


  /**
   *  Display each blog post
   */
  function showPosts() {
    posts.forEach(function(post) {
      // Add the posts to the DOM
      $(".blog-posts").append(post.final);

      // Perform post-DOM addition cleanup
      cleanupPost(post.selector);
      return true;
    });
  }


  /**
   * Remove WordPress classes, IDs, and other unnecessary clutter.
   */
  function cleanupPost(postContainer) {
    // TODO Move this into the BlogPost prototype
    // Apply alignment for image caption text
    $(postContainer).find("p").each(function() {
      var $this = $(this);
      if ($this.hasClass("wp-caption-text")) {
        $this.removeAttr("class");
        $this.css("text-align", "inherit");
      }
    });
  }
}(jQuery));
