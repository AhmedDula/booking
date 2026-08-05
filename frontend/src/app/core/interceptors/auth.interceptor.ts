import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../../modules/auth/auth.service';

let isRefreshing = false;
// null = refresh in progress (no result yet), true = success, false = failure
const refreshResult$ = new Subject<boolean>();

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const request = req.clone({ withCredentials: true });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest =
        request.url.includes('/auth/login') ||
        request.url.includes('/auth/register') ||
        request.url.includes('/auth/refresh');

      if (error.status !== 401 || isAuthRequest) {
        return throwError(() => error);
      }

      if (isRefreshing) {
        return refreshResult$.pipe(
          take(1),
          switchMap((success) =>
            success ? next(request) : throwError(() => error)
          )
        );
      }

      isRefreshing = true;

      return authService.refresh().pipe(
        switchMap(() => {
          isRefreshing = false;
          refreshResult$.next(true);
          return next(request);
        }),
        catchError((refreshError) => {
          isRefreshing = false;
          refreshResult$.next(false);

          authService.clearSession();
          router.navigate(['/login']);

          return throwError(() => refreshError);
        })
      );
    })
  );
};