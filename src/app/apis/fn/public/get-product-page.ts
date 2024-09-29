/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseProductResponse } from '../../models/page-response-product-response';

export interface GetProductPage$Params {
  page?: number;
  size?: number;
  filter?: number;
}

export function getProductPage(http: HttpClient, rootUrl: string, params?: GetProductPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
  const rb = new RequestBuilder(rootUrl, getProductPage.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('filter', params.filter, {});
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

getProductPage.PATH = '/public/product';
