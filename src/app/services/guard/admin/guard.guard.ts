import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../token/token.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const tokenService : TokenService = inject(TokenService);
  const router : Router = inject(Router);
  if (!tokenService.isTokenValid() || tokenService.getRole() != 'ROLE_ADMIN') {
    router.navigate(['admin','login']);
  }
  return true;
};
