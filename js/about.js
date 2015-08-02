/*
 * Created 2015 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


/**
 * Calculate and display the year difference between two dates.
 * @param {Object.<number>} date The starting date to calculate from.
 *                               The object contains three numeric keys, year, month, and day.
 *                               The year is expressed in four digits, e.g., 2015.
 * @returns {Number}
 */
function yearDifference(date) {
  "use strict";
  var curDate = new Date(),
      now     = {
        year: curDate.getUTCFullYear(),
        // UTC month value is zero-based
        month: curDate.getUTCMonth() + 1,
        day: curDate.getUTCDate()
      },
      diff = now.year % date.year;

  // Do not update the date unless it is time
  if (now.month < date.month ||
      now.month === date.month && now.day < date.day) {
    diff -= 1;
  }

  return diff;
}

// Calculate my age
document.querySelector("#my-age").innerHTML = yearDifference({ year: 1995, month: 3, day: 13 });
