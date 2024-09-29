import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isAuthenticated : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  updateToken(status : boolean){
    this.isAuthenticated.next(status);
  }

  setToken(token : string){
    this.updateToken(true);
    localStorage.setItem("TOKEN", token);
    sessionStorage.setItem("Authenticated","true");
  }

  getToken() : string | null{
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem("TOKEN") || null;
    }
    return null;
  }

  removeToken(){
    sessionStorage.removeItem("Authenticated");
    this.updateToken(false);
    return localStorage.removeItem("TOKEN");
  }

  getAuthentication():boolean{
    if (sessionStorage.getItem("Authenticated")) {
      return true
    }else{
      return false
    }
  }

  getRole():string{
    return this.getTokenInfo().authorities[0];
  }

  getTokenInfo(){
    const jwt = this.getToken();
    if (jwt) {
      const jwtHelper : JwtHelperService = new JwtHelperService();
      const info = jwtHelper.decodeToken(jwt);
      return info;
    }
    localStorage.clear();
    return "";
  }

  getUserEmail(){
    return this.getTokenInfo().sub;
  }

  isTokenValid():boolean{
    const jwt = this.getToken();
    if (jwt) {
      const jwtHelper : JwtHelperService = new JwtHelperService();
      const isTokenExpired = jwtHelper.isTokenExpired(jwt);
      if (isTokenExpired) {
        localStorage.clear();
        return false
      }
      return true;
    }
    return false;
  }
}
