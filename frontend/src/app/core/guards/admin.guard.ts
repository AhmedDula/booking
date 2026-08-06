import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
 const authService = inject(AuthService);

  if (authService.currentUser()?.role === 'admin') {
    return true;
  }

  router.navigateByUrl('/home');
  return false;
};
