import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Room } from '../rooms/room.model';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private api = inject(ApiService);

  getDashboardStats() {
    return this.api.get('admin/stats');
  }

  getRecentActivity() {
    return this.api.get('admin/activity');
  }
  getUsers() {
    return this.api.get('users');
  }

  getUserById(id: string) {
    return this.api.get(`users/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.api.put(`users/${id}`, data);
  }

  deleteUser(id: string) {
    return this.api.delete(`users/${id}`);
  }
  getRooms() {
    return this.api.get<{ success: boolean; data: Room[] }>('rooms');
  }

  addRoom(room: Room) {
    return this.api.post('rooms', room);
  }
  getProperties() {
    return this.api.get('/properties');
  }
}
