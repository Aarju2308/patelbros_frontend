/* tslint:disable */
/* eslint-disable */
import { SubCategoryResponse } from '../models/sub-category-response';
export interface PageResponseSubCategoryResponse {
  content?: Array<SubCategoryResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
