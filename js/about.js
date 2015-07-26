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
 * @returns {Number}.
 */
function calcDate(date) {
  "use strict";
  var curDate  = new Date();
  var curDay   = curDate.getUTCDate(),
      curYear  = curDate.getUTCFullYear(),
      curMonth = curDate.getUTCMonth() + 1,  // UTC month value is zero-based
      myCurAge = curYear % date.year;

  // Do not update the date unless it is time
  if (curMonth < date.month && curDay > date.day ||
      curMonth < date.month && curDay < date.day ||
      curMonth < date.month && curDay === date.day ||
      curMonth === date.month && curDay < date.day) {
    myCurAge -= 1;
  }

  return myCurAge;
}

// Calculate my age
document.querySelector("#my-age").innerHTML = calcDate({ year: 1995, month: 3, day: 13 });
