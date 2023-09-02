import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplaySingleProductComponent } from './products/display_single_product/display_single_product.component';
import { SuccessComponent } from './success/success.component';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product',
    component: DisplaySingleProductComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
