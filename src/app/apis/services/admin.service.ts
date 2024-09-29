/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getOrdersPage } from '../fn/admin/get-orders-page';
import { GetOrdersPage$Params } from '../fn/admin/get-orders-page';
import { getUsersPage } from '../fn/admin/get-users-page';
import { GetUsersPage$Params } from '../fn/admin/get-users-page';
import { PageResponseOrderResponse } from '../models/page-response-order-response';
import { PageResponseUserResponse } from '../models/page-response-user-response';
import { updateOrderStatus } from '../fn/admin/update-order-status';
import { UpdateOrderStatus$Params } from '../fn/admin/update-order-status';
import { updateUserStatus } from '../fn/admin/update-user-status';
import { UpdateUserStatus$Params } from '../fn/admin/update-user-status';

@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateUserStatus()` */
  static readonly UpdateUserStatusPath = '/admin/users/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserStatus$Response(params: UpdateUserStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateUserStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserStatus(params: UpdateUserStatus$Params, context?: HttpContext): Observable<{
}> {
    return this.updateUserStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `updateOrderStatus()` */
  static readonly UpdateOrderStatusPath = '/admin/order/{orderId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOrderStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrderStatus$Response(params: UpdateOrderStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateOrderStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateOrderStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrderStatus(params: UpdateOrderStatus$Params, context?: HttpContext): Observable<{
}> {
    return this.updateOrderStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getUsersPage()` */
  static readonly GetUsersPagePath = '/admin/users/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsersPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersPage$Response(params?: GetUsersPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseUserResponse>> {
    return getUsersPage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsersPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsersPage(params?: GetUsersPage$Params, context?: HttpContext): Observable<PageResponseUserResponse> {
    return this.getUsersPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseUserResponse>): PageResponseUserResponse => r.body)
    );
  }

  /** Path part for operation `getOrdersPage()` */
  static readonly GetOrdersPagePath = '/admin/orders';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrdersPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrdersPage$Response(params?: GetOrdersPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseOrderResponse>> {
    return getOrdersPage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrdersPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrdersPage(params?: GetOrdersPage$Params, context?: HttpContext): Observable<PageResponseOrderResponse> {
    return this.getOrdersPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseOrderResponse>): PageResponseOrderResponse => r.body)
    );
  }

}
