/* tslint:disable */
/* eslint-disable */
import { BrandResponse } from '../models/brand-response';
export interface PageResponseBrandResponse {
  content?: Array<BrandResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
