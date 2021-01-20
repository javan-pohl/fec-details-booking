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

  handleDateClick(i) {
    console.log(i);
    var dateObj = new Date(i);
    console.log('on click: ', dateObj);
    console.log('currentMonth: ', this.state.currentMonth);
    if(!this.state.checkIn) {
      this.setState({
        checkIn: i
      })
    }
  }
  handlePriorMonthClick() {
    console.log('prior');
    console.log(this.state.displayMonth, this.state.currentMonth);
    if(this.state.currentMonth !== this.state.displayMonth) {
      this.setState({
        displayMonth: this.state.displayMonth - 1,
      })
    }
  }
  handleNextMonthClick() {
    console.log('next month button clicked', this.state.displayMonth);
    this.setState({
      displayMonth: this.state.displayMonth + 1,
    })
    // this.render();
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
      return <Calendar reviewRating={this.state.reviewRating} numReviews={this.state.numReviews} date={this.state.currentDate} month={this.state.displayMonth} key={this.state.displayMonth} calendar={this.state.propData.calendar} onDateClick={(i) => this.handleDateClick(i)} onNextClick={() => this.handleNextMonthClick()} onPriorClick={() => this.handlePriorMonthClick()}/>
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