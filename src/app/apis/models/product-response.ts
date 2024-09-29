/* tslint:disable */
/* eslint-disable */
import { BrandResponse } from '../models/brand-response';
import { ThirdCategoryResponse } from '../models/third-category-response';
export interface ProductResponse {
  active?: boolean;
  brand?: BrandResponse;
  descrtiption?: string;
  id?: number;
  image?: string;
  name?: string;
  price?: number;
  rating?: number;
  thirdCategory?: ThirdCategoryResponse;
}
