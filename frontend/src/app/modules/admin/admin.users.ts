import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminService } from './admin.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.users.html',
})
export class AdminUsersComponent implements OnInit {
  readonly adminName = signal('Marcus Chen');
  readonly adminRole = signal('Administrator');
  readonly adminAvatar = signal(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  );

  readonly adminService = inject(AdminService);

  users = signal<User[]>([]);

  search = signal('');

  isEditModalOpen = signal(false);

  selectedUser = signal<Partial<User> | null>(null);

  filtered = computed(() => {
    const keyword = this.search().toLowerCase();

    return this.users().filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword),
    );
  });

  today = signal(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  );

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: any) => {
        this.users.set(res.data);
      },

      error: (err) => console.error(err),
    });
  }

  deleteUser(id: string) {
    if (!confirm('Delete this user?')) return;

    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.users.update((users) => users.filter((user) => user._id !== id));
      },

      error: (err) => console.error(err),
    });
  }
  openEditModal(user: User) {
    this.selectedUser.set({
      _id: user._id,
      name: user.name,
      role: user.role,
    });

    this.isEditModalOpen.set(true);
  }

  closeEditModal() {
    this.selectedUser.set(null);

    this.isEditModalOpen.set(false);
  }

  saveUser() {
    const user = this.selectedUser();

    if (!user || !user._id) return;

    this.adminService
      .updateUser(user._id, {
        name: user.name,
        role: user.role,
      })
      .subscribe({
        next: () => {
          this.loadUsers();

          this.closeEditModal();
        },

        error: (err) => console.error(err),
      });
  }
}
