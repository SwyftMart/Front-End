import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.css'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, RouterModule, RouterOutlet]
})
export class PaymentComponent {
    
}