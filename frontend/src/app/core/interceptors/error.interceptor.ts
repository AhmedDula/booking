import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
          console.error(error.error?.message ?? 'Invalid request.');
          break;
        case 403:
          console.error('You don\'t have permission to do that.');
          break;
        case 404:
          console.error('The requested resource was not found.');
          break;
        case 500:
          console.error('Something went wrong on our end. Please try again.');
          break;
      }

      return throwError(() => error);
    })
  );
};