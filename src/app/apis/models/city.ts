/* tslint:disable */
/* eslint-disable */
import { State } from '../models/state';
export interface City {
  active?: boolean;
  estimatedShippingCost?: number;
  id?: number;
  name?: string;
  pinCode?: string;
  state?: State;
}
