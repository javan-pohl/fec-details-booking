import React from 'react';
import _ from 'lodash';

function Highlights(props) {
  var selfCheck = `Check yourself in with the lockbox.`;
  console.log('props: ', props);
  if (props.lockBox) {
    selfCheck = `Check yourself in with the lockbox.`;
  } else {
    selfCheck = `Check in with the front desk upon arrival.`;
  }
  var monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul',
    'Aug','Sep','Oct','Nov','Dec'];
  var cancelMonth, halfCancelMonth, cancelDay, halfCancelDay, halfCancelDate;
  var today = new Date();
  if (props.checkIn) {
    var cancelBy = new Date(props.checkIn);
    halfCancelDate = new Date(Number(cancelBy));
    halfCancelDate.setDate(cancelBy.getDate() - props.cancelDays);
    var cancelDate = new Date(Number(halfCancelDate));
    cancelDate.setDate(halfCancelDate.getDate() - 2);
    cancelMonth = monthArr[cancelDate.getMonth()];
    cancelDay = cancelDate.getDate();
    halfCancelMonth = monthArr[halfCancelDate.getMonth()];
    halfCancelDay = halfCancelDate.getDate();
  }
  var sharedFalse =  {
    name: 'shared',
    value: false,
    header: `Entire ${props.houseType}`,
    desc: `You'll have the entire ${props.houseType} to yourself.`,
    icon: '../img/highlights/home.png'
  };
  var shared = {
    name: 'shared',
    value: true,
    header: `Private room in ${props.houseType}`,
    desc: `You'll have a private bedroom in the ${props.houseType}.`,
    icon: '../img/highlights/home.png'
  };
  var enhancedClean = {
    name: 'enhancedClean',
    header: `Enhanced Clean`,
    desc: `The host committed to Airbnb's 5-step enhanced cleaning proces.`,
    icon: '../img/highlights/enhancedClean.png'
  };
  var superHost = { 
    name: 'superHost',
    header: `${props.hostName} is a Superhost`,
    desc: `Superhosts are experienced, higly rated hosts who are committed to prividng great stays for guests.`,
    icon: '../img/highlights/superHost.png'
  };
  var selfCheckIn = { 
    name: 'selfCheckIn',
    header: `Self check-in`,
    desc: selfCheck,
    icon: '../img/highlights/selfCheckIn.png'
  };
  var cancellation = {
    name: 'cancellation',
    header: today >= halfCancelDate ? `Too late to cancel` : `Free cancellation until ${props.cancelTime}:00 PM on ${cancelMonth} ${cancelDay}`,
    desc: today >= halfCancelDate ? `It is too close to your desired check-in date to cancel. After booking, this reservation would be non-refundable` : `After that, cancel before ${props.cancelTime}:00 PM on ${halfCancelMonth} ${halfCancelDay} and get a 50% refund, minus the first night and service fee.`,
    icon: '../img/highlights/cancellation.png'
  }
  var cancellationFalse = {
    name: 'cancellation',
    header: `Cancellation Policy`,
    desc: `Add your trip dates to get the cancellation details for this stay.`,
    icon: '../img/highlights/cancellation.png'
  }
  var houseRulesArr = {
    kids: props.kids,
    pets: props.pets,
    smoking: props.smoking,
    parties: props.parties,
  }
  console.log('houseRulesArr', houseRulesArr);
  var houseRulesStr = '' + _.reduce(houseRulesArr, (memo, val, key, list) => {
    if (!val) {
      console.log('houserules: ', memo, key, list);
      return memo + key + ', '
    } else {
      return memo
    }
  }, '');
  console.log('houserulesstr: ', houseRulesStr);
  var houseRulesStr2 = houseRulesStr.length > 0 ? houseRulesStr + 'or dinosaurs.' : 'dinosaurs.';
  var houseRules = {
    name: 'house rules',
    header: `House rules`,
    desc: `This place ${props.kids ? 'is' : 'isn\'t'} suitable for children under 12 and the host doesn't allow ${houseRulesStr2}`,
    icon: '../img/highlights/houseRules.png'
  }
  var highlightProps = {
    shared: props.shared,
    enhancedClean: props.enhancedClean,
    selfCheckIn: props.selfCheckIn,
    superHost: props.superHost,
    cancellation: props.checkIn ? true : false,
    houseRules: true,
  }
  console.log('houseRulesStr: ', houseRulesStr);
  // const houseRulesStr = houseRulesFunc();
  var highlights = {
    shared,
    sharedFalse,
    enhancedClean,
    superHost,
    selfCheckIn,
    cancellation,
    cancellationFalse,
    houseRules
  };
  const highlightObjs = _.map(highlightProps, (val, key) => {
    return val ? highlights[key] : highlights[key + 'False'] || null
  });
  const RenderHighlights = () => {
    console.log('highlight objs: ', highlightObjs);
    var list = highlightObjs.map((val, i) => {
      if (val) {
        return RenderLine(val, i)
      }
    })
    return(
      <div>
        {list}
      </div>
    )
  }
  const RenderLine = (item, i) => {
    return (
      <div className="highlight-line height-35 margin-18-b flex-parent" key={i}>
        <div className="highlight-line-icon width-35px flex-basis-35px flex-child flex-space-between">
            <img src={item.icon} height="20" className="margin-neg-5-l"></img>
        </div>
        <div className="highlight-line-right margin-10-l flex-child width-auto">
          <div className="highlight-line-right-header highlight-heading ">
            {item.header}
          </div>
          <div className="highlight-line-right-description sub-heading ">
            {item.desc}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="details-module margin-20-t-b "> 
      {RenderHighlights()}
    </div>
  )
};

export default Highlights;