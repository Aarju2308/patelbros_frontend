/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addToCart1 } from '../fn/public/add-to-cart-1';
import { AddToCart1$Params } from '../fn/public/add-to-cart-1';
import { BrandResponse } from '../models/brand-response';
import { CartResponse } from '../models/cart-response';
import { City } from '../models/city';
import { Country } from '../models/country';
import { getAllBrands } from '../fn/public/get-all-brands';
import { GetAllBrands$Params } from '../fn/public/get-all-brands';
import { getAllCategories } from '../fn/public/get-all-categories';
import { GetAllCategories$Params } from '../fn/public/get-all-categories';
import { getAllCitiesByState } from '../fn/public/get-all-cities-by-state';
import { GetAllCitiesByState$Params } from '../fn/public/get-all-cities-by-state';
import { getAllCountries } from '../fn/public/get-all-countries';
import { GetAllCountries$Params } from '../fn/public/get-all-countries';
import { getAllStatesByCountry } from '../fn/public/get-all-states-by-country';
import { GetAllStatesByCountry$Params } from '../fn/public/get-all-states-by-country';
import { getAllSubCategories } from '../fn/public/get-all-sub-categories';
import { GetAllSubCategories$Params } from '../fn/public/get-all-sub-categories';
import { getAllSubCategoriesByCategory } from '../fn/public/get-all-sub-categories-by-category';
import { GetAllSubCategoriesByCategory$Params } from '../fn/public/get-all-sub-categories-by-category';
import { getAllThirdCategories } from '../fn/public/get-all-third-categories';
import { GetAllThirdCategories$Params } from '../fn/public/get-all-third-categories';
import { getCartByUniqueId } from '../fn/public/get-cart-by-unique-id';
import { GetCartByUniqueId$Params } from '../fn/public/get-cart-by-unique-id';
import { getCartCountByUniqueId } from '../fn/public/get-cart-count-by-unique-id';
import { GetCartCountByUniqueId$Params } from '../fn/public/get-cart-count-by-unique-id';
import { getProductPage } from '../fn/public/get-product-page';
import { GetProductPage$Params } from '../fn/public/get-product-page';
import { getProductPageByThirdCategory } from '../fn/public/get-product-page-by-third-category';
import { GetProductPageByThirdCategory$Params } from '../fn/public/get-product-page-by-third-category';
import { getProductsPageBySubCategory } from '../fn/public/get-products-page-by-sub-category';
import { GetProductsPageBySubCategory$Params } from '../fn/public/get-products-page-by-sub-category';
import { getProductsPageByThirdCategories } from '../fn/public/get-products-page-by-third-categories';
import { GetProductsPageByThirdCategories$Params } from '../fn/public/get-products-page-by-third-categories';
import { getSinglePublicProduct } from '../fn/public/get-single-public-product';
import { GetSinglePublicProduct$Params } from '../fn/public/get-single-public-product';
import { getSubCategyPage } from '../fn/public/get-sub-categy-page';
import { GetSubCategyPage$Params } from '../fn/public/get-sub-categy-page';
import { getThirdCategoryBySubCategory } from '../fn/public/get-third-category-by-sub-category';
import { GetThirdCategoryBySubCategory$Params } from '../fn/public/get-third-category-by-sub-category';
import { PageResponseCategoryResponse } from '../models/page-response-category-response';
import { PageResponseProductResponse } from '../models/page-response-product-response';
import { PageResponseSubCategoryResponse } from '../models/page-response-sub-category-response';
import { PageResponseThirdCategoryResponse } from '../models/page-response-third-category-response';
import { ProductResponse } from '../models/product-response';
import { searchProducts } from '../fn/public/search-products';
import { SearchProducts$Params } from '../fn/public/search-products';
import { State } from '../models/state';
import { SubCategoryResponse } from '../models/sub-category-response';
import { ThirdCategoryResponse } from '../models/third-category-response';

