import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { SubCategoryListComponent } from './pages/sub-category-list/sub-category-list.component';
import { AddSubCategoryComponent } from './pages/add-sub-category/add-sub-category.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ThirdCategoryListComponent } from './pages/third-category-list/third-category-list.component';
import { AddThirdCategoryComponent } from './pages/add-third-category/add-third-category.component';
import { BrandListComponent } from './pages/brand-list/brand-list.component';
import { AddBrandComponent } from './pages/add-brand/add-brand.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { guardGuard } from '../services/guard/admin/guard.guard';
import { OrdersComponent } from './pages/orders/orders.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {path : "", component : HomeComponent, children : [
    {path : "", component : DashboardComponent},
    {path : "categoryList", component : CategoryListComponent},
    {path : "addCategory", component : AddCategoryComponent},
    {path : "editCategory/:catId", component : AddCategoryComponent},
    {path : "subCategoryList", component : SubCategoryListComponent},
    {path : "addSubCategory", component : AddSubCategoryComponent},
    {path : "editSubCategory/:subCatId", component : AddSubCategoryComponent},
    {path : "thirdCategoryList", component : ThirdCategoryListComponent},
    {path : "addThirdCategory", component : AddThirdCategoryComponent},
    {path : "editThirdCategory/:thirdCatId", component : AddThirdCategoryComponent},
    {path : "brandList", component : BrandListComponent},
    {path : "addBrand", component : AddBrandComponent},
    {path : "editBrand/:brandId", component : AddBrandComponent},
    {path : "productList", component : ProductListComponent},
    {path : "addProduct", component : AddProductComponent},
    {path : "editProduct/:productId", component : AddProductComponent},
    {path : "orders", component : OrdersComponent},
    {path : "users", component : UsersComponent},
  ], canActivateChild : [guardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
