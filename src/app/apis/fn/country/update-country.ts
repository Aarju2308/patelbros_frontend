/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Country } from '../../models/country';

export interface UpdateCountry$Params {
  id: number;
      body: Country
}

export function updateCountry(http: HttpClient, rootUrl: string, params: UpdateCountry$Params, context?: HttpContext): Observable<StrictHttpResponse<Country>> {
  const rb = new RequestBuilder(rootUrl, updateCountry.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Country>;
    })
  );
}

updateCountry.PATH = '/admin/country/{id}';
