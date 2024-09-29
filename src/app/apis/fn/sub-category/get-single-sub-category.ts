/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SubCategoryResponse } from '../../models/sub-category-response';

export interface GetSingleSubCategory$Params {
  subCatId: number;
}

export function getSingleSubCategory(http: HttpClient, rootUrl: string, params: GetSingleSubCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<SubCategoryResponse>> {
  const rb = new RequestBuilder(rootUrl, getSingleSubCategory.PATH, 'get');
  if (params) {
    rb.path('subCatId', params.subCatId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SubCategoryResponse>;
    })
  );
}

getSingleSubCategory.PATH = '/admin/subCategory/{subCatId}';
