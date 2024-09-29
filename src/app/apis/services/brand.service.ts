/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addBrand } from '../fn/brand/add-brand';
import { AddBrand$Params } from '../fn/brand/add-brand';
import { BrandResponse } from '../models/brand-response';
import { deleteBrand } from '../fn/brand/delete-brand';
import { DeleteBrand$Params } from '../fn/brand/delete-brand';
import { getBrandsPage } from '../fn/brand/get-brands-page';
import { GetBrandsPage$Params } from '../fn/brand/get-brands-page';
import { getSingleBrand } from '../fn/brand/get-single-brand';
import { GetSingleBrand$Params } from '../fn/brand/get-single-brand';
import { PageResponseBrandResponse } from '../models/page-response-brand-response';
import { updateBrand } from '../fn/brand/update-brand';
import { UpdateBrand$Params } from '../fn/brand/update-brand';
import { uploadBrandLogo } from '../fn/brand/upload-brand-logo';
import { UploadBrandLogo$Params } from '../fn/brand/upload-brand-logo';

@Injectable({ providedIn: 'root' })
export class BrandService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getSingleBrand()` */
  static readonly GetSingleBrandPath = '/admin/brand/{brandId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSingleBrand()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleBrand$Response(params: GetSingleBrand$Params, context?: HttpContext): Observable<StrictHttpResponse<BrandResponse>> {
    return getSingleBrand(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSingleBrand$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleBrand(params: GetSingleBrand$Params, context?: HttpContext): Observable<BrandResponse> {
    return this.getSingleBrand$Response(params, context).pipe(
      map((r: StrictHttpResponse<BrandResponse>): BrandResponse => r.body)
    );
  }

  /** Path part for operation `updateBrand()` */
  static readonly UpdateBrandPath = '/admin/brand/{brandId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBrand()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBrand$Response(params: UpdateBrand$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateBrand(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateBrand$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBrand(params: UpdateBrand$Params, context?: HttpContext): Observable<number> {
    return this.updateBrand$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteBrand()` */
  static readonly DeleteBrandPath = '/admin/brand/{brandId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBrand()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBrand$Response(params: DeleteBrand$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteBrand(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBrand$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBrand(params: DeleteBrand$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteBrand$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `uploadBrandLogo()` */
  static readonly UploadBrandLogoPath = '/admin/logo/{brandId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBrandLogo()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBrandLogo$Response(params: UploadBrandLogo$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadBrandLogo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadBrandLogo$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadBrandLogo(params: UploadBrandLogo$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadBrandLogo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getBrandsPage()` */
  static readonly GetBrandsPagePath = '/admin/brand';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBrandsPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBrandsPage$Response(params?: GetBrandsPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBrandResponse>> {
    return getBrandsPage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBrandsPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBrandsPage(params?: GetBrandsPage$Params, context?: HttpContext): Observable<PageResponseBrandResponse> {
    return this.getBrandsPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBrandResponse>): PageResponseBrandResponse => r.body)
    );
  }

  /** Path part for operation `addBrand()` */
  static readonly AddBrandPath = '/admin/brand';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addBrand()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBrand$Response(params: AddBrand$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addBrand(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addBrand$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addBrand(params: AddBrand$Params, context?: HttpContext): Observable<number> {
    return this.addBrand$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
