import { Component, Input ,Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../booking.model';
@Component({
  selector: 'app-dates-guests-step',
  imports: [FormsModule],
  templateUrl: './dates-guests-step.html',
  styleUrl: './dates-guests-step.css',
})
export class DatesGuestsStep {

  @Input() booking!: Booking;

   get maxGuests(): number {

  return this.booking.room.maxGuests;

}

  errors = {
    checkIn: '',
    checkOut: '',
    guests: ''
  };

  submitted = false;

  validateDates(){


    const checkInDate = new Date(this.booking.checkIn);
    const checkOutDate = new Date(this.booking.checkOut);


    if(checkOutDate <= checkInDate){

      this.errors.checkOut =
        "Check out must be after check in";

    }
    else{

      this.errors.checkOut = "";
      this.calculateTotalPrice();


    }

  }



 validateCheckIn(){

    if(!this.booking.checkIn){

      this.errors.checkIn = "Check in date is required";

    }
    else{

      this.errors.checkIn = "";

      if(this.booking.checkOut){
        this.validateDates();
      }

    }

  }
   validateCheckOut(){

    if(!this.booking.checkOut){

      this.errors.checkOut = "Check out date is required";

      return;
    }


    this.validateDates();

  }


 increaseGuests(){

 if(this.booking.guests >= this.maxGuests){

    this.errors.guests =
      `Maximum guests allowed is ${this.maxGuests}`;

    return;
  }


  this.booking.guests++;
  this.errors.guests = "";

}


decreaseGuests(){

  if(this.booking.guests > 1){
    this.booking.guests--;
  }
  if(this.booking.guests <= this.maxGuests){
    this.errors.guests = "";
  }
}

validateAll(): boolean {
  this.submitted = true;

  console.log("Dates validateAll called");

  this.validateCheckIn();
  this.validateCheckOut();

   console.log(this.errors);


  return (
    !this.errors.checkIn &&
    !this.errors.checkOut &&
    !this.errors.guests
  );
}

calculateTotalPrice() {

  if (!this.booking.checkIn || !this.booking.checkOut) {
    this.booking.totalPrice = 0;
    return;
  }

  const checkIn = new Date(this.booking.checkIn);
  const checkOut = new Date(this.booking.checkOut);

  const difference =
    checkOut.getTime() - checkIn.getTime();

  const nights = difference / (1000 * 60 * 60 * 24);

  if (nights > 0) {
    this.booking.totalPrice =
      nights * this.booking.room.price;
  } else {
    this.booking.totalPrice = 0;
  }

}
}
