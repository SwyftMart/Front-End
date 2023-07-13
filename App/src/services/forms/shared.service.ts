/////////////////////////
//////// IMPORTS ////////
/////////////////////////
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// THE @Injectable DECORATOR INDICATES 
// THAT THE EXPORTED CLASS IS A SERVICE
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // DEFINE PROPERTIES TO HOLD THE ACTIVE STATE
  private addProductFormSubject = new Subject<boolean>();
  addProductForm$ = this.addProductFormSubject.asObservable();

  private signInFormSubject = new Subject<boolean>();
  signInForm$ = this.signInFormSubject.asObservable();

  private signUpFormSubject = new Subject<boolean>();
  signUpForm$ = this.signUpFormSubject.asObservable();

  private categoriesFormSubject = new Subject<boolean>();
  categoriesForm$ = this.categoriesFormSubject.asObservable();

  private cartSubject = new Subject<boolean>();
  cart$ = this.cartSubject.asObservable();

  private resetPasswordFormSubject = new Subject<boolean>();
  resetPasswordForm$ = this.resetPasswordFormSubject.asObservable();

  //////////////////////////////
  /// METHODS TO OPEN FORMS ////
  //////////////////////////////
  openSignInForm(): void {
    this.signInFormSubject.next(true);
    this.signUpFormSubject.next(false);
    this.resetPasswordFormSubject.next(false);
    this.categoriesFormSubject.next(false);
    this.addProductFormSubject.next(false);
    this.cartSubject.next(false);
  }

  openSignUpForm(): void {
    this.signInFormSubject.next(false);
    this.signUpFormSubject.next(true);
    this.resetPasswordFormSubject.next(false);
    this.categoriesFormSubject.next(false);
    this.addProductFormSubject.next(false);
    this.cartSubject.next(false);
  }

  openCategoriesForm(): void {
    this.signInFormSubject.next(false);
    this.signUpFormSubject.next(false);
    this.categoriesFormSubject.next(true);
    this.addProductFormSubject.next(false);
    this.cartSubject.next(false);
  }

  openResetPasswordForm(): void {
    this.resetPasswordFormSubject.next(true);
    this.signInFormSubject.next(false);
    this.signUpFormSubject.next(false);
    this.categoriesFormSubject.next(false);
    this.addProductFormSubject.next(false);
    this.cartSubject.next(false);
  }

  openAddProductForm(): void {
    this.resetPasswordFormSubject.next(false);
    this.signInFormSubject.next(false);
    this.signUpFormSubject.next(false);
    this.categoriesFormSubject.next(false);
    this.addProductFormSubject.next(true);
    this.cartSubject.next(false);
  }

  openCart(): void {
    this.resetPasswordFormSubject.next(false);
    this.signInFormSubject.next(false);
    this.signUpFormSubject.next(false);
    this.categoriesFormSubject.next(false);
    this.addProductFormSubject.next(false);
    this.cartSubject.next(true);
  }

  //////////////////////////////
  /// METHODS TO CLOSE FORMS ///
  //////////////////////////////
  closeSignInForm(): void {
    this.signInFormSubject.next(false);
    this.signUpFormSubject.next(false);
  }

  closeSignUpForm(): void {
    this.signUpFormSubject.next(false);
  }

  closeResetForm(): void {
    this.resetPasswordFormSubject.next(false);
  }

  closeCategoriesForm(): void {
    this.categoriesFormSubject.next(false);
  }

  closeAddProductForm(): void {
    this.addProductFormSubject.next(false);
  }

  closeCart(): void {
    this.cartSubject.next(false);
  }
}
