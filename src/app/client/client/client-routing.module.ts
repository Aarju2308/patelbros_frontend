import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { MainComponent } from '../components/main/main.component';
import { ProductsComponent } from '../pages/products/products.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { SingleProductComponent } from '../pages/single-product/single-product.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { VerifyAccountComponent } from '../pages/verify-account/verify-account.component';
import { CartComponent } from '../pages/cart/cart.component';
import { CheckoutComponent } from '../pages/checkout/checkout.component';
import { OrderHistoryComponent } from '../pages/order-history/order-history.component';
import { InvoiceComponent } from '../pages/invoice/invoice.component';
import { TrackOrderComponent } from '../pages/track-order/track-order.component';
import { guardGuard } from '../../services/guard/client/guard.guard';
import { TermsComponent } from '../pages/terms/terms.component';
import { AboutUsComponent } from '../pages/about-us/about-us.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { FaqsComponent } from '../pages/faqs/faqs.component';
import { PolicyComponent } from '../pages/policy/policy.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { paymentSuccess } from '../../apis/fn/order/payment-success';
import { PaymentSuccessComponent } from '../pages/payment-success/payment-success.component';
import { PaymentFailedComponent } from '../pages/payment-failed/payment-failed.component';

const routes: Routes = [
  {path : "", component : HomeComponent , children : [
    {path : "", component : MainComponent},
    {path : "404", component : PageNotFoundComponent},
    {path : "login", component : LoginComponent},
    {path : "register", component : RegisterComponent},
    {path : "verify-account", component : VerifyAccountComponent},
    {path : "products/:subCatId", component : ProductsComponent},
    {path : "singleProduct/:productId", component : SingleProductComponent},
    {path : "cart", component : CartComponent},
    {path : "terms", component : TermsComponent},
    {path : "about-us", component : AboutUsComponent},
    {path : "contact-us", component : ContactUsComponent},
    {path : "faqs", component : FaqsComponent},
    {path : "policy", component : PolicyComponent},
    {path : "success", component : PaymentSuccessComponent},
    {path : "failed", component : PaymentFailedComponent},
    {path : "profile", component : ProfileComponent,canActivate:[guardGuard]},
    {path : "checkout/:paymentId", component : CheckoutComponent,canActivate:[guardGuard]},
    {path : "history", component : OrderHistoryComponent,canActivate:[guardGuard]},
    {path : "invoice/:billNo", component : InvoiceComponent,canActivate:[guardGuard]},
    {path : "track/:billNo", component : TrackOrderComponent,canActivate:[guardGuard]},
    
    // { path: '**', redirectTo: '/404', pathMatch: 'full' } 
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
