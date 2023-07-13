import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// IMPORT FONTAWESOME ICONS
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowCircleUp, faClose, IconDefinition, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// IMPORT ANGULAR FORMS
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// SERVICES
import { SharedService } from '../../../../src/services/forms/shared.service';
import { ProductService } from '../../../../src/services/products/products.service';
import { UserService } from '../../../../src/services/users/users.service';
import { PageReloaderService } from '../../../../src/services/pageReloader/pageReloader.service';

// MODELS
import { PRODUCT_MODEL } from '../../../../src/abstract_classes/product.model';
import { RESPONSE_MODEL } from '../../../../src/abstract_classes/response.model';

@Component({
    selector: 'add-product',
    templateUrl: 'add_product.component.html',
    styleUrls: ['add_product.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule]
})
export class AddProductComponent {
    // FONT AWESOME ICONS
    upIcon: IconDefinition = faArrowCircleUp;
    closeIcon: IconDefinition = faClose;
    warningIcon: IconDefinition = faExclamationTriangle;

    // DEFAULT FORM INPUT VALUES
    defaultParams = {
        productName: 'Enter product name...',
        productImage: 'Enter image URL...',
        productPrice: 1000,
        productCategory: 'Enter category...',
        productDescription: 'Enter description...',
    };

    // INJECT SERVICES & FORM CLASSES
    constructor(private sharedService: SharedService, private productService: ProductService, private formBuilder: FormBuilder, private pageReloaderService: PageReloaderService) { }

    // LOGIN STATUS
    isSignedIn: boolean = false;

    // SET isActive STATE TO false
    isActive: boolean = false;

    // INITIALIZE PRODUCT FORM
    productForm!: FormGroup;

    ngOnInit() {
        // CHECK THE STATE OF LOCAL STORAGE
        this.isSignedIn = (localStorage.getItem('token') !== null);
        // CREATE REACTIVE FORM
        this.productForm = this.formBuilder.group({
            productName: ["", Validators.required],
            productImage: ["", Validators.required],
            productDescription: ["", Validators.required],
            category: ["", Validators.required],
            price: ["", Validators.required],
        });

        this.sharedService.addProductForm$.subscribe(active => {
            this.isActive = active;
        })
    }

    ///////////////////////////////
    // METHOD FOR ADDING PRODUCT //
    ///////////////////////////////
    addProduct() {
        if (this.productForm.valid) {
            const newProduct: PRODUCT_MODEL = this.productForm.value;
            // GET TOKEN FROM LOCAL STORAGE
            const token = localStorage.getItem('token') as string;

            this.productService.createProduct(newProduct, token).subscribe((response: RESPONSE_MODEL) => {
                console.log(response);

                // RELOAD ROUTE AFTER 1.5s
                setTimeout(() => {
                    this.pageReloaderService.refreshRoute();
                }, 1500);
            },
                (error: any) => {
                    console.error(error);
                });
        }
    }

    // CLOSE ADD PRODUCT FORM
    closeAddProductForm() {
        this.sharedService.closeAddProductForm();
    }
}