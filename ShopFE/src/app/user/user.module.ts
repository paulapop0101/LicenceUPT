import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductsComponent } from './products/products.component';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from '../angular-material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MatSliderModule} from '@angular/material/slider';
import { ProductViewComponent } from './product-view/product-view.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import { AddressesComponent } from './myaccount/addresses/addresses.component';
import { OrderhistoryComponent } from './myaccount/orderhistory/orderhistory.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatRadioModule} from '@angular/material/radio';
import { SeeOrderComponent } from './dialogs/see-order/see-order.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    ProductsComponent,
    AccountComponent,
    ContactComponent,
    CartComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    MyaccountComponent,
    ProductViewComponent,
    AddressesComponent,
    OrderhistoryComponent,
    CheckoutComponent,
    SeeOrderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatStepperModule,
    MatTabsModule,
    MatRadioModule

  ]
})
export class UserModule { }
