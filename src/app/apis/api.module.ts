/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';
import { AdminService } from './services/admin.service';
import { ThirdCategoryService } from './services/third-category.service';
import { SubCategoryService } from './services/sub-category.service';
import { ProductService } from './services/product.service';
import { CountryService } from './services/country.service';
import { CategoryService } from './services/category.service';
import { BrandService } from './services/brand.service';
import { OrderService } from './services/order.service';
import { PublicService } from './services/public.service';
import { AuthenticationService } from './services/authentication.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UserService,
    AddressService,
    AdminService,
    ThirdCategoryService,
    SubCategoryService,
    ProductService,
    CountryService,
    CategoryService,
    BrandService,
    OrderService,
    PublicService,
    AuthenticationService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
