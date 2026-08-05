import { Component, computed, signal } from '@angular/core';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Guest';
  nationality: string;
  bookings: number;
  reviews: number;
  joined: string;
  avatar: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  templateUrl: './admin.users.html',
})
export class AdminUsersComponent {
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

  readonly users = signal<AdminUser[]>([
    { id: 'u-1', name: 'Eleanor Sinclair', email: 'eleanor.sinclair@email.com', role: 'Guest', nationality: 'British', bookings: 4, reviews: 3, joined: 'Mar 2024', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
    { id: 'u-2', name: 'Marcus Chen', email: 'marcus.chen@email.com', role: 'Admin', nationality: 'Singaporean', bookings: 12, reviews: 9, joined: 'Nov 2023', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80' },
    { id: 'u-3', name: 'Sofia Rossi', email: 'sofia.rossi@email.com', role: 'Guest', nationality: 'Italian', bookings: 2, reviews: 2, joined: 'Sep 2024', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=100&q=80' },
    { id: 'u-4', name: 'James Whitmore', email: 'james.whitmore@email.com', role: 'Guest', nationality: 'American', bookings: 7, reviews: 5, joined: 'Feb 2025', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80' },
    { id: 'u-5', name: 'Yuki Tanaka', email: 'yuki.tanaka@email.com', role: 'Guest', nationality: 'Japanese', bookings: 3, reviews: 2, joined: 'May 2025', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80' },
  ]);

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return this.users();
    return this.users().filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  deleteUser(id: string): void {
    this.users.update((list) => list.filter((u) => u.id !== id));
  }
}
