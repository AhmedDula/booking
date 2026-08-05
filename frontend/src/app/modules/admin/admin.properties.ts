import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Property {
  id: string;
  name: string;
  type: 'Villa' | 'Cabin' | 'House' | 'Apartment' | 'Studio' | 'Penthouse';
  location: string;
  rating: number;
  rooms: number;
  fromPrice: number;
  image: string;
}

@Component({
  selector: 'app-admin-properties',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './admin.properties.html',
})
export class AdminPropertiesComponent {
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

  readonly properties = signal<Property[]>([
    { id: 'prop-1', name: 'Villa Sereno', type: 'Villa', location: 'Ubud, Indonesia', rating: 4.97, rooms: 3, fromPrice: 1240, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=200&q=80' },
    { id: 'prop-2', name: 'Azure Heights', type: 'Villa', location: 'Santorini, Greece', rating: 4.94, rooms: 2, fromPrice: 2200, image: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?auto=format&fit=crop&w=200&q=80' },
    { id: 'prop-3', name: 'Cedar Peak Lodge', type: 'Cabin', location: 'Aspen, United States', rating: 4.88, rooms: 2, fromPrice: 740, image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=200&q=80' },
    { id: 'prop-4', name: 'Maison Lumière', type: 'House', location: 'Cannes, France', rating: 4.91, rooms: 2, fromPrice: 890, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80' },
    { id: 'prop-5', name: 'Pinnacle Residence', type: 'Apartment', location: 'Dubai, UAE', rating: 4.86, rooms: 2, fromPrice: 780, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=200&q=80' },
    { id: 'prop-6', name: 'La Dolce Vista', type: 'Villa', location: 'Amalfi, Italy', rating: 4.96, rooms: 2, fromPrice: 1380, image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=200&q=80' },
    { id: 'prop-7', name: 'The Kyoto Sanctuary', type: 'Studio', location: 'Kyoto, Japan', rating: 4.82, rooms: 1, fromPrice: 1100, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=200&q=80' },
  ]);

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.properties();
    return this.properties().filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  });

  deleteProperty(id: string): void {
    this.properties.update((list) => list.filter((p) => p.id !== id));
  }
}
