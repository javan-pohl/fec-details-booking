import React from 'react';


const MonthHeader = (props) => {
  return (
    <div className='month-header-bar'>
      <div className='month-header-div'>
        {props.month} {props.year}
      </div>
    </div>
  )
}

const DaysOfWeek = () => {
  return (
    <div className='days-of-weeks-bar flex-parent-horz'>
      <div id='sunday' className='day-of-week flex-child-horz flex-grow center'>Su</div>
      <div id='monday' className='day-of-week flex-child-horz flex-grow center'>Mo</div>
      <div id='tuesday' className='day-of-week flex-child-horz flex-grow center'>Tu</div>
      <div id='wednesday' className='day-of-week flex-child-horz flex-grow center'>We</div>
      <div id='thursday' className='day-of-week flex-child-horz flex-grow center'>Th</div>
      <div id='friday' className='day-of-week flex-child-horz flex-grow center'>Fr</div>
      <div id='saturday' className='day-of-week flex-child-horz flex-grow center'>Sa</div>
    </div>
  )
}

class CalendarModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: null,
      month: null,
      year: null,
      isLoaded: false
    }
  }
  componentDidMount() {
    // this.checkMinStay();
    // console.log('calModule checkin date: ', this.props.checkIn);

    var firstDay = this.props.date;
    var firstWeekday = firstDay.getDay();
    var lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 1);
    var month = firstDay.getMonth();
    var year = '' + firstDay.getYear();
    year = '20' + year.substring(1);
    var numDays = (lastDay - firstDay) / (1000*60*60*24);
    var numWeeks = Math.ceil((numDays + firstWeekday - .99) / 7);
    
    var arrayDays = [];
    var startingDate = 1;
    // console.log('this.props.cal: ', this.props.cal);
    for (var i = 0; i < numWeeks * 7; i++) {
      if (i >= firstWeekday && startingDate <= numDays) {
        // arrayDays[i] = startingDate;
        arrayDays[i] = startingDate;
        startingDate++;
      } else {
        arrayDays[i] = null;
      }
    }

    var dateI = this.props.dateIndex;
    var checkInObj = new Date(this.props.checkIn);
    var checkOutObj = new Date(this.props.checkOut);    
    var checkInStr = checkInObj.toString();
    var checkOutStr = checkOutObj.toString();
    // put "last checkout-date" in state. the day after checkin but right before the first "unavailable" day. then we can do a quick check for all dates after that to exclude them from being the checkout date (and not put the onclick function there)

    var calDays = arrayDays.map((val, i) => { 
      var dateValue = null;
      var divClass, buttonClass, clickFunction;
      if (val !== null) {
        dateValue = `${month + 1}/${val}/${year}`;
        var dateValObj = new Date(dateValue);
        var dateValStr = dateValObj.toString();
        // console.log(dateI);
        // console.log('calmod line 78: ', this.props.cal[dateI]);
        if (dateValObj >= this.props.today && this.props.cal[dateI].available) {
          divClass = 'cal-days-inner cal-day-available';
          buttonClass = 'cal-days cal-days-available';
          if (!this.props.checkIn && this.checkMinStay(dateI) || this.props.checkOut && this.checkMinStay(dateI)) {
            //then add click function in here
            clickFunction = () => this.props.onDateClick(dateValue);
          } 
        } else {
          divClass = 'cal-days-inner cal-date-unavailable';
          buttonClass = 'cal-days cal-days-unavailable';
        }
        if (this.props.checkOut) {
          if (dateValStr === checkInStr) {
            buttonClass += ' check-in-stay';
          }
          if (dateValObj > checkInObj && dateValObj < checkOutObj) {
            buttonClass += ' stay-day';
          }
          if (dateValStr === checkOutStr) {
            // console.log('adding check-out-date class');
            buttonClass += ' check-out-date';
          }
        } else {
          if (dateValStr === checkInStr) {
            // console.log('adding check-in-date class');
            buttonClass += ' check-in-date';
          } 
          // console.log('calmod line 106: ', this.props.cal[dateI]);
          if (this.props.checkIn && (((dateValObj - checkInObj) / (1000*60*60*24)) >= this.props.minStay) && this.props.cal[dateI].available) {
            clickFunction = () => this.props.onDateClick(dateValue);
          } 
          if (this.props.checkIn && dateValObj < checkInObj) {
            clickFunction = () => this.props.onDateClick(dateValue);
          }
        }
        // if (dateI > this.props.lastDateI) {
        //   clickFunction = null;
        // }
        if(this.props.lastDateI && dateI > this.props.lastDateI) {
          clickFunction = null;
        }
        dateI++;
        return (
          <button className={buttonClass} id={dateValue} key={i} onClick={clickFunction}><div className={divClass} key={i}>{val}</div></button>
        )
      } else {
        return <div className='cal-days' id={dateValue} key={i}>{val}</div>
      }
    });

    this.setDMY(calDays, month, year);
  }
  checkMinStay(dateIndex) {
    // take in the (proposed check-in... or check-out) date and return true or false depending on if the date is at least the min-stay length away from the next unavailable day (or, in the case of check-out, the distance from the check-in)
    // maybe also trigger a state "check-in-warning" value?
    if (dateIndex > this.props.lastDateI) {
      return false;
    }
    if (!this.props.checkIn || (this.props.checkIn && this.props.checkOut)) {
      // console.log('calmod 136: ');
      var getNext = (element, i) => {
        return element.available === false && i > dateIndex;
      }
      var indexNext = this.props.cal.findIndex(getNext, dateIndex);
      // console.log('checkMinStay. CurrentIndex & IndexNextUnavailable: ', dateIndex, indexNext, indexNext - dateIndex);
      if (indexNext === -1 || indexNext < dateIndex) {
        // console.log('dateIndex: ', indexNext, dateIndex);
        // console.log('indexNext === -1, TRUE');
        return true;
      }
      if ((indexNext - dateIndex) >= this.props.minStay + 1) {
        // console.log('dateIndex: ', indexNext, dateIndex);
        // console.log('indexNext 2nd test, TRUE');
        return true;
      } else {
        // console.log('dateIndex: ', indexNext, dateIndex);
        // console.log(indexNext, dateIndex);
        // console.log('FALSE');
        return false;
      }
    }
  }
  setDMY(days, monthNum, yearNum) {
    var monthArr = ['January','February','March','April','May','June','July',
    'August','September','October','November','December'];
    var month = monthArr[monthNum];
    this.setState({
      days: days,
      month: month,
      year: yearNum,
      isLoaded: true
    });
  }
  renderDays() {
    if (this.state.isLoaded) {
      return (
        <div className='cal-days-block'>
          {this.state.days}
        </div>
      )
    }
  }  
  render() {
    return (
      <div className='month-module'>
        <MonthHeader month={this.state.month} year={this.state.year}/>
        <DaysOfWeek />
        {this.renderDays()}
      </div>
    )
  }
}

export default CalendarModule;

// class CalendarModule extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <Month date={this.props.date}/>
//     )
//   }
// }

