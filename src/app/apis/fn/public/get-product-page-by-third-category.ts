/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseProductResponse } from '../../models/page-response-product-response';

export interface GetProductPageByThirdCategory$Params {
  thirdCatId: number;
}

export function getProductPageByThirdCategory(http: HttpClient, rootUrl: string, params: GetProductPageByThirdCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
  const rb = new RequestBuilder(rootUrl, getProductPageByThirdCategory.PATH, 'get');
  if (params) {
    rb.path('thirdCatId', params.thirdCatId, {});
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

getProductPageByThirdCategory.PATH = '/public/product/{thirdCatId}';
