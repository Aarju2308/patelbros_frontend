/* tslint:disable */
/* eslint-disable */
import { ProductResponse } from '../models/product-response';
export interface OrderDetailResponse {
  id?: number;
  product?: ProductResponse;
  quantity?: number;
  total?: number;
}
