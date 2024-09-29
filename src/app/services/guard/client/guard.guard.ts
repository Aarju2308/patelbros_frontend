import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../token/token.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const tokenService : TokenService = inject(TokenService);
  const router : Router = inject(Router);
  console.log(tokenService.getTokenInfo())
  if (!tokenService.isTokenValid() || tokenService.getRole() != 'ROLE_USER') {
    router.navigate(['login']);
  }
  return true;
};
