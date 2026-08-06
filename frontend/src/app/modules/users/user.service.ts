import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { User } from './user.model';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly api = inject(ApiService);

  getAllUsers(): Observable<ApiResponse<User[]>> {
    return this.api.get<ApiResponse<User[]>>('users');
  }

  getUserById(id: string): Observable<ApiResponse<User>> {
    return this.api.get<ApiResponse<User>>(`users/${id}`);
  }

  updateUser(id: string, user: Partial<User>): Observable<ApiResponse<User>> {
    return this.api.put<ApiResponse<User>>(`users/${id}`, user);
  }

  deleteUser(id: string): Observable<ApiResponse<null>> {
    return this.api.delete<ApiResponse<null>>(`users/${id}`);
  }
}