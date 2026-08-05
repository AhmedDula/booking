import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Booking {
  id: string;
  property: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './admin.bookings.html',
})
export class AdminBookingsComponent {
  readonly adminName = signal('Marcus Chen');
  readonly adminRole = signal('Administrator');
  readonly adminAvatar = signal(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  );
  readonly today = signal(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  readonly search = signal('');

  readonly bookings = signal<Booking[]>([
    { id: 'book-001', property: 'Villa Sereno', room: 'The Jungle Master Suite', checkIn: 'Sep 14, 2026', checkOut: 'Sep 21, 2026', nights: 7, total: 12950, status: 'Confirmed' },
    { id: 'book-002', property: 'Azure Heights', room: 'Aegean Sea Suite', checkIn: 'Oct 1, 2026', checkOut: 'Oct 6, 2026', nights: 5, total: 15500, status: 'Confirmed' },
    { id: 'book-003', property: 'Cedar Peak Lodge', room: 'Summit Master Suite', checkIn: 'Feb 14, 2026', checkOut: 'Feb 20, 2026', nights: 6, total: 5880, status: 'Completed' },
    { id: 'book-004', property: 'La Dolce Vista', room: 'Il Palazzo Suite', checkIn: 'Aug 1, 2025', checkOut: 'Aug 9, 2025', nights: 8, total: 16800, status: 'Completed' },
  ]);

  confirmBooking(id: string): void {
    this.bookings.update((list) =>
      list.map((b) => (b.id === id ? { ...b, status: 'Confirmed' } : b))
    );
  }

  cancelBooking(id: string): void {
    this.bookings.update((list) =>
      list.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
  }
}
