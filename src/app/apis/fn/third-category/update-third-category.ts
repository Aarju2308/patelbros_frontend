/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ThirdCategoryRequest } from '../../models/third-category-request';

export interface UpdateThirdCategory$Params {
  thirdCatId: number;
      body: ThirdCategoryRequest
}

export function updateThirdCategory(http: HttpClient, rootUrl: string, params: UpdateThirdCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, updateThirdCategory.PATH, 'put');
  if (params) {
    rb.path('thirdCatId', params.thirdCatId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

updateThirdCategory.PATH = '/admin/thirdCategory/{thirdCatId}';
