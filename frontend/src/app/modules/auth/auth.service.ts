import { Injectable, Service, inject, signal } from '@angular/core';
import { Observable, tap, catchError, map, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ROLES } from '../../core/constants/roles';


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
  success: boolean;
  message: string;
  data: {
    user: {
      email: string;
      id: string;
      name: string;
      role: typeof ROLES[keyof typeof ROLES];
    };
  };
}
@Service()
export class AuthService {
  private readonly api = inject(ApiService);

  readonly currentUser = signal<AuthResponse['data']['user'] | null>(null);

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.api
      .post<AuthResponse>('auth/login', payload)


      .pipe(tap((res) => {
        this.currentUser.set(res.data.user)

      })

      );
  }


  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.api
      .post<AuthResponse>('auth/register', payload)
      .pipe(tap((res) => this.currentUser.set(res.data.user)));
  }

  logout(): Observable<void> {
    return this.api.post<void>('auth/logout', {}).pipe(tap(() => this.clearSession()));
  }

  checkSession(): Observable<AuthResponse['data']['user'] | null> {
    return this.api.get<AuthResponse>('auth/me').pipe(
      map((res) => res.data.user),
      tap((user) => this.currentUser.set(user)),
      catchError(() => {
        this.currentUser.set(null);
        return of(null);
      })
    );
  }

  refresh(): Observable<AuthResponse['data']['user']> {
    return this.api.post<AuthResponse>('auth/refresh', {}).pipe(
      map((res) => res.data.user),
      tap((user) => this.currentUser.set(user))
    );
  }

  clearSession(): void {
    this.currentUser.set(null);
  }



  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }
}
