/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CategoryResponse } from '../models/category-response';
import { createCategory } from '../fn/category/create-category';
import { CreateCategory$Params } from '../fn/category/create-category';
import { deleteCategory } from '../fn/category/delete-category';
import { DeleteCategory$Params } from '../fn/category/delete-category';
import { getMethodName } from '../fn/category/get-method-name';
import { GetMethodName$Params } from '../fn/category/get-method-name';
import { getSingleCategory } from '../fn/category/get-single-category';
import { GetSingleCategory$Params } from '../fn/category/get-single-category';
import { updateCategory } from '../fn/category/update-category';
import { UpdateCategory$Params } from '../fn/category/update-category';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getSingleCategory()` */
  static readonly GetSingleCategoryPath = '/admin/category/{catId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSingleCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleCategory$Response(params: GetSingleCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryResponse>> {
    return getSingleCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSingleCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleCategory(params: GetSingleCategory$Params, context?: HttpContext): Observable<CategoryResponse> {
    return this.getSingleCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryResponse>): CategoryResponse => r.body)
    );
  }

  /** Path part for operation `updateCategory()` */
  static readonly UpdateCategoryPath = '/admin/category/{catId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategory$Response(params: UpdateCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategory(params: UpdateCategory$Params, context?: HttpContext): Observable<number> {
    return this.updateCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteCategory()` */
  static readonly DeleteCategoryPath = '/admin/category/{catId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCategory$Response(params: DeleteCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCategory(params: DeleteCategory$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `createCategory()` */
  static readonly CreateCategoryPath = '/admin/category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategory$Response(params: CreateCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategory(params: CreateCategory$Params, context?: HttpContext): Observable<number> {
    return this.createCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getMethodName()` */
  static readonly GetMethodNamePath = '/admin/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMethodName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMethodName$Response(params?: GetMethodName$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getMethodName(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMethodName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMethodName(params?: GetMethodName$Params, context?: HttpContext): Observable<string> {
    return this.getMethodName$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
