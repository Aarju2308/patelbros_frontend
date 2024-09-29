/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BrandResponse } from '../../models/brand-response';

export interface GetSingleBrand$Params {
  brandId: number;
}

export function getSingleBrand(http: HttpClient, rootUrl: string, params: GetSingleBrand$Params, context?: HttpContext): Observable<StrictHttpResponse<BrandResponse>> {
  const rb = new RequestBuilder(rootUrl, getSingleBrand.PATH, 'get');
  if (params) {
    rb.path('brandId', params.brandId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BrandResponse>;
    })
  );
}

getSingleBrand.PATH = '/admin/brand/{brandId}';
