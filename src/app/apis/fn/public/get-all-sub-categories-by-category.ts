/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SubCategoryResponse } from '../../models/sub-category-response';

export interface GetAllSubCategoriesByCategory$Params {
  catId: number;
}

export function getAllSubCategoriesByCategory(http: HttpClient, rootUrl: string, params: GetAllSubCategoriesByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SubCategoryResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllSubCategoriesByCategory.PATH, 'get');
  if (params) {
    rb.path('catId', params.catId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SubCategoryResponse>>;
    })
  );
}

getAllSubCategoriesByCategory.PATH = '/public/subCategoryByCategory/{catId}';
