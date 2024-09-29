/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseSubCategoryResponse } from '../../models/page-response-sub-category-response';

export interface GetSubCategyPage$Params {
  page?: number;
  size?: number;
}

export function getSubCategyPage(http: HttpClient, rootUrl: string, params?: GetSubCategyPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseSubCategoryResponse>> {
  const rb = new RequestBuilder(rootUrl, getSubCategyPage.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseSubCategoryResponse>;
    })
  );
}

getSubCategyPage.PATH = '/public/subCategory';
