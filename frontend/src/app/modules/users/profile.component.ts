import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private readonly userService = inject(UserService);

  // TODO: لازم تتجاب من الـ AuthService بعد ما تلاقيه في الريبو
  // مؤقتًا حاطة id ثابت عشان نقدر نجرب
  private readonly currentUserId = 'PUT_A_REAL_USER_ID_HERE';

  user: User | null = null;
  isEditing = false;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUserById(this.currentUserId).subscribe({
      next: (res) => {
        this.user = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'فشل تحميل بيانات البروفايل';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  saveChanges(): void {
    if (!this.user) return;

    this.isSaving = true;

    const { name, phone } = this.user;

    this.userService.updateUser(this.user._id, { name, phone }).subscribe({
      next: (res) => {
        this.user = res.data;
        this.isEditing = false;
        this.isSaving = false;
      },
      error: (err) => {
        this.errorMessage = 'فشل حفظ التعديلات';
        this.isSaving = false;
        console.error(err);
      },
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.loadUser(); // نرجع نجيب النسخة الأصلية عشان نلغي أي تعديل مش متحفوظ
  }
}