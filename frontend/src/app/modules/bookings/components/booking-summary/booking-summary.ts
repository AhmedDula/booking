import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Booking } from '../../booking.model';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.css',
})
export class BookingSummaryComponent {
  @Input({ required: true }) booking!: Booking;

  get roomImage(): string {
    return this.booking.room.images?.length
      ? this.booking.room.images[0]
      : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200';
  }
}
