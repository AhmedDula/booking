import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../bookings/booking.service';
import { Booking } from '../bookings/booking.model';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  activePage: string = 'overview';
  bookings: Booking[] = [];
  cdr = inject(ChangeDetectorRef);
  constructor(private bookingService: BookingService) {}

  changePage(page: string) {
    this.activePage = page;

    if (page === 'bookings') {
      this.getBookings();
    }
  }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getAllBookings().subscribe({
      next: (res) => {
        this.bookings = res.data.bookings;
        console.log('FULL RESPONSE:', res);

        this.bookings = res.data.bookings;

        console.log('LENGTH:', this.bookings.length);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateStatus(id: string, status: string) {
    this.bookingService.updateBookingStatus(id, status).subscribe({
      next: () => {
        this.getBookings();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
