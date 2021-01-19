import React from 'react';
import BookingModule from './BookingModule.js';

class Booking extends React.Component {
  constructor(props) {
    super(props);      
  }
  render() {
    return(
      <div className="booking">
        <BookingModule />
      </div>
    )
  }
}

export default Booking;