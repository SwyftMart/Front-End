// THIS IS THE ROOT COMPONENT OF THE APP
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// ICONS
import { faTrashCan, faPlus, faCartShopping, faHeart, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { PRODUCT_MODEL } from '../../../abstract_classes/product.model';
import { ProductService } from '../../../services/products/products.service';
import { CategoriesComponent } from '../../categories/categories.component';
import { ProductFilterService } from '../../../services/filterProducts/productFilter.service';
import { UserService } from '../../../services/users/users.service';
import { DisplaySingleProductComponent } from "../display_single_product/display_single_product.component";
import { CartService } from '../../../services/cart/cart.service';
import { MessageBoxService } from '../../../services/message-box/message-box.service';
// THE @Component DECORATOR INDICATES THAT THIS
// FILE IS A COMPONENT
@Component({
  selector: 'product',
  templateUrl: 'display_products.component.html',
  styleUrls: ['display_products.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CategoriesComponent, DisplaySingleProductComponent]
})
export class DisplayProductsComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private productService: ProductService, private productFilterService: ProductFilterService, private userService: UserService, private cartService: CartService, private messageBoxService: MessageBoxService) { }

  // FONT AWESOME ICONS
  plusIcon = faPlus;
  deleteIcon = faTrashCan;
  cartIcon = faCartShopping;
  heartIcon = faHeart;
  ellipsisIcon = faEllipsis;

  ngOnInit() {
    this.productService.fetchProducts();
    this.productService.getStoredProducts().subscribe((products: PRODUCT_MODEL[]) => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.productFilterService.filteredProducts$.subscribe(filteredProducts => {
      this.filteredProducts = filteredProducts;
    });
  }

  // CHECK IF USER IS AUTHENTICATED BEFORE
  // ALLOW THE FOLLOWING METHODS TO EXECUTE
  Authenticated() {
    return this.userService.isAuthenticated();
  }

  ///////////////////////////////////////
  //// METHOD TO ADD PRODUCT TO CART ////
  ///////////////////////////////////////
  addProductToCart(product: any) {
    this.cartService.addToCart(product);
    this.messageBoxService.showSuccessMessage('Product added to cart!');
  }

  /////////////////////////////////////
  //// METHOD TO DELETE A PRODUCT /////
  /////////////////////////////////////
  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe((response) => {
      this.messageBoxService.showSuccessMessage('Product deleted!');
      console.log(response);
    },
      error => {
        console.error('ERROR:', error);
      });
  }

  ////////////////////////////////////////////
  //// METHOD TO ADD PRODUCT TO FAVORITES ////
  ////////////////////////////////////////////
  addToFavorites() {
    this.messageBoxService.showSuccessMessage('Product added to favorites!');
  }

  selectedProduct: any; // Initialize as null or empty object

  showProductDetails(product: any) {
    this.selectedProduct = product;
  }

  closeProduct(): void {
    this.selectedProduct = null;
  }

}
