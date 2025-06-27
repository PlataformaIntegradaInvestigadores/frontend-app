import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from 'src/app/auth/domain/services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/admin']);
    return false;
  }
};
