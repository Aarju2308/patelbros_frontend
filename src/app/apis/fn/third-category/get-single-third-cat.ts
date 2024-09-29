/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ThirdCategoryResponse } from '../../models/third-category-response';

export interface GetSingleThirdCat$Params {
  thirdCatId: number;
}

export function getSingleThirdCat(http: HttpClient, rootUrl: string, params: GetSingleThirdCat$Params, context?: HttpContext): Observable<StrictHttpResponse<ThirdCategoryResponse>> {
  const rb = new RequestBuilder(rootUrl, getSingleThirdCat.PATH, 'get');
  if (params) {
    rb.path('thirdCatId', params.thirdCatId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ThirdCategoryResponse>;
    })
  );
}

getSingleThirdCat.PATH = '/admin/thirdCategory/{thirdCatId}';
