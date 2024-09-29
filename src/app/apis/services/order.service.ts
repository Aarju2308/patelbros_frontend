/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createOrder } from '../fn/order/create-order';
import { CreateOrder$Params } from '../fn/order/create-order';
import { getAllOrders } from '../fn/order/get-all-orders';
import { GetAllOrders$Params } from '../fn/order/get-all-orders';
import { getSingleOrder } from '../fn/order/get-single-order';
import { GetSingleOrder$Params } from '../fn/order/get-single-order';
import { OrderResponse } from '../models/order-response';
import { payForOrder } from '../fn/order/pay-for-order';
import { PayForOrder$Params } from '../fn/order/pay-for-order';
import { paymentSuccess } from '../fn/order/payment-success';
import { PaymentSuccess$Params } from '../fn/order/payment-success';
import { PaypalResponse } from '../models/paypal-response';

@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `payForOrder()` */
  static readonly PayForOrderPath = '/user/order/payForOrder';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `payForOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  payForOrder$Response(params: PayForOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<PaypalResponse>> {
    return payForOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `payForOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  payForOrder(params: PayForOrder$Params, context?: HttpContext): Observable<PaypalResponse> {
    return this.payForOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaypalResponse>): PaypalResponse => r.body)
    );
  }

  /** Path part for operation `getAllOrders()` */
  static readonly GetAllOrdersPath = '/user/order/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOrders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrders$Response(params?: GetAllOrders$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderResponse>>> {
    return getAllOrders(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOrders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrders(params?: GetAllOrders$Params, context?: HttpContext): Observable<Array<OrderResponse>> {
    return this.getAllOrders$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderResponse>>): Array<OrderResponse> => r.body)
    );
  }

  /** Path part for operation `createOrder()` */
  static readonly CreateOrderPath = '/user/order/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder$Response(params: CreateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return createOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder(params: CreateOrder$Params, context?: HttpContext): Observable<{
}> {
    return this.createOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getSingleOrder()` */
  static readonly GetSingleOrderPath = '/user/order/{billNo}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSingleOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleOrder$Response(params: GetSingleOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderResponse>> {
    return getSingleOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSingleOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleOrder(params: GetSingleOrder$Params, context?: HttpContext): Observable<OrderResponse> {
    return this.getSingleOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderResponse>): OrderResponse => r.body)
    );
  }

  /** Path part for operation `paymentSuccess()` */
  static readonly PaymentSuccessPath = '/user/order/paymentSuccess';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `paymentSuccess()` instead.
   *
   * This method doesn't expect any request body.
   */
  paymentSuccess$Response(params: PaymentSuccess$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return paymentSuccess(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `paymentSuccess$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  paymentSuccess(params: PaymentSuccess$Params, context?: HttpContext): Observable<string> {
    return this.paymentSuccess$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
