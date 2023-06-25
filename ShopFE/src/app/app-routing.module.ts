import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomepageComponent } from './user/homepage/homepage.component';
import { ProductsComponent } from './user/products/products.component';
import { ContactComponent } from './user/contact/contact.component';
import { CartComponent } from './user/cart/cart.component';
import { AccountComponent } from './user/account/account.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MyaccountComponent } from './user/myaccount/myaccount.component';
import {
  AuthGuardService as AuthGuard
} from './auth/auth-guard.service';
import {
  RoleGuardService as RoleGuard
} from './auth/role-guard.service';
import { TemplateComponent } from './admin/template/template.component';
import { ProductViewComponent } from './user/product-view/product-view.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
const routes: Routes = [
  {
    path: 'home', component : HomepageComponent
  },
  {
    path: 'admin', component : TemplateComponent
  },
  {
    path: 'products/:id', component : ProductsComponent,

  },
  {
    path: 'product/:id', 
    component: ProductViewComponent, 
  },
  {
    path: 'contact', component : ContactComponent
  },
  {
    path: 'credentials', component : AccountComponent
  },
  {
    path: 'account', component : MyaccountComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'normal_user'
    }
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
