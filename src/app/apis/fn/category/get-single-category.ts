/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CategoryResponse } from '../../models/category-response';

export interface GetSingleCategory$Params {
  catId: number;
}

export function getSingleCategory(http: HttpClient, rootUrl: string, params: GetSingleCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryResponse>> {
  const rb = new RequestBuilder(rootUrl, getSingleCategory.PATH, 'get');
  if (params) {
    rb.path('catId', params.catId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CategoryResponse>;
    })
  );
}

getSingleCategory.PATH = '/admin/category/{catId}';
