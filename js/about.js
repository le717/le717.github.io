/*
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */


/**
 * Calculate and display the difference between two dates
 * @param {array} date
 * @param {selector} element ID or Class selector
 */
function calcDate(date, element) {
  "use strict";
  var curDate  = new Date();
  var curDay   = curDate.getUTCDate(),
      curYear  = curDate.getUTCFullYear(),
      curMonth = curDate.getUTCMonth(),
      myCurAge = curYear % date[0];

//  var yearDifference  = curYear % date[0],
//      monthDifference = curMonth - date[1],
//      dayDifference   = date[2] - curDay;

//  // This is the same month and day, increase the year
//  if (monthDifference === 0 && dayDifference === 0) {
//    yearDifference += 1;
//  }
//
//  // There is four or less months until the milestone month
//  if (monthDifference > 0 && monthDifference <= 4) {
//    monthDifference = 12 - Math.abs(monthDifference);
//  }
//
//  // The current month is later than the milestone month.
//  if (monthDifference < 0 && monthDifference >= -7) {
//    monthDifference = Math.abs(monthDifference);
//  }

  // TODO There is no such thing as 1.12th years, 1.10 === 2 years
  // 12 / 1.2 === 10, so how do I calculate every 1.2 months?

  // Do not update the date unless it is time
  if (curMonth < date[1] && curDay > date[2] ||
      curMonth < date[1] && curDay < date[2] ||
      curMonth < date[1] && curDay === date[2] ||
      curMonth === date[1] && curDay < date[2]) {
    myCurAge -= 1;
  }

  document.querySelector(element).innerHTML = myCurAge;
}

// Calculate my age
// UTC month value is zero-based
calcDate([1995, 2, 13], "#i-am-age");

// Calculate how long I have been a programmer
// calcDate([2013, 0, 26], "#i-am-programmer");
