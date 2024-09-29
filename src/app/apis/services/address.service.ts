/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addAddress } from '../fn/address/add-address';
import { AddAddress$Params } from '../fn/address/add-address';
import { Address } from '../models/address';
import { deleteAddress } from '../fn/address/delete-address';
import { DeleteAddress$Params } from '../fn/address/delete-address';
import { getAllAddress } from '../fn/address/get-all-address';
import { GetAllAddress$Params } from '../fn/address/get-all-address';
import { getSingleAddress } from '../fn/address/get-single-address';
import { GetSingleAddress$Params } from '../fn/address/get-single-address';
import { updateAddress } from '../fn/address/update-address';
import { UpdateAddress$Params } from '../fn/address/update-address';

@Injectable({ providedIn: 'root' })
export class AddressService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getSingleAddress()` */
  static readonly GetSingleAddressPath = '/user/address/{addressId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSingleAddress()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleAddress$Response(params: GetSingleAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Address>> {
    return getSingleAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSingleAddress$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleAddress(params: GetSingleAddress$Params, context?: HttpContext): Observable<Address> {
    return this.getSingleAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<Address>): Address => r.body)
    );
  }

  /** Path part for operation `updateAddress()` */
  static readonly UpdateAddressPath = '/user/address/{addressId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress$Response(params: UpdateAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress(params: UpdateAddress$Params, context?: HttpContext): Observable<number> {
    return this.updateAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteAddress()` */
  static readonly DeleteAddressPath = '/user/address/{addressId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAddress()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAddress$Response(params: DeleteAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteAddress$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAddress(params: DeleteAddress$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllAddress()` */
  static readonly GetAllAddressPath = '/user/address/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAddress()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAddress$Response(params?: GetAllAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Address>>> {
    return getAllAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAddress$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAddress(params?: GetAllAddress$Params, context?: HttpContext): Observable<Array<Address>> {
    return this.getAllAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Address>>): Array<Address> => r.body)
    );
  }

  /** Path part for operation `addAddress()` */
  static readonly AddAddressPath = '/user/address/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAddress$Response(params: AddAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addAddress(params: AddAddress$Params, context?: HttpContext): Observable<number> {
    return this.addAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
