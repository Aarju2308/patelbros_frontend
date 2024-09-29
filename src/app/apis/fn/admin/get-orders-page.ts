/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseOrderResponse } from '../../models/page-response-order-response';

export interface GetOrdersPage$Params {
  page?: number;
  size?: number;
}

export function getOrdersPage(http: HttpClient, rootUrl: string, params?: GetOrdersPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseOrderResponse>> {
  const rb = new RequestBuilder(rootUrl, getOrdersPage.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseOrderResponse>;
    })
  );
}

getOrdersPage.PATH = '/admin/orders';
