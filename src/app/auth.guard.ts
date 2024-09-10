import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = !!localStorage.getItem('isAuthenticated');
  
  if (isAuthenticated===true) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['']);
    return false;
  }
};
