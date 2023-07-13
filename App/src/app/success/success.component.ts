import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'success',
    templateUrl: 'success.component.html',
    styleUrls: ['success.component.css'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, RouterModule, RouterOutlet]
})
export class SuccessComponent {
    
}