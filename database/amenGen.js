

var amenities = "Basic:\nWifi\nDryer\nHeating\nTV\nIron\nWasher\nEssentials:\nTowels, bed sheets, soap, and toilet paper\nAir conditioning\nHot water\nFacilities:\nFree parking on premises\nDining:\nKitchen\nSpace where guests can cook their own meals\nBaking sheet\nStove\nDishes and silverware\nMicrowave\nCoffee maker\nCooking basics\nPots and pans, oil, salt and pepper\nBarbecue utensils\nDishwasher\nOven\nRefrigerator\nGuest access:\nPrivate entrance\nSeparate street or building entrance\nLockbox\nLogistics:\nLong term stays allowed\nAllow stay for 28 days or more\nBed and bath:\nHangers\nHair dryer\nExtra pillows and blankets\nBed linens\nOutdoor:\nPatio or balcony\nBBQ grill\nGarden or backyard\nSafety features:\nSecurity cameras on property\nSmoke alarm\nCarbon monoxide alarm\nFire extinguisher\nFirst aid kit";

var amenArr = amenities.split('\n');

var amenObs = [];
var category = '';
for (var i = 0; i < amenArr.length; i++) {
  if (amenArr[i].charAt(amenArr[i].length - 1) === ':') {
    category = amenArr[i];
  } else {
    amenObs.push({category: category, name: amenArr[i], available: Math.random() > .05 ? true : false});
  }
};

var getAmens = (propId) => amenObs[propId - 1];

// console.log(amenObs);

module.exports.getAmens = amenObs;