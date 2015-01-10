(function($) {
  "use strict";
  /**
   * @constructor
   * [[Description]]
   * @param {String} url Event URL.
   * @param {String} sha Event SHA.
   * @param {String} date Event date.
   * @param {String} repo Event repo.
   * @param {String} event Event type.
   * @param {String} msg Event message.
   */
  function GHEvent(url, sha, date, repo, event, msg) {
    this.msg   = msg;
    this.url   = url;
    this.sha   = sha;
    this.date  = date;
    this.repo  = repo;
    this.event = event;
    this.selector = "#gh-" + sha;
    this.container = '<dl id="gh-' + sha + '"></dl>';
  }


  /**
   * Create a date stamp in the format "DD Month, YYYY".
   * @param {String} rawDate GitHub timestamp.
   * @returns {String}.
   */
  function createDate(rawDate) {
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
      var url       = "",
          sha       = "",
          date      = createDate(data[i].created_at).substring(0, data[i].created_at.length - 1),
          message   = "No commit message available.",
          tagName   = "",
          tagType   = "",
          repo  = data[i].repo.name,
          eventName = data[i].type.replace(/event/i, "");

      // Do not report certain events
      if (/release|issue|comment|fork|watch/i.test(eventName)) {
        limit += 1;
        continue;
      }

      // Only present in certain events
      else if (data[i].payload.commits !== undefined) {
        url = data[i].payload.commits[0].url;
        sha = data[i].payload.commits[0].sha.substr(0, 10);
        message = data[i].payload.commits[0].message;

        // Modify URL to create a link to the commit
        url = url.replace(/(?:api.|repos\/)/gi, "");
        url = url.replace(/commits/gi, "commit");
      }

      // Delete event
      if (/delete/i.test(eventName)) {
        eventName = "Deletion";
  //      console.log(eventName + repo + " @ " + date);
      }

      // New tag or branch
      else if (/create/i.test(eventName)) {
        tagName = data[i].payload.ref;
        tagType = data[i].payload.ref_type;
  //      console.log(eventName + " " + tagType + " " + tagName + repo + " @ " + date);
      }

      else if (/pullre/i.test(eventName)) {
        eventName = eventName.replace(/PullRequest/, "Pull Request");
  //      console.log(eventName + " " + sha + repo + " @ " + date);
      }

      // Push event
      else {
  //      console.log(eventName + " " + sha + repo + " @ " + date);
  //      console.log(message);
      }

      // Create a new event object
      var ghEvent = new GHEvent(url, sha, date, repo, eventName, message);

      // Add tag information
      if (tagName !== "" && tagType !== "") {
        ghEvent.tagName = tagName;
        ghEvent.tagType = tagType;
      }
      events.push(ghEvent);
      //    console.log(ghEvent);
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

      $(value.selector + " .gh-title").html(value.event + " <a class='gh-url' target='_blank' href='#'></a> @ " + value.repo + " on " + value.date);
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
