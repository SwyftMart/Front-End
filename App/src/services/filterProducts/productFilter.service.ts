import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PRODUCT_MODEL } from 'src/abstract_classes/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  // THE @Injectable DECORATOR INDICATES THAT THIS CLASS IS INJECTABLE AS A SERVICE

  // THE BehaviorSubject AND SUBJECT ARE IMPORTED FROM THE RXJS LIBRARY. THESE ARE USED FOR CREATING OBSERVABLE STREAMS THAT CAN EMIT VALUES TO SUBSCRIBERS

  // PRODUCT_MODEL IS IMPORTED FROM THE 'src/abstract_classes/product.model' FILE. IT REPRESENTS THE TYPE OR INTERFACE USED FOR THE PRODUCTS IN THE APPLICATION

  // THE filteredProductsSubject IS A PRIVATE INSTANCE VARIABLE OF TYPE BehaviorSubject THAT HOLDS THE CURRENT FILTERED PRODUCTS. IT IS INITIALIZED WITH AN EMPTY ARRAY []

  // filteredProducts$ IS A PUBLIC OBSERVABLE PROPERTY THAT EXPOSES THE filteredProductsSubject AS AN OBSERVABLE STREAM. OTHER COMPONENTS OR SERVICES CAN SUBSCRIBE TO THIS PROPERTY TO RECEIVE UPDATES WHEN THE FILTERED PRODUCTS CHANGE.

  // THE updateFilteredProducts METHOD TAKES AN ARRAY OF PRODUCT_MODEL AS AN ARGUMENT AND UPDATES THE filteredProductsSubject BY CALLING next() ON IT WITH THE NEW ARRAY. THIS METHOD IS USED TO UPDATE THE FILTERED PRODUCTS AND EMIT THE UPDATED VALUES TO SUBSCRIBERS OF filteredProducts$
  private filteredProductsSubject = new BehaviorSubject<PRODUCT_MODEL[]>([]);
  filteredProducts$ = this.filteredProductsSubject.asObservable();

  updateFilteredProducts(filteredProducts: PRODUCT_MODEL[]) {
    this.filteredProductsSubject.next(filteredProducts);
  }
}
