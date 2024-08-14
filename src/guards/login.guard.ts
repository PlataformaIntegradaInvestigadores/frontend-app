import { inject} from "@angular/core";
import { CanActivateFn, Router } from "@angular/router"
import { ActivatedRouteSnapshot, RouterStateSnapshot, } from "@angular/router";
import { AuthenticationService } from 'src/app/search-engine/domain/services/authentication.service';

export const loginGuard: CanActivateFn= (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const routerService = inject(Router);
  const authService = inject(AuthenticationService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    routerService.navigate(['/admin']);
    return false;
  }

}
