import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { BookingRequest } from './booking.model';
import { BookingService } from './booking.service';
import { RoomService } from '../rooms/room.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-booking-confirmation',
  imports: [],
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.scss',
})
export class BookingConfirmationComponent {
  router = inject(Router);
  roomService = inject(RoomService);
  bookingService = inject(BookingService);
  authService = inject(AuthService);

  booking = signal<BookingRequest>(history.state.booking);

  room = signal<any>(null);

  loading = signal(false);

  ngOnInit(): void {
    if (!this.booking()) {
      this.router.navigate(['/']);
      return;
    }

    this.roomService.getRoomById(this.booking().room).subscribe({
      next: (res) => {
        this.room.set(res.data);
      },
    });
  }

  nights = computed(() => {
    if (!this.booking().checkIn || !this.booking().checkOut) return 0;

    const checkIn = new Date(this.booking().checkIn);
    const checkOut = new Date(this.booking().checkOut);

    const diff = checkOut.getTime() - checkIn.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  });

  totalPrice = computed(() => {
    if (!this.room()) return 0;

    return this.nights() * this.room().price;
  });

  goBack() {
    this.router.navigate(['/bookings/new', this.booking().room], {
      state: {
        booking: this.booking(),
      },
    });
  }

  async confirmBooking() {
    try {
      this.loading.set(true);

      const currentUser = this.authService.currentUser() as any;

      const bookingData = {
        ...this.booking(),
        user: currentUser?.data?.user?.id,
      };

      const res = await this.bookingService.createBooking(bookingData);

      console.log(res);

      alert('Booking created successfully.');

      this.router.navigate(['/my-bookings']);
    } catch (err: any) {
      alert(err.error.message);
    } finally {
      this.loading.set(false);
    }
  }
}
