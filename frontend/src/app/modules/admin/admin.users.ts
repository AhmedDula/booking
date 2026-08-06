import { inject, signal } from "@angular/core";
import { AdminService } from "./admin.service";

export class AdminUsersComponent {
  readonly adminName = signal('Marcus Chen');
  readonly adminRole = signal('Administrator');
  readonly adminAvatar = signal(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
  );
  readonly adminService = inject(AdminService);

  readonly today = signal(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  readonly search = signal('');
  readonly users = signal<AdminUsersComponent[]>([]);

  constructor() {
    this.adminService.getUsers().subscribe(
      (res: any) => this.users.set(res.data),
      (err: any) => console.error(err)
    );
  }

  // readonly filtered = computed(() => {
  //   const q = this.search().trim().toLowerCase();
  //   if (!q) return this.users();
  //   return this.users().filter(
  //     (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  //   );
  // });

  get totalUsers() {
    return this.users().length;
  }

  // get totalBookings() {
  //   return this.users().reduce((sum, u) => sum + u.bookings, 0);
  // }

  // get totalReviews() {
  //   return this.users().reduce((sum, u) => sum + u.reviews, 0);
  // }

  // addUser(user: AdminUser): void {
  //   this.users.update((list) => [...list, user]);
  // }

  // deleteUser(id: string): void {
  //   this.users.update((list) => list.filter((u) => u.id !== id));
  // }
}