import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingService } from './booking.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent implements OnInit {
  bookingService = inject(BookingService);
  bookings = signal<any[]>([]);
  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe((res: any) => {
      console.log(res);
      const activeBookings = res.data.bookings.filter(
        (booking: any) => booking.status !== 'cancelled',
      );
      this.bookings.set(activeBookings);
    });
  }
  cancelBooking(id: string) {
    this.bookingService.cancelBooking(id).subscribe({
      next: (res) => {
        this.bookings.update((bookings) => bookings.filter((booking) => booking._id !== id));
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
