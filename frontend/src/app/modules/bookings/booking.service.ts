import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Booking,
  CreateBookingRequest,
  CreateBookingResponse,
  MyBookingsResponse,
} from './booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);

  // TODO: Replace with environment.apiUrl later
  private apiUrl = 'https://YOUR-RAILWAY-URL/api/v1/bookings';

  constructor() {}

  /**
   * Create a new booking
   */
  createBooking(
    booking: CreateBookingRequest
  ): Observable<CreateBookingResponse> {
    return this.http.post<CreateBookingResponse>(this.apiUrl, booking);
  }

  /**
   * Get logged in user's bookings
   */
  getMyBookings(): Observable<MyBookingsResponse> {
    return this.http.get<MyBookingsResponse>(
      `${this.apiUrl}/my-bookings`
    );
  }

  /**
   * Cancel booking
   */
  cancelBooking(id: string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/cancel/${id}`,
      {}
    );
  }
}
