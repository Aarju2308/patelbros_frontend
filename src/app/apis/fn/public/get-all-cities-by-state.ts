/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { City } from '../../models/city';

export interface GetAllCitiesByState$Params {
  stateId: number;
}

export function getAllCitiesByState(http: HttpClient, rootUrl: string, params: GetAllCitiesByState$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<City>>> {
  const rb = new RequestBuilder(rootUrl, getAllCitiesByState.PATH, 'get');
  if (params) {
    rb.path('stateId', params.stateId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<City>>;
    })
  );
}

getAllCitiesByState.PATH = '/public/city/{stateId}';
