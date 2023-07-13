import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// IMPORT FONTAWESOME ICONS
import {
  faHome,
  faPlusCircle,
  faCartShopping,
  faArrowCircleUp,
  faLock,
  faClose,
  faFaceAngry,
  faExclamationTriangle,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/services/forms/shared.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { UserService } from 'src/services/users/users.service';
import { PageReloaderService } from 'src/services/pageReloader/pageReloader.service';
import { MessageBoxService } from 'src/services/message-box/message-box.service';

@Component({
  selector: 'reset-password',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  resetForm!: FormGroup;
  // SET isActive STATE TO false
  isActive: boolean = false;

  // FONT AWESOME ICONS
  homeIcon: IconDefinition = faHome;
  plusIcon: IconDefinition = faPlusCircle;
  cartIcon: IconDefinition = faCartShopping;
  upIcon: IconDefinition = faArrowCircleUp;
  lockIcon: IconDefinition = faLock;
  closeIcon: IconDefinition = faClose;
  warningIcon: IconDefinition = faExclamationTriangle;
  angryEmoji: IconDefinition = faFaceAngry;

  // DEFAULT FORM INPUT VALUES
  defaultParams = {
    email: 'Email address...',
    password: 'Enter new password'
  };

  // INJECT SHARED SERVICE
  constructor(private sharedService: SharedService, private formBuilder: FormBuilder, private userService: UserService, private pageReloaderService: PageReloaderService, private messageBoxService: MessageBoxService) { }

  ngOnInit(): void {
    // CREATE FORM
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, this.userService.EMAIL_PATTERN_VALIDATOR()]],
      userPassword: ['', [Validators.required, this.userService.PASSWORD_PATTERN_VALIDATOR()]]
    });

    this.sharedService.resetPasswordForm$.subscribe(active => {
      this.isActive = active;
    });
  }

  setResetPasswordActive(): void {
    this.sharedService.openResetPasswordForm();
  }

  closeResetPasswordForm() {
    this.sharedService.closeResetForm();
  }

  // RESET PASSWORD
  resetPassword() {
    if (this.resetForm.valid) {
      this.userService.resetUserPassword(this.resetForm).subscribe((response) => {
        // RESET FORM ON FORM SUBMIT & RELOAD ROUTE
        this.resetForm.reset();

        // DISPLAY SUCCESS MESSAGE
        // this.messageBoxService.showSuccessMessage('Password reset successful!');

        // RELOAD PAGE AFTER 2s
        setTimeout(() => {
          this.pageReloaderService.refreshRoute();  
        }, 2000);
        
        // LOG TO CONSOLE FOR DEBUGGING
        console.log(response);
      });
      // HANDLE CASES WHERE FORM IS NOT VALID
    } else {
      this.messageBoxService.showErrorMessage('Please try again...');
    }
  }
}
