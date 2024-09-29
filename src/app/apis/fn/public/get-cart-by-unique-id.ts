/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartResponse } from '../../models/cart-response';

export interface GetCartByUniqueId$Params {
  uniqueId: number;
}

export function getCartByUniqueId(http: HttpClient, rootUrl: string, params: GetCartByUniqueId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CartResponse>>> {
  const rb = new RequestBuilder(rootUrl, getCartByUniqueId.PATH, 'get');
  if (params) {
    rb.query('uniqueId', params.uniqueId, {});
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

getCartByUniqueId.PATH = '/public/cart';
