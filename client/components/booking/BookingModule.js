import React from 'react';

const BookingUpper = (props) => {
  var showRate;
  return(
    <div className="booking-upper-main">
      <div className="booking-upper-left">
        <div className="booking-upper-left-dollar inline-block">
          ${props.maxRate}
        </div>
        <div className="booking-upper-left-night inline-block">
        / night
        </div>        
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
  var numGuests = props.Adults + props.Children;
  console.log('check in, props: ', props);
  var guestText, displayForm;
  numGuests > 1 ? guestText = ' guests' : guestText = ' guest';
  const FormMainRow = function(category, desc) {
    return(
      <div className="guest-form-main-row">
        <div className="guest-row-left inline-block float-left">
          <div className="guest-row-left-upper">
            {category}
          </div>
          <div className="guest-row-left-lower">
            {desc}
          </div>
        </div>
        <div className="guest-row-right inline-block float-right">
          <div className="guest-row-right-left-arrow guest-row-button inline-block " onClick={() => props.onNegClick(category)}>
            <div className="guest-button-inner">-</div>
          </div>
          <div className="guest-row-right-mid inline-block ">
            <div className="guest-row-val">
              {props[category]}
            </div>
          </div>
          <div className="guest-row-right-right-arrow guest-row-button inline-block " onClick={() => props.onPlusClick(category)}><div className="guest-button-inner">+</div></div>
        </div>
      </div>
    )
  }
  const GuestForm = () => {
    !props.showGuest ? displayForm = 'booking-guest-form display-false' : displayForm = 'booking-guest-form display-true';
    return (
      <div className={displayForm}>
        <div className="guest-form-inner">
          {FormMainRow('Adults', 'cranky buggers')}
          {FormMainRow('Children', 'Ages 2-12')}
          {FormMainRow('Infants', 'Under 2')}
          <div className="guest-form-main-row light-grey-text-11-5">
            {props.maxGuests} guests maximum. Infants don't count towards the number of guests.
          </div>
          <div className="guest-form-last-row">
            <div className="guest-form-close" onClick={() => props.onClose()}>
              Close
            </div>
          </div>
        </div>
      </div>
      
    )
  }
  return(
    <div className="booking-middle">
      <div className="booking-middle-upper">
        <div className="booking-middle-upper-left">
          <div className="booking-check-in-name booking-header">
            CHECK-IN
          </div>
          <div className="booking-check-in-field booking-field">
            {props.checkIn || 'Add date'}
          </div>
        </div>    
        <div className="booking-middle-upper-right">
          <div className="booking-check-out-name booking-header">
            CHECK-OUT
          </div>
          <div className="booking-check-out-field booking-field">
            {props.checkOut || 'Add date'}
          </div>
        </div>       
      </div>
      <div className="booking-middle-lower booking-header booking-guests" onClick={() => props.onClickGuest()}>
        <div className="booking-guests-flex-parent">
          <div className="booking-guests-left">
            <div className="booking-header booking-guests-header">
            GUESTS
            </div>
            <div className="booking-guests-field booking-field">
              {numGuests} {guestText}
            </div>
          </div>
          <div className="booking-guests-right booking-arrow">
            <img src="../img/small-arrow-transp.png" width="20"></img>
          </div>
        </div>
      </div>
        {GuestForm()}
    </div>
  )
}

const Rates = (props) => {

}

class BookingModule extends React.Component {
  constructor(props) {
    super(props);     
    this.state = {
      rate: this.props.maxRate,
      avgRate: null,
      stayLength: null,
      numGuests: 1,
      Adults: 1,
      Children: 0,
      Infants: 0,
      guests: {
        Adults: 1,
        Children: 0,
        Infants: 0,
      },
      showCal: false,
      showGuest: false,
    } 
  }
  
  handleDateFieldClick() {
    console.log('clicked');
    if (!this.state.showCal) {
      this.setState({
        showCal: true
      })
    }
  }
  handleCloseForm() {
    this.setState({
      showGuest: false,
    })
  }
  handleGuestClick() {
    console.log('clicked on guest');
    var show;
    this.state.showGuest ? show = false : show = true;
    var showOther = !show;
    console.log('show: ', show, showOther);
    // do I need a way to change if the calendar is showing? I don't think you can click to show the guestForm if the calendar is showing
    // but i might need it the other way (i.e. if the guestForm is showing, turn it off when the calendar is clicked)
    this.setState({
      showGuest: show,
    })
  }
  handleIncreaseGuest(category) {
    console.log('clicked, category: ', category);
    var amount = this.state[category];
    amount++;
    console.log('amount: ', amount);
    this.setState({
      [category]: amount,
    });
    this.setGuestNum();
  }
  handleDecreaseGuest(category) {
    console.log('clicked, category: ', category);
    var amount = this.state[category];
    amount--;
    console.log('amount: ', amount);
    if (amount >= 0) {
      this.setState({
        [category]: amount,
      });
    }
    this.setGuestNum();
  }
  setGuestNum() {
    var guestNum = this.state.Adults + this.state.Children + this.state.Infants;
    this.setState({
      numGuests: guestNum,
    })
  }
  componentDidUpdate(prevProps) {
    if (this.props.checkOut !== prevProps.checkOut) {
      this.calcAvgRate();
    }
  }
  calcAvgRate() {
    var avg;
    var numNights = this.calcStayLength();
    console.log('stayLength', numNights);
    var checkInObj = new Date(this.props.checkIn);
    var firstDayObj = new Date(checkInObj.getFullYear(), 0, 1);
    var checkInI = (checkInObj - firstDayObj) / (1000*60*60*24);
    console.log('checkInI', checkInI);
    var sumOfRates = 0;
    for (var i = checkInI; i < numNights + checkInI; i++) {
      sumOfRates += (this.props.cal[i].rate * (1 - this.props.cal[i].discPerc));
    }
    avg =  sumOfRates / numNights;
    console.log('calcAvgRate, avg: ', avg);
    this.setState({
      avgRate: avg,
      stayLength: numNights,
    })
  }
  calcStayLength() {
    console.log('calcStayLength...');
    if (this.props.checkOut) {
      var numNights = (new Date(this.props.checkOut) - new Date(this.props.checkIn)) / (1000*60*60*24);
      return numNights
    } 
    return null
  }
  renderCharges() {
    if (this.props.checkOut) {
      var numNightsStr = `$${this.props.maxRate} x ${this.state.numNights} nights`;
      console.log('renderCharges: ', this.state.avgRate, this.state.stayLength);
    }
  }
  render() {
    console.log(this.props);
    return(
      <div className="booking">
        <div className="booking-module">
          <BookingUpper  
            maxRate={this.props.maxRate} 
            reviewNum={this.props.reviewNum} 
            reviewRating={this.props.reviewRating.toFixed(1)} 
          />
          <CheckIn 
            Adults={this.state.Adults} 
            Children={this.state.Children} 
            Infants={this.state.Infants}           
            checkIn={this.props.checkIn} 
            checkOut={this.props.checkOut} 
            guests={this.state.guests} 
            maxGuests={this.props.maxGuests} 
            numGuests={this.state.numGuests} 
            showGuest={this.state.showGuest} 
            onClickGuest={() => this.handleGuestClick()} 
            onClose={() => this.handleCloseForm()}
            onNegClick={(i) => this.handleDecreaseGuest(i)} 
            onPlusClick={(i) => this.handleIncreaseGuest(i)} 
            />
          <div className="check-button-div">
            <div className="check-button">
              Check Availability
            </div>
          </div>
          {this.renderCharges()}
        </div>
      </div>
    )
  }
}

export default BookingModule;