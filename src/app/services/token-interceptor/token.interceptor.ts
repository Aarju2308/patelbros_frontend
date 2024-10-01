import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../token/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenServ = inject(TokenService);
  console.log('Request URL:', req.url);

  // Normalize the URL by removing domain (if present), including cases where it starts with `//`
  let normalizedUrl = req.url;
  if (normalizedUrl.startsWith('//')) {
    normalizedUrl = normalizedUrl.replace(/^\/\/[^\/]+/, ''); // Handle URLs starting with `//`
  } else {
    normalizedUrl = normalizedUrl.replace(/^https?:\/\/[^\/]+/, ''); // Remove http/https and domain
  }

  // Check if the normalized URL contains "public" or "auth"
  console.log(!normalizedUrl.includes("public") && !normalizedUrl.includes("auth"));
  console.log('Normalized URL:', normalizedUrl);

  if (!normalizedUrl.includes("public") && !normalizedUrl.includes("auth")) {
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
  return next(req);

};
