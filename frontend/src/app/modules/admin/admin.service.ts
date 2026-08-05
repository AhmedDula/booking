import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private api = inject(ApiService);

  getUsers() {
    return this.api.get('/users');
  }
  getDashboardStats() {
    return this.api.get('admin/stats');
  }

  getRecentActivity() {
    return this.api.get('admin/activity');
  }
}
