import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../token/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenServ = inject(TokenService);
  console.log(!req.url.includes("public") && !req.url.includes("auth"));
  if (!req.url.includes("public") && !req.url.includes("auth")) {
    tokenServ.isAuthenticated.subscribe({
      next : (value)=> {
          if (value) {
            req = req.clone({
              setHeaders : {
                Authorization : `Bearer ${tokenServ.getToken()}`
              }
            })
          }
      },
    })
  }
  console.log(req);
  return next(req);

};
