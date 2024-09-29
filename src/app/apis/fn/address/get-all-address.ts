/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Address } from '../../models/address';

export interface GetAllAddress$Params {
}

export function getAllAddress(http: HttpClient, rootUrl: string, params?: GetAllAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Address>>> {
  const rb = new RequestBuilder(rootUrl, getAllAddress.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Address>>;
    })
  );
}

getAllAddress.PATH = '/user/address/';
