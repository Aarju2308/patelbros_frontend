/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addProduct } from '../fn/product/add-product';
import { AddProduct$Params } from '../fn/product/add-product';
import { deleteProduct } from '../fn/product/delete-product';
import { DeleteProduct$Params } from '../fn/product/delete-product';
import { getSingleProduct } from '../fn/product/get-single-product';
import { GetSingleProduct$Params } from '../fn/product/get-single-product';
import { ProductResponse } from '../models/product-response';
import { updateProduct } from '../fn/product/update-product';
import { UpdateProduct$Params } from '../fn/product/update-product';
import { uploadProductImage } from '../fn/product/upload-product-image';
import { UploadProductImage$Params } from '../fn/product/upload-product-image';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getSingleProduct()` */
  static readonly GetSingleProductPath = '/admin/product/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSingleProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleProduct$Response(params: GetSingleProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
    return getSingleProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSingleProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSingleProduct(params: GetSingleProduct$Params, context?: HttpContext): Observable<ProductResponse> {
    return this.getSingleProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductResponse>): ProductResponse => r.body)
    );
  }

  /** Path part for operation `updateProduct()` */
  static readonly UpdateProductPath = '/admin/product/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProduct$Response(params: UpdateProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProduct(params: UpdateProduct$Params, context?: HttpContext): Observable<number> {
    return this.updateProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteProduct()` */
  static readonly DeleteProductPath = '/admin/product/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProduct$Response(params: DeleteProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProduct(params: DeleteProduct$Params, context?: HttpContext): Observable<number> {
    return this.deleteProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `addProduct()` */
  static readonly AddProductPath = '/admin/product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProduct$Response(params: AddProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProduct(params: AddProduct$Params, context?: HttpContext): Observable<number> {
    return this.addProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadProductImage()` */
  static readonly UploadProductImagePath = '/admin/productImage/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProductImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProductImage$Response(params: UploadProductImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProductImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProductImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProductImage(params: UploadProductImage$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProductImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
