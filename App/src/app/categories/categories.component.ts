import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// IMPORT FONTAWESOME ICONS
import { faClose, faPhone, faLaptop, faGamepad, faDesktop, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/services/forms/shared.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesService } from 'src/services/categories/categories.service';
import { FormsModule } from '@angular/forms';
import { PRODUCT_MODEL } from 'src/abstract_classes/product.model';
import { ProductFilterService } from 'src/services/filterProducts/productFilter.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  // FONT AWESOME ICONS
  closeIcon: IconDefinition = faClose;
  phoneIcon: IconDefinition = faPhone;
  laptopIcon: IconDefinition = faLaptop;
  gamePadIcon: IconDefinition = faGamepad;
  desktopIcon: IconDefinition = faDesktop;

  selectedCategories: { [key: string]: boolean } = {
    all: false,
    Phones: false,
    Laptops: false,
    Gaming: false,
    Desktops: false
  };

  // INITIALIZE FILTERED PRODUCTS ARRAY
  filteredProducts: PRODUCT_MODEL[] = [];

  // INJECT SERVICES
  constructor(private sharedService: SharedService, private categoriesService: CategoriesService, private productFilterService: ProductFilterService) { }


  filterProducts() {
    const selectedCategories = Object.keys(this.selectedCategories)
      .filter(category => this.selectedCategories[category]);

    console.log('Selected Categories', selectedCategories);

    this.categoriesService.getFilteredProducts(selectedCategories)
      .subscribe(response => {
        console.log('Response', response);

        if (response && response.products) {
          this.filteredProducts = response.products.filter((product: PRODUCT_MODEL) => {
            return selectedCategories.includes(product.category);
          });
          this.productFilterService.updateFilteredProducts(this.filteredProducts);
          console.log('Filtered Products', this.filteredProducts)
        } else {
          // this.filteredProducts = [];
          this.productFilterService.updateFilteredProducts([]);
          console.log('No products found')
        }

      });
  }


  // SET isActive STATE TO false
  isActive: boolean = false;


  ngOnInit(): void {
    this.sharedService.categoriesForm$.subscribe(active => {
      this.isActive = active;
    });
  }

  ngAfterViewInit() {

  }

  closeCategoriesForm() {
    this.sharedService.closeCategoriesForm();
  }

  showCategories() {

  }
}
