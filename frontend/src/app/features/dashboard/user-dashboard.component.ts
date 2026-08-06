import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from '../../modules/users/profile.component';
import { MyBookingsComponent } from '../../modules/bookings/my-bookings.component';
import { AuthService } from '../../modules/auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProfileComponent,
    MyBookingsComponent,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent {

  readonly authService = inject(AuthService);

  activeTab = signal<'bookings' | 'reviews' | 'disputes' | 'profile'>('bookings');

  setTab(tab: 'bookings' | 'reviews' | 'disputes' | 'profile'): void {
    this.activeTab.set(tab);
  }

}