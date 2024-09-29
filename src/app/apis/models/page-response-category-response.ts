/* tslint:disable */
/* eslint-disable */
import { CategoryResponse } from '../models/category-response';
export interface PageResponseCategoryResponse {
  content?: Array<CategoryResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
