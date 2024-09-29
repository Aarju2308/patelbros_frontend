/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBrandResponse } from '../../models/page-response-brand-response';

export interface GetBrandsPage$Params {
  page?: number;
  size?: number;
}

export function getBrandsPage(http: HttpClient, rootUrl: string, params?: GetBrandsPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBrandResponse>> {
  const rb = new RequestBuilder(rootUrl, getBrandsPage.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseBrandResponse>;
    })
  );
}

getBrandsPage.PATH = '/admin/brand';
