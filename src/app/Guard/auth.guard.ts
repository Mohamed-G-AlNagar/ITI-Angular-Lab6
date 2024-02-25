import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let userSerivce = inject(UserAuthService);
  let router = inject(Router);
  if (userSerivce.isUserLoggedIn) {
    return true;
  } else {
    alert('please Login First');
    router.navigate(['/auth/login']);
    return false;
  }
};
