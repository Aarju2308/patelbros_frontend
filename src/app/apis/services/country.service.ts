/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Country } from '../models/country';
import { createCountry } from '../fn/country/create-country';
import { CreateCountry$Params } from '../fn/country/create-country';
import { deleteCountry } from '../fn/country/delete-country';
import { DeleteCountry$Params } from '../fn/country/delete-country';
import { getAllCountries1 } from '../fn/country/get-all-countries-1';
import { GetAllCountries1$Params } from '../fn/country/get-all-countries-1';
import { getCountryById } from '../fn/country/get-country-by-id';
import { GetCountryById$Params } from '../fn/country/get-country-by-id';
import { updateCountry } from '../fn/country/update-country';
import { UpdateCountry$Params } from '../fn/country/update-country';

@Injectable({ providedIn: 'root' })
export class CountryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCountryById()` */
  static readonly GetCountryByIdPath = '/admin/country/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCountryById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountryById$Response(params: GetCountryById$Params, context?: HttpContext): Observable<StrictHttpResponse<Country>> {
    return getCountryById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCountryById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCountryById(params: GetCountryById$Params, context?: HttpContext): Observable<Country> {
    return this.getCountryById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Country>): Country => r.body)
    );
  }

  /** Path part for operation `updateCountry()` */
  static readonly UpdateCountryPath = '/admin/country/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCountry()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCountry$Response(params: UpdateCountry$Params, context?: HttpContext): Observable<StrictHttpResponse<Country>> {
    return updateCountry(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCountry$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCountry(params: UpdateCountry$Params, context?: HttpContext): Observable<Country> {
    return this.updateCountry$Response(params, context).pipe(
      map((r: StrictHttpResponse<Country>): Country => r.body)
    );
  }

  /** Path part for operation `deleteCountry()` */
  static readonly DeleteCountryPath = '/admin/country/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCountry()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCountry$Response(params: DeleteCountry$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteCountry(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCountry$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCountry(params: DeleteCountry$Params, context?: HttpContext): Observable<void> {
    return this.deleteCountry$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllCountries1()` */
  static readonly GetAllCountries1Path = '/admin/country';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCountries1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCountries1$Response(params?: GetAllCountries1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Country>>> {
    return getAllCountries1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCountries1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCountries1(params?: GetAllCountries1$Params, context?: HttpContext): Observable<Array<Country>> {
    return this.getAllCountries1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Country>>): Array<Country> => r.body)
    );
  }

  /** Path part for operation `createCountry()` */
  static readonly CreateCountryPath = '/admin/country';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCountry()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCountry$Response(params: CreateCountry$Params, context?: HttpContext): Observable<StrictHttpResponse<Country>> {
    return createCountry(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCountry$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCountry(params: CreateCountry$Params, context?: HttpContext): Observable<Country> {
    return this.createCountry$Response(params, context).pipe(
      map((r: StrictHttpResponse<Country>): Country => r.body)
    );
  }

}
