import React from 'react';

const BookingUpper = (props) => {
  return(
    <div className="booking-upper-main">
      <div className="booking-upper-left">
        ${props.maxRate} / night
      </div>
      <div className="booking-reviews"> 
        <div className="booking-reviews-rating">
          {props.reviewRating}
        </div>
        <div className="booking-reviews-number">
          ({props.reviewNum})
        </div>
      </div>
    </div>
  )
} 

const CheckIn = (props) => {
  return(
    <div className="booking-middle">
      <div className="booking-middle-upper">
        <div className="booking-middle-upper-left">
          CHECK-IN
          {props.checkIn}
        </div>
        <div className="booking-middle-upper-right">
          CHECKOUT
          {props.checkOut}
        </div>
      </div>
      <div className="booking-middle-lower">
        GUESTS
        {props.numGuests}
      </div>
    </div>
  )
}

class BookingModule extends React.Component {
  constructor(props) {
    super(props);      
  }
  
  render() {
    console.log(this.props);
    return(
      <div className="booking">
        <div className="booking-module">
          <BookingUpper maxRate={this.props.maxRate} reviewNum={this.props.reviewNum} reviewRating={this.props.reviewRating.toFixed(2)}/>
          <CheckIn />
          <div className="check-button-div">
            <div className="check-button">
              Check Availability
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookingModule;