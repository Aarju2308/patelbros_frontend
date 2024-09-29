/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BrandResponse } from '../../models/brand-response';

export interface GetAllBrands$Params {
}

export function getAllBrands(http: HttpClient, rootUrl: string, params?: GetAllBrands$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BrandResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllBrands.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BrandResponse>>;
    })
  );
}

getAllBrands.PATH = '/public/brands';