@Injectable({ providedIn: 'root' })
export class PublicService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getProductsPageByThirdCategories()` */
  static readonly GetProductsPageByThirdCategoriesPath = '/public/productsByThirdCategories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductsPageByThirdCategories()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getProductsPageByThirdCategories$Response(params: GetProductsPageByThirdCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
    return getProductsPageByThirdCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductsPageByThirdCategories$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getProductsPageByThirdCategories(params: GetProductsPageByThirdCategories$Params, context?: HttpContext): Observable<PageResponseProductResponse> {
    return this.getProductsPageByThirdCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProductResponse>): PageResponseProductResponse => r.body)
    );
  }

  /** Path part for operation `getCartByUniqueId()` */
  static readonly GetCartByUniqueIdPath = '/public/cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCartByUniqueId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartByUniqueId$Response(params: GetCartByUniqueId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CartResponse>>> {
    return getCartByUniqueId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCartByUniqueId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartByUniqueId(params: GetCartByUniqueId$Params, context?: HttpContext): Observable<Array<CartResponse>> {
    return this.getCartByUniqueId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CartResponse>>): Array<CartResponse> => r.body)
    );
  }

  /** Path part for operation `addToCart1()` */
  static readonly AddToCart1Path = '/public/cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addToCart1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addToCart1$Response(params: AddToCart1$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return addToCart1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addToCart1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addToCart1(params: AddToCart1$Params, context?: HttpContext): Observable<number> {
    return this.addToCart1$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllThirdCategories()` */
  static readonly GetAllThirdCategoriesPath = '/public/thirdCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllThirdCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllThirdCategories$Response(params?: GetAllThirdCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseThirdCategoryResponse>> {
    return getAllThirdCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllThirdCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllThirdCategories(params?: GetAllThirdCategories$Params, context?: HttpContext): Observable<PageResponseThirdCategoryResponse> {
    return this.getAllThirdCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseThirdCategoryResponse>): PageResponseThirdCategoryResponse => r.body)
    );
  }

  /** Path part for operation `getThirdCategoryBySubCategory()` */
  static readonly GetThirdCategoryBySubCategoryPath = '/public/thirdCategoryBySubCategory/{subCatId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getThirdCategoryBySubCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getThirdCategoryBySubCategory$Response(params: GetThirdCategoryBySubCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ThirdCategoryResponse>>> {
    return getThirdCategoryBySubCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getThirdCategoryBySubCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getThirdCategoryBySubCategory(params: GetThirdCategoryBySubCategory$Params, context?: HttpContext): Observable<Array<ThirdCategoryResponse>> {
    return this.getThirdCategoryBySubCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ThirdCategoryResponse>>): Array<ThirdCategoryResponse> => r.body)
    );
  }

  /** Path part for operation `getSubCategyPage()` */
  static readonly GetSubCategyPagePath = '/public/subCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubCategyPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubCategyPage$Response(params?: GetSubCategyPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseSubCategoryResponse>> {
    return getSubCategyPage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSubCategyPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubCategyPage(params?: GetSubCategyPage$Params, context?: HttpContext): Observable<PageResponseSubCategoryResponse> {
    return this.getSubCategyPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseSubCategoryResponse>): PageResponseSubCategoryResponse => r.body)
    );
  }

  /** Path part for operation `getAllSubCategoriesByCategory()` */
  static readonly GetAllSubCategoriesByCategoryPath = '/public/subCategoryByCategory/{catId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSubCategoriesByCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSubCategoriesByCategory$Response(params: GetAllSubCategoriesByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SubCategoryResponse>>> {
    return getAllSubCategoriesByCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSubCategoriesByCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSubCategoriesByCategory(params: GetAllSubCategoriesByCategory$Params, context?: HttpContext): Observable<Array<SubCategoryResponse>> {
    return this.getAllSubCategoriesByCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SubCategoryResponse>>): Array<SubCategoryResponse> => r.body)
    );
  }

  /** Path part for operation `getAllSubCategories()` */
  static readonly GetAllSubCategoriesPath = '/public/subCategories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSubCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSubCategories$Response(params?: GetAllSubCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SubCategoryResponse>>> {
    return getAllSubCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSubCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSubCategories(params?: GetAllSubCategories$Params, context?: HttpContext): Observable<Array<SubCategoryResponse>> {
    return this.getAllSubCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SubCategoryResponse>>): Array<SubCategoryResponse> => r.body)
    );
  }

  /** Path part for operation `getAllStatesByCountry()` */
  static readonly GetAllStatesByCountryPath = '/public/state/{countryId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStatesByCountry()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStatesByCountry$Response(params: GetAllStatesByCountry$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<State>>> {
    return getAllStatesByCountry(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllStatesByCountry$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStatesByCountry(params: GetAllStatesByCountry$Params, context?: HttpContext): Observable<Array<State>> {
    return this.getAllStatesByCountry$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<State>>): Array<State> => r.body)
    );
  }

  /** Path part for operation `getSinglePublicProduct()` */
  static readonly GetSinglePublicProductPath = '/public/singleProduct/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSinglePublicProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSinglePublicProduct$Response(params: GetSinglePublicProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
    return getSinglePublicProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSinglePublicProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSinglePublicProduct(params: GetSinglePublicProduct$Params, context?: HttpContext): Observable<ProductResponse> {
    return this.getSinglePublicProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductResponse>): ProductResponse => r.body)
    );
  }

  /** Path part for operation `searchProducts()` */
  static readonly SearchProductsPath = '/public/searchProducts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchProducts$Response(params: SearchProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProductResponse>>> {
    return searchProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchProducts(params: SearchProducts$Params, context?: HttpContext): Observable<Array<ProductResponse>> {
    return this.searchProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProductResponse>>): Array<ProductResponse> => r.body)
    );
  }

  /** Path part for operation `getProductsPageBySubCategory()` */
  static readonly GetProductsPageBySubCategoryPath = '/public/productsBySubCategory/{subCatId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductsPageBySubCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsPageBySubCategory$Response(params: GetProductsPageBySubCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
    return getProductsPageBySubCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductsPageBySubCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsPageBySubCategory(params: GetProductsPageBySubCategory$Params, context?: HttpContext): Observable<PageResponseProductResponse> {
    return this.getProductsPageBySubCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProductResponse>): PageResponseProductResponse => r.body)
    );
  }

  /** Path part for operation `getProductPage()` */
  static readonly GetProductPagePath = '/public/product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductPage$Response(params?: GetProductPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
    return getProductPage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductPage(params?: GetProductPage$Params, context?: HttpContext): Observable<PageResponseProductResponse> {
    return this.getProductPage$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProductResponse>): PageResponseProductResponse => r.body)
    );
  }

  /** Path part for operation `getProductPageByThirdCategory()` */
  static readonly GetProductPageByThirdCategoryPath = '/public/product/{thirdCatId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductPageByThirdCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductPageByThirdCategory$Response(params: GetProductPageByThirdCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
    return getProductPageByThirdCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductPageByThirdCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductPageByThirdCategory(params: GetProductPageByThirdCategory$Params, context?: HttpContext): Observable<PageResponseProductResponse> {
    return this.getProductPageByThirdCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProductResponse>): PageResponseProductResponse => r.body)
    );
  }

  /** Path part for operation `getAllCountries()` */
  static readonly GetAllCountriesPath = '/public/country';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCountries()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCountries$Response(params?: GetAllCountries$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Country>>> {
    return getAllCountries(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCountries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCountries(params?: GetAllCountries$Params, context?: HttpContext): Observable<Array<Country>> {
    return this.getAllCountries$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Country>>): Array<Country> => r.body)
    );
  }

  /** Path part for operation `getCartCountByUniqueId()` */
  static readonly GetCartCountByUniqueIdPath = '/public/countCart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCartCountByUniqueId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartCountByUniqueId$Response(params: GetCartCountByUniqueId$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getCartCountByUniqueId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCartCountByUniqueId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCartCountByUniqueId(params: GetCartCountByUniqueId$Params, context?: HttpContext): Observable<number> {
    return this.getCartCountByUniqueId$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllCitiesByState()` */
  static readonly GetAllCitiesByStatePath = '/public/city/{stateId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCitiesByState()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCitiesByState$Response(params: GetAllCitiesByState$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<City>>> {
    return getAllCitiesByState(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCitiesByState$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCitiesByState(params: GetAllCitiesByState$Params, context?: HttpContext): Observable<Array<City>> {
    return this.getAllCitiesByState$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<City>>): Array<City> => r.body)
    );
  }

  /** Path part for operation `getAllCategories()` */
  static readonly GetAllCategoriesPath = '/public/category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories$Response(params?: GetAllCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseCategoryResponse>> {
    return getAllCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCategories(params?: GetAllCategories$Params, context?: HttpContext): Observable<PageResponseCategoryResponse> {
    return this.getAllCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseCategoryResponse>): PageResponseCategoryResponse => r.body)
    );
  }

  /** Path part for operation `getAllBrands()` */
  static readonly GetAllBrandsPath = '/public/brands';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBrands()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBrands$Response(params?: GetAllBrands$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BrandResponse>>> {
    return getAllBrands(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBrands$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBrands(params?: GetAllBrands$Params, context?: HttpContext): Observable<Array<BrandResponse>> {
    return this.getAllBrands$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BrandResponse>>): Array<BrandResponse> => r.body)
    );
  }

}
