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

class Month extends React.Component {
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
    var numDays = (lastDay - firstDay) / (1000*60*60*24);
    var numWeeks = Math.ceil((numDays + firstWeekday - .99) / 7);
    month = month;
    year = year.substring(1);
    year = '20' + year;
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
    var calDays = arrayDays.map((val, i) => <button className='cal-days' id={val === null ? 0 : `${month}/${val}/${year}`} key={i}>{val}</button>);
    this.setMY(calDays, month, year);
  }
  setMY(days, monthNum, yearNum) {
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
class CalendarModule extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Month date={this.props.date}/>
    )
  }
}


export default CalendarModule;