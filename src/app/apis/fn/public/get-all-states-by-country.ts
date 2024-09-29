/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { State } from '../../models/state';

export interface GetAllStatesByCountry$Params {
  countryId: number;
}

export function getAllStatesByCountry(http: HttpClient, rootUrl: string, params: GetAllStatesByCountry$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<State>>> {
  const rb = new RequestBuilder(rootUrl, getAllStatesByCountry.PATH, 'get');
  if (params) {
    rb.path('countryId', params.countryId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<State>>;
    })
  );
}

getAllStatesByCountry.PATH = '/public/state/{countryId}';
