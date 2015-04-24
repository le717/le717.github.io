(function($) {
  "use strict";
  var posts  = [];

    /**
     * Convert a date/time stamp to the format "DD Month, YYYY".
     * @param {String} stamp
     * @returns {String}.
     */
    function _createDate(stamp) {
      var months = {"01": "January", "02": "February", "03": "March", "04": "April",
                    "05": "May", "06": "June", "07": "July", "08": "August", "09": "September",
                    "10": "October", "11": "November", "12": "December"
                   };

      var dateParts = stamp.split("T")[0].split("-"),
          formatted = [dateParts[2], dateParts[1], dateParts[0]];
      formatted[1]  = months[formatted[1]] + ",";
      return formatted.join(" ");
    }


    /**
     * @constructor
     * Create a blog post object.
     */
    function BlogPost(id, date, title, url, content) {
      this.id        = "post-" + id;
      this.url       = url;
      this.date      = date;
      this.title     = title;
      this.content   = content;
      this.selector  = "#" + this.id;
      this.container = "<div class='single-post' id='" + this.id + "'></div>";
    }

    BlogPost.prototype.compile = function() {
      var final = ["<div class='single-post' id='", this.id, "'>"];

      // Post title and URL
      final.push("<a class='post-url' target='_blank' href='", this.url, "'>");
      final.push("<h1 class='post-title'>", this.title, "</h1></a>");

      // Post metadata
      final.push("<p class='post-meta'><span class='post-date'>", this.date, "</span></p>");

      // Post body
      final.push("<div class='post-content'>", this.content, "</div>");

      // Finally, close off the container
      final.push("</div>");
      console.log(final.join(""));
    };

    /**
     * Create a blog post object
     */
    (function() {
      // Display a different number of posts depending on the platform
      var numOfPosts = 1;  // ($.browser.desktop ? 7 : 4);

      $.ajax({
        dataType: "json",
        url: "//public-api.wordpress.com/rest/v1.1/sites/triangle717.wordpress.com/posts/?number=" +
              numOfPosts + "&callback=?",
        success: function(data) {
          data.posts.forEach(function(postInfo) {
            // Convert publishing date to a nicer format
            // Index 0 = Year
            // Index 1 = Month
            // Index 2 = Day
            var postDate = _createDate(postInfo.date);

            // Create the post object and store it
            var myPost = new BlogPost(postInfo.guid.substr(-4), postDate,
                                      postInfo.title, postInfo.short_URL, postInfo.content);
            myPost.compile();
            posts.push(myPost);
          });

          // Now that the posts are stored, go through and display them
          // and stop the loading animation
          $(".loading-dots").remove();
          $(".blog-posts").removeClass("page-section");
          showPosts();
          $(".end-of-posts").removeClass("hidden");
          return true;
        }
      });
    })();

    /**
     *  Display each blog post
     */
    function showPosts() {
      $.each(posts, function(key, value) {
        // Perform initial cleanup measures
        value.cleanUp();

        // Add the post container to the page
        $(".blog-posts").append(value.container);

        // Display post details in the following order:
        // Post title/permalink to WordPress
        // Publish date
        // Post content
        $(value.selector).append("<a class='post-url' target='_blank'><h1 class='post-title'></h1></a>");
        $(value.selector).append("<p class='post-meta'><span class='post-date'></span></p>");
        $(value.selector).append("<div class='post-content'></div>");

        $(value.selector + " .post-title").html(value.title);
        $(value.selector + " .post-url").attr("href", value.url);
        $(value.selector + " .post-date").html(value.date);
        $(value.selector + " .post-content").html(value.content);

        // Perform post-DOM addition cleanup
        cleanupPost(value.selector);
        return true;
      });
    }


    /**
     * Remove WordPress classes, IDs, and other unnecessary markup.
     */
    BlogPost.prototype.cleanUp = function() {
      // Alignment and captions
      this.content = this.content.replace(/alignnone|alignleft|aligncenter|alignright/g, "");
      this.content = this.content.replace(/size-(?:thumbnail|full|medium|large)/g, "");
      this.content = this.content.replace(/wp-caption(?!-text)/g, "text-center");

      // Divs
      this.content = this.content.replace(/div id=".*?"/g, "div");
      this.content = this.content.replace(/div style=".*?"/g, "div");

      // Images
      this.content = this.content.replace(/img class=".*?"/g, "img");
      this.content = this.content.replace(/img style=".*?"/g, "img");

      // Spans (WordPress emotes)
      this.content = this.content.replace(/span class='.*?'/g, "span");
      this.content = this.content.replace(/span title='.*?'/g, "span");

      // Blank attributes
      this.content = this.content.replace(/\sclass="\s?"/g, "");
      this.content = this.content.replace(/\sstyle="\s?"/g, "");
      // console.log(this.content);
      return true;
    };


    /**
     * Remove WordPress classes, IDs, and other unnecessary clutter
     */
    function cleanupPost(postContainer) {
      // TODO Move this into the BlogPost prototype
      $(function() {
        // Apply alignment for image caption text
        $(postContainer).find("p").each(function() {
          var $this = $(this);
          if ($this.hasClass("wp-caption-text")) {
            $this.removeAttr("class");
            $this.css("text-align", "inherit");
          }
        });
     });
    }

}(jQuery));
