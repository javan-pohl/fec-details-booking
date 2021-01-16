


var getCal = () => {
  Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
  }

  function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(currentDate)
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
  }

  var random = function(min, max) {
    // 'max' to be the highest value you want selected
    return Math.floor(Math.random() * (max * .999 - min + 1) + min)
  }

  // set a random baseRate from 100 - 200 dollars
  var getBaseRate = () => random(10, 20) * 10 ;
  var baseRate = getBaseRate();

  // set up a way to randomize the discount rate (which will be done on a weekly basis)
  var discounts = [0, .1, .15, .2];
  var getRandomDisc = () => discounts[random(0 , 3)];

  var round5 = (x) => Math.ceil(x/5) * 5;

  // repeat values allow for weighted randomness
  var getMinStay = [2, 2, 2, 3, 3, 3, 3, 3, 7, 7, 14];
  var minStay = getMinStay[random(0, getMinStay.length - 1)];

  var dateArray = getDates(new Date(), (new Date()).addDays(180));
  dateArray = dateArray.map((val) => {
    return {date: val}
  })

  var addDateInfo = function(objArr) {
    var weeklyDisc = getRandomDisc();
    objArr.forEach((val, i) => {
      if (i > 0) {
        if (val.date.getDay() === 0) {
          weeklyDisc = getRandomDisc();
        }
      }
      // increase weight for the weekend
      val.date.getDay() >= 5 ? val.rate = round5(baseRate * 1.25) : val.rate = baseRate;
      val.discPerc = weeklyDisc;
      val.available = true;
      val.minStay = minStay;
    });
    return objArr;
  }

  dateArray = addDateInfo(dateArray);

  var addRandomBlocks = function(calObj) {
    var firstDay = 1;
    var lastDate = 7;
    var startDate = random(firstDay, lastDate);
    var numOfDays = minStay;
    for (var i = startDate; i < (startDate + numOfDays); i++) {
      calObj[i].available = false;
    }
    return calObj;
  }
  dateArray = addRandomBlocks(dateArray);
  return dateArray;
}

// console.log(dateArray);


module.exports.getCal = getCal;
