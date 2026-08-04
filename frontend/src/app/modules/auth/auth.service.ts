import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Auth } from './auth.model';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Auth;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = inject(ApiService);

  readonly currentUser = signal<Auth | null>(null);

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.api
      .post<AuthResponse>('auth/login', payload)
      
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.api
      .post<AuthResponse>('auth/register', payload)
      .pipe(tap((res) => this.currentUser.set(res.user)));
  }

  logout(): Observable<void> {
    return this.api.post<void>('auth/logout', {}).pipe(tap(() => this.clearSession()));
  }

 
  

  clearSession(): void {
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }
}