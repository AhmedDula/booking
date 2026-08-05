import { Injectable, Service, inject, signal } from '@angular/core';
import { Observable, tap, catchError, map, of } from 'rxjs';
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

@Service()
export class AuthService {
  private readonly api = inject(ApiService);

  readonly currentUser = signal<Auth | null>(null);

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.api
      .post<AuthResponse>('auth/login', payload)
      .pipe(tap((res) => this.currentUser.set(res.user))
      );
      
  }
  

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.api
      .post<AuthResponse>('auth/register', payload)
      .pipe(tap((res) => this.currentUser.set(res.user)));
  }

  logout(): Observable<void> {
    return this.api.post<void>('auth/logout', {}).pipe(tap(() => this.clearSession()));
  }

  checkSession(): Observable<Auth | null> {
    return this.api.get<Auth>('auth/me').pipe(
      tap((user) => this.currentUser.set(user)),
      catchError(() => {
        this.currentUser.set(null);
        return of(null);
      })
    );
    
  }

  refresh(): Observable<Auth> {
    return this.api.post<AuthResponse>('auth/refresh', {}).pipe(
      map((res) => res.user),
      tap((user) => this.currentUser.set(user))
    );
  }

  clearSession(): void {
    this.currentUser.set(null);
  }



  hasRole(role: string): boolean {
    return this.currentUser()?.data.user.role === role;
  }
}