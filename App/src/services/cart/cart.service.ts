import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CART_ITEM_MODEL } from "src/abstract_classes/product.model";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http: HttpClient) { }

    cartItems: CART_ITEM_MODEL[] = [];

    addToCart(item: any) {
        // HANDLE QUANTITY HERE
        item.quantity = 1;
        this.cartItems.push(item);
    }

    // DELETE ITEM FROM CART
    deleteItem(item: CART_ITEM_MODEL) {
        // FIND INDEX OF item IN cartItems ARRAY
       const index = this.cartItems.indexOf(item);
       // IF item IS FOUND (index is not -1),  REMOVE item FROM ARRAY
       if (index !== -1) {
        this.cartItems.splice(index, 1);
       }
    }

    // GET ALL ITEMS IN CART
    getCartItems() {
        return this.cartItems;
    }

    // CHECK IF cartItems CONTAINS ITEMS
    hasItems() {
        return this.cartItems.length > 0;
    }

    // CALCULATE TOTAL PRICE 
    calculateTotal(): number {
        let TOTAL: number = 0;
        // LOOP THROUGH cartItems ARRAY
        for (const item of this.cartItems) {
            // ADD item.price TO TOTAL
            TOTAL += item.price * item.quantity;
        }
        return TOTAL;
    }

    // ADD ORDER
    addOrder(orderData: any) {
        return this.http.post('http://localhost:4000/orders', orderData);
    }
}