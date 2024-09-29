/* tslint:disable */
/* eslint-disable */
import { ProductResponse } from '../models/product-response';
export interface CartResponse {
  id?: number;
  product?: ProductResponse;
  quantity?: number;
  total?: number;
}
