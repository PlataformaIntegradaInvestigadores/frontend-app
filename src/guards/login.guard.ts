import { Inject } from "@angular/core";
import { Router } from "@angular/router";

export const loginGuard = () => {
  const router = Inject(Router);
  router.navigate(["/"]);
  return false;
}
