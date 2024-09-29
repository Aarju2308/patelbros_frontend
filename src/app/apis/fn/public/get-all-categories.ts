/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseCategoryResponse } from '../../models/page-response-category-response';

export interface GetAllCategories$Params {
  page?: number;
  size?: number;
}

export function getAllCategories(http: HttpClient, rootUrl: string, params?: GetAllCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCategoryResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllCategories.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseCategoryResponse>;
    })
  );
}

getAllCategories.PATH = '/public/category';
