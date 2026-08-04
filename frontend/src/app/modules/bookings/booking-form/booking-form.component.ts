import { Component , ViewChild } from '@angular/core';
import { BookingStepperComponent } from '../components/booking-stepper/booking-stepper';
import { BookingSummaryComponent } from '../components/booking-summary/booking-summary';
import { Booking } from '../booking.model';
import { RoomStep } from '../components/room-step/room-step';
import { DatesGuestsStep } from '../components/dates-guests-step/dates-guests-step';
import { DetailsStep } from '../components/details-step/details-step';
import { ConfirmationStep } from '../components/confirmation-step/confirmation-step';
@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    BookingStepperComponent,
    BookingSummaryComponent,
    DatesGuestsStep,
    DetailsStep,
    RoomStep,
    ConfirmationStep,
  ],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css',
})
export class BookingFormComponent {

  currentStep = 1;


  booking: Booking = {

    user: '',

    room: {
      _id: '',
      property: '',
      name: 'Deluxe King Room',
      description:
        'A spacious deluxe room with a king-size bed and city view.',
      price: 150,
      maxGuests: 2,
      beds: 1,
      bathrooms: 1,
      roomSize: 35,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200'
      ],
      amenities: [],
      available: true,
    },

    checkIn: '',
    checkOut: '',

    guestName: '',
    guestEmail: '',
    guestPhone: '',
    guests: 1,

    totalPrice: 0,

    status: 'pending',

    specialRequests: '',

  };
  nextStep(){

   let valid = true;

  switch (this.currentStep) {

    case 1:
      valid = this.roomStep.validateAll();
      break;

    case 2:
      valid = this.datesStep.validateAll();
      break;

    case 3:
      valid = this.detailsStep.validateAll();
      break;

  }

  if (!valid) {
    return;
  }

  if (this.currentStep < 4) {
    this.currentStep++;
  }

}


previousStep(){

  if(this.currentStep > 1){
    this.currentStep--;
  }

}
confirmBooking() {

  console.log(this.booking);

}
@ViewChild(RoomStep)
roomStep!: RoomStep;

@ViewChild(DatesGuestsStep)
datesStep!: DatesGuestsStep;

@ViewChild(DetailsStep)
detailsStep!: DetailsStep;

}
