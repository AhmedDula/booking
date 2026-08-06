import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  readonly user = signal<User | null>(null);
  readonly isEditing = signal(false);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const currentUser = this.authService.currentUser();

    if (!currentUser) {
      this.errorMessage.set('لازم تسجلي دخول الأول');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    console.log(currentUser);

    this.userService.getUserById(currentUser.id).subscribe({
      next: (res) => {
        this.user.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('فشل تحميل بيانات البروفايل');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  startEditing(): void {
    this.isEditing.set(true);
  }

  updateName(value: string): void {
    const current = this.user();
    if (current) this.user.set({ ...current, name: value });
  }

  updatePhone(value: string): void {
    const current = this.user();
    if (current) this.user.set({ ...current, phone: value });
  }

  saveChanges(): void {
    const currentUser = this.user();
    if (!currentUser) return;

    this.isSaving.set(true);

    const { name, phone } = currentUser;

    this.userService.updateUser(currentUser._id, { name, phone }).subscribe({
      next: (res) => {
        this.user.set(res.data);
        this.isEditing.set(false);
        this.isSaving.set(false);
      },
      error: (err) => {
        this.errorMessage.set('فشل حفظ التعديلات');
        this.isSaving.set(false);
        console.error(err);
      },
    });
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.loadUser();
  }
}
