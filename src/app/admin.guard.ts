import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const userRoleId = parseInt(localStorage.getItem('userRoleId') || '0', 10);
  const isAuthenticated = !!localStorage.getItem('isAuthenticated');
 
  if (isAuthenticated && userRoleId === 1) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/login']);
    return false;
  }
};
