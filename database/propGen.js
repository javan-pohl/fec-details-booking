const db = require('./index.js');
const Prop = require('./Prop.js');
const amens = require('./amenGen.js');
const calendar = require('./calendarGen.js');
const descriptions = require('./textGen');
const names = require('./namesGen.js');

var ids = [];

var genProp = function() {
  var getPropId = function() {
    var propId = ids[ids.length - 1] + 1 || 1;
    ids.push(propId);
    return propId;
  };

  var id = getPropId();
  // names.getName(propId) to get name;
  var name = names.getName(id);

  var randomBoolean = function() {
    return Math.random() > .5 ? true : false;
  };

  var randomNum = function(min, max) {
    // 'max' to be the highest value you want selected
    return Math.floor(Math.random() * (max * .999 - min + 1) + min)
  }
  var randomNum2 = function(min, max) {
    // No rounding down of returned value
    return Math.random() * (max * .999 - min + 1) + min
  }
  var randomNum3 = function(min, max) {
    // allows for max values less than 1
    return Math.random() * (max - min) + min
  }
  var getGuestNum = () => randomNum(25, 8);
  const guestNum = getGuestNum();

  const numBedRooms = Math.floor(guestNum/4);
  var numBathRooms = Math.floor(numBedRooms * randomNum2(.7, 1.5));

  var getBeds = (num) => {
    switch(num) {
      case 1:
        return {bedType: 'King', num: 1}
      case 2: 
        return {bedType: 'Queen', num: randomNum(1, 2)}
      case 3: 
        return {bedType: 'Double', num: randomNum(1, 3)}
    }
  };
  var beds = [];
  for (var i = 0; i < numBedRooms; i++) {
    beds[i] = getBeds(randomNum(1,3));
  }

  var numBeds = () => beds.reduce((total, val) => total + val.num, 0);
  var bedNum = numBeds();

  var getEmail = () => {
    var emails = ['hotmail', 'gmail', 'yahoo', 'netscape'];
    return name.firstName + name.lastName + '@' + emails[randomNum(0, 3)] + '.com';
  }
  var cal = calendar.getCal();
  var minStay = cal[0].minStay;

  var propObj = {
    propId: id,
    hostName: name,
    numGuest: guestNum,
    numBedRooms: numBedRooms,
    numBeds: bedNum,
    numBathRooms: numBathRooms,
    beds: beds,
    kids: randomBoolean(),
    pets: randomBoolean(),
    parties: randomBoolean(),
    smoking: randomBoolean(),
    shared: randomBoolean(),
    enhancedClean: randomBoolean(),
    selfCheckIn: randomBoolean(),
    lockBox: randomBoolean(),
    // freeCancelHours: Number,
    // discCancelDays: Number,
    // fullRefundDays: Number,
    // cleaningRefundDays: Number,
    descriptionBody: descriptions.getDesc(id),
    hostEmail: getEmail(),
    amenities: amens.getAmens,
    calendar: cal,
    minStay: minStay,
    reviewRating: randomNum2(1 , 4.9),
    cityTaxRate: randomNum3(.005, .025),
    countyTaxRate: randomNum3(.005, .025),
    StateTaxRate: randomNum3(.005, .025)
  }
  return propObj;
}

var sample = [];
for (var i = 0; i < 100; i++) {
  sample[i] = genProp();
}

const insertSampleProps = function() {
  Prop.create(sample)
    .then(() => {
      console.log('sample data save success!');
      db.close();
    })
    .catch((err) => {
      console.log('error: ', err);
      db.close();
    })
};

insertSampleProps();
