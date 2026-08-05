import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Room {
  id: string;
  name: string;
  property: string;
  guests: number;
  beds: string;
  sizeSqm: number;
  pricePerNight: number;
  status: 'Available' | 'Booked';
  image: string;
}

@Component({
  selector: 'app-admin-rooms',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './admin.rooms.html',
})
export class AdminRoomsComponent {
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

  readonly rooms = signal<Room[]>([
    { id: 'room-1', name: 'The Jungle Master Suite', property: 'Villa Sereno', guests: 2, beds: '1 · King', sizeSqm: 145, pricePerNight: 1850, status: 'Available', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=200&q=80' },
    { id: 'room-2', name: 'Garden Pavilion Suite', property: 'Villa Sereno', guests: 2, beds: '1 · King', sizeSqm: 95, pricePerNight: 1240, status: 'Available', image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=200&q=80' },
    { id: 'room-3', name: 'Treetop Family Villa', property: 'Villa Sereno', guests: 4, beds: '2 · King & Twin', sizeSqm: 210, pricePerNight: 2400, status: 'Booked', image: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&w=200&q=80' },
    { id: 'room-4', name: 'Caldera Cave Suite', property: 'Azure Heights', guests: 2, beds: '1 · King', sizeSqm: 80, pricePerNight: 2200, status: 'Available', image: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?auto=format&fit=crop&w=200&q=80' },
    { id: 'room-5', name: 'Aegean Sea Suite', property: 'Azure Heights', guests: 2, beds: '1 · Super King', sizeSqm: 120, pricePerNight: 3100, status: 'Available', image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=200&q=80' },
    { id: 'room-6', name: 'Summit Master Suite', property: 'Cedar Peak Lodge', guests: 2, beds: '1 · King', sizeSqm: 85, pricePerNight: 980, status: 'Available', image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=200&q=80' },
  ]);

  deleteRoom(id: string): void {
    this.rooms.update((list) => list.filter((r) => r.id !== id));
  }
}
