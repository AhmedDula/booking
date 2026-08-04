import { BookingStatus } from '../../core/constants/booking-status';
// import { Room } from '../rooms/room.model';

export interface Booking {
  _id?: string;

  user: string;

  room: Room;

  checkIn: string;
  checkOut: string;

  guests: number;

  totalPrice: number;

  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: string;

  specialRequests: string;

  createdAt?: string;
  updatedAt?: string;
}
export interface CreateBookingRequest {
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  specialRequests?: string;
}

export interface CreateBookingResponse {
  status: string;

  data: {
    booking: Booking;
  };
}

export interface MyBookingsResponse {
  status: string;

  bookings_num: number;

  data: {
    bookings: Booking[];
  };
}

export interface Room {
  _id: string;
  property: string;

  name: string;
  description: string;

  price: number;
  maxGuests: number;

  beds: number;
  bathrooms: number;
  roomSize: number;

  images: string[];
  amenities: string[];

  available: boolean;

  createdAt?: string;
  updatedAt?: string;
}
