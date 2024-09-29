/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { LoginResponse } from '../models/login-response';
import { loginUser } from '../fn/authentication/login-user';
import { LoginUser$Params } from '../fn/authentication/login-user';
import { registerUser } from '../fn/authentication/register-user';
import { RegisterUser$Params } from '../fn/authentication/register-user';
import { verifyUser } from '../fn/authentication/verify-user';
import { VerifyUser$Params } from '../fn/authentication/verify-user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `verifyUser()` */
  static readonly VerifyUserPath = '/auth/verify';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyUser$Response(params: VerifyUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return verifyUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `verifyUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyUser(params: VerifyUser$Params, context?: HttpContext): Observable<{
}> {
    return this.verifyUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `registerUser()` */
  static readonly RegisterUserPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return registerUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser(params: RegisterUser$Params, context?: HttpContext): Observable<{
}> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `loginUser()` */
  static readonly LoginUserPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser$Response(params: LoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponse>> {
    return loginUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser(params: LoginUser$Params, context?: HttpContext): Observable<LoginResponse> {
    return this.loginUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginResponse>): LoginResponse => r.body)
    );
  }

}
