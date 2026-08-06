import { Injectable, inject, signal, Service } from '@angular/core';
import { BookingRequest, BookingResponse } from './booking.model';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Booking } from './booking.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private api = inject(ApiService);

  getMyBookings() {
    return this.api.get('bookings/my-bookings');
  }

  cancelBooking(id: string) {
    return this.api.patch(`bookings/cancel/${id}`, {});
  }

  createBooking(data: BookingRequest) {
    return firstValueFrom(this.api.post('bookings', data));
  }

  getAllBookings(): Observable<{
    status: string;
    bookings_num: number;
    data: {
      bookings: Booking[];
    };
  }> {
    return this.api.get<{
      status: string;                           
      bookings_num: number;
      data: {
        bookings: Booking[];
      };
    }>('bookings');
  }

  updateBookingStatus(id: string, status: string) {
    // return this.api.patch(`bookings/status/${id}`, { status });
    const body = { status };

    console.log('UPDATE BODY:', body);

    return this.api.patch(`bookings/status/${id}`, body);
  }
}
