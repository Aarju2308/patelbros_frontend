/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Address } from '../../models/address';

export interface GetSingleAddress$Params {
  addressId: number;
}

export function getSingleAddress(http: HttpClient, rootUrl: string, params: GetSingleAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<Address>> {
  const rb = new RequestBuilder(rootUrl, getSingleAddress.PATH, 'get');
  if (params) {
    rb.path('addressId', params.addressId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Address>;
    })
  );
}

getSingleAddress.PATH = '/user/address/{addressId}';
