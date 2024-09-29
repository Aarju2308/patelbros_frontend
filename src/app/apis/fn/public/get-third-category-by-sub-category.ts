/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ThirdCategoryResponse } from '../../models/third-category-response';

export interface GetThirdCategoryBySubCategory$Params {
  subCatId: number;
}

export function getThirdCategoryBySubCategory(http: HttpClient, rootUrl: string, params: GetThirdCategoryBySubCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ThirdCategoryResponse>>> {
  const rb = new RequestBuilder(rootUrl, getThirdCategoryBySubCategory.PATH, 'get');
  if (params) {
    rb.path('subCatId', params.subCatId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ThirdCategoryResponse>>;
    })
  );
}

getThirdCategoryBySubCategory.PATH = '/public/thirdCategoryBySubCategory/{subCatId}';
