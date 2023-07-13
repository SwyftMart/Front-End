import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageBoxService { 
    // CREATE NEW SUBJECT INSTANCE
    private successMessageSubject = new Subject<string>();
    private errorMessageSubject = new Subject<string>();

    // CREATE NEW Observable WITH successMessageSubject &
    // errorMessageSubject AS THE SOURCE
    successMessage$ = this.successMessageSubject.asObservable();
    errorMessage$ = this.errorMessageSubject.asObservable();

    showSuccessMessage(message: string): void {
        this.successMessageSubject.next(message);        
    }

    showErrorMessage(message: string): void {
        this.errorMessageSubject.next(message);
    }
}  