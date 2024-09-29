/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartResponse } from '../../models/cart-response';

export interface GetCartByUser$Params {
  page?: number;
  size?: number;
}

export function getCartByUser(http: HttpClient, rootUrl: string, params?: GetCartByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CartResponse>>> {
  const rb = new RequestBuilder(rootUrl, getCartByUser.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CartResponse>>;
    })
  );
}

getCartByUser.PATH = '/user/cart';
