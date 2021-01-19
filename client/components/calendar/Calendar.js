import React from 'react';
import CalendarModule from './CalendarModule.js';

const CalendarTitle = (props) => {
  if (props.checkInDate) {
    return (
      <div className="calendar-heading">
        <div className="caldenarTitle">
          Select Checkout Date
        </div>
        <div className="calendar-sub-heading">
          Minimum stay: (to_fill_in) nights
        </div>
      </div>
    )
  } else {
    return (
      <div className="calendar-heading">
        <div className="caldenar-title">
          Select check-in date
        </div>
        <div className="calendar-sub-heading">
          Add your travel dates for exact pricing
        </div>
    </div>
    )
  }
}

const ScrollBar = () => {
  return (
    <div className="cal-scroll-bar">
      <button id="calLeftButton" className="cal-button">&lt;</button>
      <button id="calRightButton" className="cal-button">&gt;</button>      
    </div>
  )
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstMonth: {
        firstDay: null
      },
      secondMonth: {
        firstDay: null
      },
      isLoaded: false,
      windowWidth: 800,
    }
  }
  renderMonth(firstDay) {
    var firstWeekday = firstDay.getDay();
    var lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 1);
    var month = firstDay.getMonth();
    var year = firstDay.getYear();
    var numDays = (lastDay - firstDay) / (1000*60*60*24);
    var numWeeks = Math.ceil((numDays + firstWeekday - .99) / 7);
    // var numCells = numWeeks * 7;
    var arrayDays = new Array(numWeeks * 7);
    var calDays = arrayDays.map((val, i) => <div className="cal-days">{i}</div>);
    return (
      <div className="cal-days-block">
        {calDays}
      </div>
    )
  }

  componentDidMount() {
    var today = this.props.date;
    var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    var secondMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    console.log('calendar did mount');
    console.log(today);
    this.setState({
      firstMonth: {
        firstDay: firstDay
      },
      secondMonth: {
        firstDay: secondMonth
      },
      isLoaded: true,
    })
    // this.renderMonth(firstDay);
  }
  
  renderModules() {
    if (this.state.isLoaded) {
      if (this.state.windowWidth < 850) {
        return (
          <div className="calendar-block"> 
              <ScrollBar />
              <div className="calendar-module">
                <CalendarModule date={this.state.firstMonth.firstDay} onDateClick={(i) => this.props.onDateClick(i)}/>
              </div>            
            </div>         
        )
      } else {
        return (
          <div className="calendar-block"> 
            <ScrollBar />
            <div className="calendar-module">
              <CalendarModule />
              <CalendarModule />
            </div>
          </div>
        )
      }
    } else {
      return (
        <div>Waiting for data...</div>
      )
    }
  }

  render() {
    return(
      <div className="calendar">
        <CalendarTitle />
        {this.renderModules()}
      </div>      
    )
  }
}

export default Calendar;