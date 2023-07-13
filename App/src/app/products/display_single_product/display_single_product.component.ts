import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconDefinition, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-single-product',
    templateUrl: 'display_single_product.component.html',
    styleUrls: ['display_single_product.component.css'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule]
})
export class DisplaySingleProductComponent {
    // FONT AWESOME ICONS
    cartIcon: IconDefinition = faCartShopping;
    @Input() product: any;
    
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    closeProduct(): void {
      this.close.emit();
      console.log("close button clicked")
    }
}