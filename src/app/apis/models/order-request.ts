/* tslint:disable */
/* eslint-disable */
export interface OrderRequest {
  addressId?: number;
  orderStatus?: 'PENDING' | 'ACCEPTED' | 'PROCESSING' | 'SHIPPED' | 'OFD' | 'DELIVERED' | 'CANCELLED';
}
