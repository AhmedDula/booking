import { Component, signal, inject, computed } from '@angular/core';
import { BookingRequest, RoomSummary, UserSummary } from './booking.model';
import { BookingService } from './booking.service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { form, required, min, submit } from '@angular/forms/signals';
import { FormField } from '@angular/forms/signals';
import { RoomService } from '../rooms/room.service';

@Component({
  selector: 'app-booking-form',
  imports: [FormField],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  roomService = inject(RoomService);

  bookingService = inject(BookingService);
  authService = inject(AuthService);

  room = signal<any>(null);
  bookingModel = signal<BookingRequest>({
    room: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
    specialRequests: '',
  });
  ngOnInit(): void {
    const roomId = this.route.snapshot.params['roomId']; ;

    this.bookingModel.update((booking) => ({
      ...booking,
      room: roomId,
    }));

    this.roomService.getRoomById(roomId).subscribe({
      next: (res) => {
        this.room.set(res.data);
      },
    });
  }

  bookingForm = form(this.bookingModel, (schema) => {
    required(schema.room);

    required(schema.checkIn, { message: 'CheckIn is required' });

    required(schema.checkOut, { message: 'CheckOut is required' });
    required(schema.guests, {
      message: 'Guests is required',
    });
    min(schema.guests, 1, { message: 'guests must be at least one' });
  });

  async onSubmit(e: Event) {
    e.preventDefault();

    await submit(this.bookingForm, async (val) => {
      const booking = val().value();
      if (booking.guests > this.room().maxGuests) {
        alert(`Maximum guests allowed is ${this.room().maxGuests}`);
        return;
      }
      if (booking.checkOut <= booking.checkIn) {
        alert('Check-out date must be after Check-in date');
        return;
      }
      this.router.navigate(['/bookings/confirmation'], {
        state: {
          booking,
        },
      });
    });
  }
}

// try {
//   const currentUser = this.authService.currentUser() as any;

//   const bookingData = {
//     ...val().value(),
//     user: currentUser?.data?.user?.id,
//   };
//   console.log('Booking Data:', bookingData);

//   console.log(this.authService.currentUser());
//   // Check Dates
//   const checkIn = new Date(bookingData.checkIn);
//   const checkOut = new Date(bookingData.checkOut);

//   if (checkOut <= checkIn) {
//     alert('Check-out date must be after Check-in date');
//     return;
//   }
//   // // Check Guests
//   // if (bookingData.room.maxGuests() && booking.guests > this.room()!.maxGuests) {
//   //   alert(`Maximum guests allowed is ${this.room()!.maxGuests}`);
//   //   return;
//   // }
//   const res = await this.bookingService.createBooking(bookingData);

//   console.log('Response:', res);
// } catch (err: any) {
//   alert(JSON.stringify(err.error.message));
// }
