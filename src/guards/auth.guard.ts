import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from 'src/app/auth/domain/services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Verificar si hay un token y si no ha expirado
  if (!authService.isLoggedIn()) {
    router.navigate(['/admin']);
    return false;
  }

  // Verificar si el token está próximo a expirar (menos de 5 minutos)
  const timeUntilExpiration = authService.getTokenExpirationTime();
  if (timeUntilExpiration < 300) { // 5 minutos
    // Intentar refrescar el token automáticamente
    return authService.refreshToken().pipe(
      map(() => true),
      catchError((error) => {
        console.error('Error refreshing token in guard:', error);
        authService.logout();
        router.navigate(['/admin']);
        return of(false);
      })
    );
  }

  return true;
};
