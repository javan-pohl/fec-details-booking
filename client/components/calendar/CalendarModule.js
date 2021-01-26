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
    for (var i = 0; i < numWeeks * 7; i++) {
      if (i >= firstWeekday && startingDate <= numDays) {
        arrayDays[i] = startingDate;
        startingDate++;
      } else {
        arrayDays[i] = null;
      }
    }

    var dateI = this.props.dateIndex;
    console.log('checkin: ', this.props.checkIn);
    console.log('checkout: ', this.props.checkOut);
    
    var checkInObj = new Date(this.props.checkIn);
    var checkOutObj = new Date(this.props.checkOut);    
    var checkInStr = checkInObj.toString();
    var checkOutStr = checkOutObj.toString();

    var calDays = arrayDays.map((val, i) => { 
      var dateValue = null;
      var divClass, buttonClass, clickFunction;
      if (val !== null) {
        dateValue = `${month + 1}/${val}/${year}`;
        var dateValObj = new Date(dateValue);
        var dateValStr = dateValObj.toString();
        if (dateValObj >= this.props.today && this.props.cal[dateI].available) {
          console.log('test 2....');
          divClass = 'cal-days-inner cal-day-available-not';
          buttonClass = 'cal-days cal-days-available-not';
          if (!this.props.checkIn && this.checkMinStay(dateI) || this.props.checkOut && this.checkMinStay(dateI)) {
            divClass = 'cal-days-inner cal-day-available';
            buttonClass = 'cal-days cal-days-available';
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
            console.log('in stay-day...');
            buttonClass += ' stay-day';
          }
          if (dateValStr === checkOutStr) {
            buttonClass += ' check-out-date';
          }
        } else {
          if (dateValStr === checkInStr) {
            buttonClass += ' check-in-date';
          } 
          if (this.props.checkIn && (((dateValObj - checkInObj) / (1000*60*60*24)) >= this.props.minStay) && this.props.cal[dateI].available) {
            if (this.props.lastDateI === null || (this.props.lastDateI !== null && (dateI < this.props.lastDateI))) {
              console.log('test 3....');
              divClass = 'cal-days-inner cal-day-available';
              buttonClass = 'cal-days cal-days-available';
              clickFunction = () => this.props.onDateClick(dateValue);
            }  
          } 
          ///////////////////////////////////
          console.log('test...', dateValObj, this.props.today, checkInObj, this.props.checkOut, checkOutObj);

          if (this.props.checkIn && dateValObj < checkInObj && dateValObj >= this.props.today && this.checkMinStay(dateI)) {
            console.log('test 4');
            divClass = 'cal-days-inner cal-day-available';
            buttonClass = 'cal-days cal-days-available';
            clickFunction = () => this.props.onDateClick(dateValue);
          }
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
    if (!this.props.checkOut && (this.props.lastDateI && (dateIndex > this.props.lastDateI))) {
      return false;
    }
    if (!this.props.checkIn || (this.props.checkIn && this.props.checkOut)) {
      var getNext = (element, i) => {
        return element.available === false && i > dateIndex;
      }
      var indexNext = this.props.cal.findIndex(getNext, dateIndex);
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

