import { inject} from "@angular/core";
import { CanActivateFn, Router } from "@angular/router"
import { ActivatedRouteSnapshot, RouterStateSnapshot, } from "@angular/router";

export const loginGuard: CanActivateFn= (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const routerService = inject(Router);
  routerService.navigate(['/admin']);
  return true;

}
