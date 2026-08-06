export interface BookingRequest {
  room: string;

  checkIn: string;

  checkOut: string;

  guests: number;

  specialRequests: string;
}

export interface BookingResponse {
  _id: string;

  room: string;

  user: string;

  checkIn: string;

  checkOut: string;

  guests: number;

  totalPrice: number;

  status: 'pending' | 'confirmed' | 'cancelled';

  specialRequests: string;
}

export interface RoomSummary {
  _id: string;

  name: string;

  price: number;

  maxGuests: number;

  images: string[];
}

export interface UserSummary {
  id: string;

  name: string;

  email: string;
}

export interface Booking {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  } | null;

  property: string;

  checkIn: string;
  checkOut: string;

  guests: number;
  totalPrice: number;

  status: string;

  specialRequests: string;
}
