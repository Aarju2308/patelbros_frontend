/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseProductResponse } from '../../models/page-response-product-response';

export interface GetProductsPageByThirdCategories$Params {
  size?: number;
  page?: number;
  filter?: number;
      body: Array<number>
}

export function getProductsPageByThirdCategories(http: HttpClient, rootUrl: string, params: GetProductsPageByThirdCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
  const rb = new RequestBuilder(rootUrl, getProductsPageByThirdCategories.PATH, 'post');
  if (params) {
    rb.query('size', params.size, {});
    rb.query('page', params.page, {});
    rb.query('filter', params.filter, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseProductResponse>;
    })
  );
}

getProductsPageByThirdCategories.PATH = '/public/productsByThirdCategories';
