(function($) {
  "use strict";
  /**
   * @constructor
   * [[Description]]
   * @param {String} id Event ID.
   * @param {String} url Event url.
   * @param {String} sha Event SHA value or branch name.
   * @param {String} date Event date.
   * @param {String} repo Event repo.
   * @param {String} event Event type.
   * @param {String} msg Event message.
   */
  function GHEvent(id, url, sha, date, repo, event, msg) {
    this.id    = id;
    this.msg   = msg;
    this.url   = url;
    this.sha   = sha;
    this.date  = date;
    this.repo  = repo;
    this.event = event;
    this.selector = "#gh-" + id;
    this.container = "<dl id='gh-" + id + "'></dl>";
  }

  /**
   * @constant
   * @type {Number}
   * The number of characters the commit message should be limited to.
   * This is a hard limit and may increase cut off part of a word.
   */
  GHEvent.prototype.charLimit = 80;


  /**
   * Summarize a commit messgae.
   * @returns {Boolean} true.
   */
  GHEvent.prototype.summarize = function() {
    if (this.msg.length > this.charLimit) {
      this.msg = this.msg.substr(0, this.charLimit) + "...";
    }

    // Preserve any new lines
    this.msg = this.msg.replace(/\n/, "<br>");
    return true;
  };

  var EventUtils = {
    /**
     * Convert an API url into a web interface one.
     * @param {String} url
     * @returns {Sring}
     */
    makeURL: function(url) {
      return url.replace(/(?:api\.|repos\/)/gi, "").replace(/commits/gi, "commit");
    },

    /**
     * Capitalize the first letter of the given text.
     * @param {String} text
     * @returns {String}
     */
    capitalFirst: function(text) {
      return text.charAt(0).toUpperCase() + text.substr(1);
    },

    /**
     * Construct a proper event name.
     * @param {String}  name The event name.
     * @param {Boolean} [activeTense=false] If true, the event name
     *                                      will be converted to an active tense verb.
     * @returns {String} The corrected name.
     */
    makeEventName: function(name, activeTense) {
      // Default to leaving verb tense as-is
      if (activeTense === undefined) {
        activeTense = false;
      }

      // Capitalize the first letter
      name = this.capitalFirst(name);

      // Convert verb to active tense
      if (activeTense) {
        var changeTense = {
          "Closed": "Close",
          "Opened": "Open",
          "Published": "Publish"
        };

        // If a replacement is defined, use it
        if (changeTense[name] !== undefined) {
          name = changeTense[name];
        }
      }
      return name;
    }
  };



  /**
   * Create a date stamp in the format "DD Month, YYYY".
   * @param {String} rawDate GitHub timestamp.
   * @returns {String}.
   */
  function _createDate(rawDate) {
    var months = {"01": "January", "02": "February", "03": "March", "04": "April",
                  "05": "May", "06": "June", "07": "July", "08": "August", "09": "September",
                  "10": "October", "11": "November", "12": "December"
                 };

    var dateParts  = rawDate.split("T")[0].split("-"),
        dateFormat = "{0} {1} {2}".format(dateParts[2], dateParts[1], dateParts[0]).split(" ");
    dateFormat[1]  = "{0},".format(dateFormat[1].replace(dateFormat[1], months[dateFormat[1]]));
    return dateFormat.join(" ");
  }


  var events = [];

  /**
   * [[Description]].
   * @param {Object} data [[Description]].
   */
  function loadEvents(data) {
    for (var i = 0, limit = 7; i < limit; i += 1) {
      var curEvent  = data[i];
      var id        = curEvent.id,
          url       = "#",
          sha       = "",
          repo      = curEvent.repo.name,
          date      = _createDate(curEvent.created_at).substring(0, curEvent.created_at.length - 1),
          message   = "No commit message available.",
          eventName = curEvent.type.replace(/event/i, "");

      // Do not report certain events
      if (/comment|fork|watch/gi.test(eventName)) {
        limit += 1;
        continue;
      }

      switch(eventName) {
          // Create event
          case "Create":
          // Filter out create tag events
          var _eventType = curEvent.payload.ref_type;
            if (/tag/.test(_eventType))  {
              continue;
            }

            sha = curEvent.payload.ref;
            message = "Create " + curEvent.payload.ref_type;

            // New branch
            if (/branch/.test(_eventType)) {
              url = EventUtils.makeURL(curEvent.repo.url) + "/tree/" + curEvent.payload.ref;
            }

            // TODO New repo
            break;

          // New release
          case "Release":
            eventName = EventUtils.makeEventName(curEvent.payload.action, true);
            sha = curEvent.payload.release.tag_name;
            url = curEvent.payload.release.html_url;
            message = "\"" + curEvent.payload.release.name + "\"";
            break;

          // Open/close issue
          case "Issues":
            eventName = EventUtils.makeEventName(curEvent.payload.action, true);
            sha = "#" + curEvent.payload.issue.number;
            url = curEvent.payload.issue.html_url;
            message = EventUtils.makeEventName(curEvent.payload.action) + " \"" + curEvent.payload.issue.title + "\"";
            break;

          // Delete event
          case "Delete":
            eventName = "Delete";
            sha = curEvent.payload.ref;
            url = EventUtils.makeURL(curEvent.repo.url);
            message = "Delete " + curEvent.payload.ref_type;
            break;

          // Wiki edit
          case "Gollum":
            eventName = "Wiki Edit";
            sha = curEvent.payload.pages[0].sha.substr(0, 10);
            url = curEvent.payload.pages[0].html_url;

            message = EventUtils.capitalFirst(curEvent.payload.pages[0].action);
            message += " \"" + curEvent.payload.pages[0].title + "\"";
            break;

          // Pull request
          case "PullRequest":
            eventName = "Pull Request";
            sha = "#" + curEvent.payload.number;
            url = curEvent.payload.pull_request.html_url;
            message = EventUtils.capitalFirst(curEvent.payload.pull_request.state);
            message += " \"" + curEvent.payload.pull_request.title + "\"";
            break;

          // Push event
          default:
            url = EventUtils.makeURL(curEvent.payload.commits[0].url);
            sha = curEvent.payload.commits[0].sha.substr(0, 10);
            message = curEvent.payload.commits[0].message;
            break;
      }

      // Create a new event object
      var ghEvent = new GHEvent(id, url, sha, date, repo, eventName, message);
      ghEvent.summarize();
      events.push(ghEvent);
//      console.log(ghEvent);
    }
  }


  /**
   * Display the feed results.
   * @returns {Boolean} Always returns true.
   */
  function displayEvents() {
    var $container = $(".gh-events");
    events.forEach(function(value) {
      $container.append(value.container);
      $(value.selector).append("<dt class='gh-title'/>");
      $(value.selector).append("<dd/>");

      $(value.selector + " .gh-title").html(value.event + " <a class='gh-url' target='_blank' href=''></a> @ " + value.repo + " on " + value.date);
      $(value.selector + " .gh-url").html(value.sha);
      $(value.selector + " .gh-url").attr("href", value.url);
      $(value.selector + " dd").html("<code>" + value.msg + "</code>");
    });
    return true;
  }

  // Poll the GitHub API
  $.ajax({
    dataType: "json",
    url: "https://api.github.com/users/le717/events/public",
    success: [loadEvents, displayEvents],
    error: function() {
      var msg = "Unfortunately that information cannot be loaded right now";
      $(".gh-events").html(msg);
      return false;
    }
  });
})(jQuery);
