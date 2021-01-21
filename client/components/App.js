import React from 'react';
import Details from './details/Details.js';
import Booking from './booking/Booking.js';
import Calendar from './calendar/Calendar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propId: 1,
      propData: null,
      checkInDate: null,
      checkOutDate: null,
      lastAvailI: null,
      hostName: null,
      isLoaded: false,
      roomInfo: {
        numGuest: null,
        numBedRooms: null,
        numBeds: null,
        numBaths: null
      },
      currentDate: new Date(),
      currentMonth: null,
      displayMonth: null,
      key: 0,
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/props/1')
      .then( res => res.json())
      .then(
        (results) => {
          console.log(results);
          this.setState({
            propData: results[0],
            roomInfo: {
              numGuest: results[0].numGuest,
              numBedRooms: results[0].numBedRooms,
              numBeds: results[0].numBeds,
              numBaths: results[0].numBathRooms
            },
            hostName: results[0].hostName.firstName,
            currentMonth: this.state.currentDate.getMonth(),
            displayMonth: this.state.currentDate.getMonth(),
            isLoaded: true
          })
        }
      )
      .catch( err => console.log('error: ... ', err))
  }
  getLastAvailI(i) {
    // we're going to find the last day before an unavailable day after check-in
    // take in a check-in date object
    // get index of check-in
    console.log('getLastAvail: ', i);
    var firstDateI = new Date(this.state.propData.calendar[0].date);
    console.log(firstDateI);
    var checkInI = (i - firstDateI)/ (1000*60*60*24);
    console.log(checkInI);
    console.log(this.state.propData.calendar[checkInI].date);
    // get index of first unavail date after
    var getNext = (element, i) => {
      return element.available === false && i > checkInI;
    }
    var indexNext = this.state.propData.calendar.findIndex(getNext, checkInI);
    console.log('indexNext: ', indexNext);
    // pausing this so I can find out why I can place my checkin date in March (but I can place the checkout date)
    if (indexNext > checkInI) {
      this.setState({
        lastAvailI: indexNext,
      })
    }
  }
  handleDateClick(i) {
    // console.log(i);
    var dateObj = new Date(i);
    // console.log('on date click: ', dateObj);
    // console.log('currentMonth: ', this.state.currentMonth);
    if(this.state.checkInDate) {
      var checkInObj = new Date(this.state.checkInDate);
      console.log('hangleDateclick, checkinobj: ', checkInObj);
      if(this.state.checkOutDate) {
        this.setState({
          checkInDate: i,
          checkOutDate: null,
          key: this.state.key + 1,
        });
        this.getLastAvailI(dateObj);
      } else {
        if (dateObj < checkInObj) {
          this.setState({
            checkInDate: i,
            key: this.state.key + 1,
          })
        this.getLastAvailI(dateObj);
        } else {
          this.setState({
            checkOutDate: i,
            lastAvailI: null,
            key: this.state.key -1,
          })
        }        
      }
    } else {
      this.setState({
        checkInDate: i,
        key: this.state.key + 1,
      });
      this.getLastAvailI(dateObj);
    }
  }
  handlePriorMonthClick() {
    // console.log('prior');
    // console.log(this.state.displayMonth, this.state.currentMonth);
    if(this.state.currentMonth !== this.state.displayMonth) {
      this.setState({
        displayMonth: this.state.displayMonth - 1,
        key: this.state.key - 1,
      })
    }
  }
  handleNextMonthClick() {
    // console.log('next month button clicked', this.state.displayMonth);
    console.log(this.state.displayMonth);
    if(this.state.displayMonth < 4) {
      this.setState({
        displayMonth: this.state.displayMonth + 1,
        key: this.state.key + 1
      })      
    }
    // this.render();
  }
  triggerStateChange() {
    var val = this.state.key;
    val++;
    this.setState({
      key: val,
    })
  }

  renderBooking() {
    if (this.state.isLoaded) {
      return <Details cal={this.state.propData.calendar}/>
    } else {
      return <div>Waiting on data to load...</div>
    }
  }

  renderCalendar() {
    if (this.state.isLoaded) {
      return <Calendar reviewRating={this.state.reviewRating} numReviews={this.state.numReviews} checkIn={this.state.checkInDate} checkOut={this.state.checkOutDate} date={this.state.currentDate} lastDateI={this.state.lastAvailI} month={this.state.displayMonth} minStay={this.state.propData.minStay} key={this.state.key} calendar={this.state.propData.calendar} onDateClick={(i) => this.handleDateClick(i)} onNextClick={() => this.handleNextMonthClick()} onPriorClick={() => this.handlePriorMonthClick()}/>
    } else {
      return <div>Waiting on data to load...</div>
    }
  }

  renderDetails() {
    if (this.state.isLoaded) {
      return <Details propId={this.state.propId} roomInfo={this.state.roomInfo}hostName={this.state.hostName}/>
    } else {
      return <div>Waiting on data to load...</div>
    }
  }
  render() {
    return(
      <div className="outer">
        <div className="details">
          {this.renderDetails()}
          {this.renderCalendar()}
        </div>
        <Booking />
      </div>
    )
  }
}



export default App;