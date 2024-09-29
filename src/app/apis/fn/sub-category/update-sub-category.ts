/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SubCategoryRequest } from '../../models/sub-category-request';

export interface UpdateSubCategory$Params {
  subCatId: number;
      body: SubCategoryRequest
}

export function updateSubCategory(http: HttpClient, rootUrl: string, params: UpdateSubCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, updateSubCategory.PATH, 'put');
  if (params) {
    rb.path('subCatId', params.subCatId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

updateSubCategory.PATH = '/admin/subCategory/{subCatId}';
