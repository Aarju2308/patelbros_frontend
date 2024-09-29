/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createSubCategory } from '../fn/sub-category/create-sub-category';
import { CreateSubCategory$Params } from '../fn/sub-category/create-sub-category';
import { deleteSubCategory } from '../fn/sub-category/delete-sub-category';
import { DeleteSubCategory$Params } from '../fn/sub-category/delete-sub-category';
import { getSingleSubCategory } from '../fn/sub-category/get-single-sub-category';
import { GetSingleSubCategory$Params } from '../fn/sub-category/get-single-sub-category';
import { SubCategoryResponse } from '../models/sub-category-response';
import { updateSubCategory } from '../fn/sub-category/update-sub-category';
import { UpdateSubCategory$Params } from '../fn/sub-category/update-sub-category';

@Injectable({ providedIn: 'root' })
export class SubCategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getSingleSubCategory()` */
  static readonly GetSingleSubCategoryPath = '/admin/subCategory/{subCatId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSingleSubCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleSubCategory$Response(params: GetSingleSubCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<SubCategoryResponse>> {
    return getSingleSubCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSingleSubCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleSubCategory(params: GetSingleSubCategory$Params, context?: HttpContext): Observable<SubCategoryResponse> {
    return this.getSingleSubCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<SubCategoryResponse>): SubCategoryResponse => r.body)
    );
  }

  /** Path part for operation `updateSubCategory()` */
  static readonly UpdateSubCategoryPath = '/admin/subCategory/{subCatId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSubCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSubCategory$Response(params: UpdateSubCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateSubCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateSubCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSubCategory(params: UpdateSubCategory$Params, context?: HttpContext): Observable<{
}> {
    return this.updateSubCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteSubCategory()` */
  static readonly DeleteSubCategoryPath = '/admin/subCategory/{subCatId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSubCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubCategory$Response(params: DeleteSubCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteSubCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteSubCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSubCategory(params: DeleteSubCategory$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteSubCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `createSubCategory()` */
  static readonly CreateSubCategoryPath = '/admin/subCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSubCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSubCategory$Response(params: CreateSubCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createSubCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createSubCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSubCategory(params: CreateSubCategory$Params, context?: HttpContext): Observable<number> {
    return this.createSubCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
