// THIS FILE CONTAINS THE CORE
// CONFIGURATION FOR THE APP
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// MAIN APP COMPONENTS
import { AppComponent } from './app.component';
import { DisplayProductsComponent } from './products/display_products/display_products.component';
import { SignInComponent } from './authentication/signin/signin.component';
import { SignUpComponent } from './authentication/signup/signup.component';
import { ResetpasswordComponent } from "./authentication/resetpassword/resetpassword.component";
import { DisplaySingleProductComponent } from './products/display_single_product/display_single_product.component';
import { CategoriesComponent } from './categories/categories.component';

// ADDITIONAL MODULES
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './products/add_product/add_product.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { CartComponent } from './cart/cart.component';

// THE NgModule DECORATOR INDICATES THAT
//THIS FILE IS A MODULE
// THIS DECORATOR CONTAINS METADATA WHICH
// DENOTES ALL RELEVANT AND NECESSARY 
// DEPENDENCIES
@NgModule({
    // MARK OUT WHICH COMPONENTS AND 
    // DIRECTIVES CAN BE USED WITHIN THE
    // APP
    declarations: [
        AppComponent
    ],
    providers: [NgModel],
    // THE ENTRY POINT COMPONENT FOR
    // STARTING THE APP
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        MessageBoxComponent,
        AddProductComponent,
        DisplayProductsComponent,
        DisplaySingleProductComponent,
        CategoriesComponent,
        CartComponent,
        PaymentComponent,
        SuccessComponent,
        SignInComponent,
        SignUpComponent,
        HttpClientModule,
        ReactiveFormsModule,
        ResetpasswordComponent,
        FormsModule
    ]
})
export class AppModule { }
