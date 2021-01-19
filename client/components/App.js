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
            checkIn: null,
            checkOut: null,
            roomInfo: {
              numGuest: results[0].numGuest,
              numBedRooms: results[0].numBedRooms,
              numBeds: results[0].numBeds,
              numBaths: results[0].numBathRooms
            },
            hostName: results[0].hostName.firstName,
            isLoaded: true
          })
        }
      )
      .catch( err => console.log('error: ... ', err))
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
      return <Calendar reviewRating={this.state.reviewRating} numReviews={this.state.numReviews} date={this.state.currentDate} calendar={this.state.calendar}/>
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