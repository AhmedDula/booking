import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BookingService } from '../bookings/booking.service';
import { AuthService } from '../auth/auth.service';
interface Booking {
  id: string;
  property: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  status: 'confirmed' | 'completed' | 'cancelled' | 'pending';
}

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './admin.bookings.html',
})
export class AdminBookingsComponent implements OnInit {
  private authService = inject(AuthService);
  private bookingService = inject(BookingService);
  readonly adminName = computed(() => {
    const user = this.authService.currentUser() as any;
    return user?.data?.user?.name ?? '';
  });

  readonly adminRole = computed(() => {
    const user = this.authService.currentUser() as any;
    return user?.data?.user?.role ?? '';
  });
  readonly adminAvatar = signal(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  );

  readonly today = signal(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  );

  readonly search = signal('');

  readonly bookings = signal<Booking[]>([]);

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (res) => {
        console.log(res.data.bookings);
        const data = res.data.bookings.map((booking: any) => ({
          id: booking._id,
          property: '-',
          room: booking.room?.name ?? '-',
          checkIn: new Date(booking.checkIn).toLocaleDateString(),
          checkOut: new Date(booking.checkOut).toLocaleDateString(),
          nights: Math.ceil(
            (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
          total: booking.totalPrice,
          status: booking.status,
        }));

        this.bookings.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  confirmBooking(id: string): void {
    this.bookingService.updateBookingStatus(id, 'confirmed').subscribe({
      next: () => this.loadBookings(),
      error: (err) => console.error(err),
    });
  }

  cancelBooking(id: string): void {
    this.bookingService.updateBookingStatus(id, 'cancelled').subscribe({
      next: () => this.loadBookings(),
      error: (err) => console.error(err),
    });
  }
  readonly filteredBookings = computed(() => {
    const term = this.search().toLowerCase().trim();

    if (!term) {
      return this.bookings();
    }

    return this.bookings().filter(
      (booking) =>
        booking.id.toLowerCase().includes(term) ||
        booking.room.toLowerCase().includes(term) ||
        booking.status.toLowerCase().includes(term),
    );
  });
}
