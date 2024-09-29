/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseThirdCategoryResponse } from '../../models/page-response-third-category-response';

export interface GetAllThirdCategories$Params {
  size?: number;
  page?: number;
}

export function getAllThirdCategories(http: HttpClient, rootUrl: string, params?: GetAllThirdCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseThirdCategoryResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllThirdCategories.PATH, 'get');
  if (params) {
    rb.query('size', params.size, {});
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseThirdCategoryResponse>;
    })
  );
}

getAllThirdCategories.PATH = '/public/thirdCategory';
