/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addToCart } from '../fn/user/add-to-cart';
import { AddToCart$Params } from '../fn/user/add-to-cart';
import { CartResponse } from '../models/cart-response';
import { deleteCart } from '../fn/user/delete-cart';
import { DeleteCart$Params } from '../fn/user/delete-cart';
import { getCartByUser } from '../fn/user/get-cart-by-user';
import { GetCartByUser$Params } from '../fn/user/get-cart-by-user';
import { getCartCountByUser } from '../fn/user/get-cart-count-by-user';
import { GetCartCountByUser$Params } from '../fn/user/get-cart-count-by-user';
import { getUserDetails } from '../fn/user/get-user-details';
import { GetUserDetails$Params } from '../fn/user/get-user-details';
import { removeQuantityFromCart } from '../fn/user/remove-quantity-from-cart';
import { RemoveQuantityFromCart$Params } from '../fn/user/remove-quantity-from-cart';
import { setUserToCart } from '../fn/user/set-user-to-cart';
import { SetUserToCart$Params } from '../fn/user/set-user-to-cart';
import { updateUserDetails } from '../fn/user/update-user-details';
import { UpdateUserDetails$Params } from '../fn/user/update-user-details';
import { uploadBackgroundImage } from '../fn/user/upload-background-image';
import { UploadBackgroundImage$Params } from '../fn/user/upload-background-image';
import { uploadProfiletImage } from '../fn/user/upload-profilet-image';
import { UploadProfiletImage$Params } from '../fn/user/upload-profilet-image';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `setUserToCart()` */
  static readonly SetUserToCartPath = '/user/cart/{uniqueId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setUserToCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  setUserToCart$Response(params: SetUserToCart$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return setUserToCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setUserToCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setUserToCart(params: SetUserToCart$Params, context?: HttpContext): Observable<{
}> {
    return this.setUserToCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getUserDetails()` */
  static readonly GetUserDetailsPath = '/user/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserDetails$Response(params?: GetUserDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return getUserDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserDetails(params?: GetUserDetails$Params, context?: HttpContext): Observable<UserResponse> {
    return this.getUserDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    );
  }

  /** Path part for operation `updateUserDetails()` */
  static readonly UpdateUserDetailsPath = '/user/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserDetails$Response(params: UpdateUserDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateUserDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserDetails(params: UpdateUserDetails$Params, context?: HttpContext): Observable<{
}> {
    return this.updateUserDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `removeQuantityFromCart()` */
  static readonly RemoveQuantityFromCartPath = '/user/removeFromCart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeQuantityFromCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeQuantityFromCart$Response(params: RemoveQuantityFromCart$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return removeQuantityFromCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeQuantityFromCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  removeQuantityFromCart(params: RemoveQuantityFromCart$Params, context?: HttpContext): Observable<number> {
    return this.removeQuantityFromCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadProfiletImage()` */
  static readonly UploadProfiletImagePath = '/user/profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProfiletImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfiletImage$Response(params?: UploadProfiletImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProfiletImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProfiletImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProfiletImage(params?: UploadProfiletImage$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProfiletImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getCartByUser()` */
  static readonly GetCartByUserPath = '/user/cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCartByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartByUser$Response(params?: GetCartByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CartResponse>>> {
    return getCartByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCartByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartByUser(params?: GetCartByUser$Params, context?: HttpContext): Observable<Array<CartResponse>> {
    return this.getCartByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CartResponse>>): Array<CartResponse> => r.body)
    );
  }

  /** Path part for operation `addToCart()` */
  static readonly AddToCartPath = '/user/cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addToCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addToCart$Response(params: AddToCart$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addToCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addToCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addToCart(params: AddToCart$Params, context?: HttpContext): Observable<number> {
    return this.addToCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadBackgroundImage()` */
  static readonly UploadBackgroundImagePath = '/user/background';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBackgroundImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBackgroundImage$Response(params?: UploadBackgroundImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadBackgroundImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadBackgroundImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBackgroundImage(params?: UploadBackgroundImage$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadBackgroundImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getCartCountByUser()` */
  static readonly GetCartCountByUserPath = '/user/countCart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCartCountByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartCountByUser$Response(params?: GetCartCountByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getCartCountByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCartCountByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartCountByUser(params?: GetCartCountByUser$Params, context?: HttpContext): Observable<number> {
    return this.getCartCountByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteCart()` */
  static readonly DeleteCartPath = '/user/cart/{cartId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCart$Response(params: DeleteCart$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCart(params: DeleteCart$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
