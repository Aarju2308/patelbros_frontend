/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteThirdCategory } from '../fn/third-category/delete-third-category';
import { DeleteThirdCategory$Params } from '../fn/third-category/delete-third-category';
import { getSingleThirdCat } from '../fn/third-category/get-single-third-cat';
import { GetSingleThirdCat$Params } from '../fn/third-category/get-single-third-cat';
import { save } from '../fn/third-category/save';
import { Save$Params } from '../fn/third-category/save';
import { ThirdCategoryResponse } from '../models/third-category-response';
import { updateThirdCategory } from '../fn/third-category/update-third-category';
import { UpdateThirdCategory$Params } from '../fn/third-category/update-third-category';

@Injectable({ providedIn: 'root' })
export class ThirdCategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getSingleThirdCat()` */
  static readonly GetSingleThirdCatPath = '/admin/thirdCategory/{thirdCatId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSingleThirdCat()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleThirdCat$Response(params: GetSingleThirdCat$Params, context?: HttpContext): Observable<StrictHttpResponse<ThirdCategoryResponse>> {
    return getSingleThirdCat(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSingleThirdCat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleThirdCat(params: GetSingleThirdCat$Params, context?: HttpContext): Observable<ThirdCategoryResponse> {
    return this.getSingleThirdCat$Response(params, context).pipe(
      map((r: StrictHttpResponse<ThirdCategoryResponse>): ThirdCategoryResponse => r.body)
    );
  }

  /** Path part for operation `updateThirdCategory()` */
  static readonly UpdateThirdCategoryPath = '/admin/thirdCategory/{thirdCatId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateThirdCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateThirdCategory$Response(params: UpdateThirdCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateThirdCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateThirdCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateThirdCategory(params: UpdateThirdCategory$Params, context?: HttpContext): Observable<number> {
    return this.updateThirdCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteThirdCategory()` */
  static readonly DeleteThirdCategoryPath = '/admin/thirdCategory/{thirdCatId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteThirdCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteThirdCategory$Response(params: DeleteThirdCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteThirdCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteThirdCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteThirdCategory(params: DeleteThirdCategory$Params, context?: HttpContext): Observable<number> {
    return this.deleteThirdCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `save()` */
  static readonly SavePath = '/admin/thirdCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save$Response(params: Save$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return save(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save(params: Save$Params, context?: HttpContext): Observable<number> {
    return this.save$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
