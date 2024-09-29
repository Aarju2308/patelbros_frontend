/* tslint:disable */
/* eslint-disable */
import { Address } from '../models/address';
import { OrderDetailResponse } from '../models/order-detail-response';
export interface OrderResponse {
  address?: Address;
  billNo?: string;
  id?: number;
  issuedAt?: string;
  netAmount?: number;
  orderDetails?: Array<OrderDetailResponse>;
  payment?: string;
  status?: 'PENDING' | 'ACCEPTED' | 'PROCESSING' | 'SHIPPED' | 'OFD' | 'DELIVERED' | 'CANCELLED';
  totalProducts?: number;
}
