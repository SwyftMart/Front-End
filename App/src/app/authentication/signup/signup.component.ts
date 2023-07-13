// THIS IS THE ROOT COMPONENT OF THE APP
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// IMPORT FONTAWESOME ICONS
import { faHome, faPlusCircle, faCartShopping, faArrowCircleUp, faLock, faClose, faExclamationTriangle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

// IMPORT ANGULAR FORMS
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

// This service handles the displaying of pop up forms
import { SharedService } from '../../../services/forms/shared.service';
import { USER_MODEL } from '../../../../src/abstract_classes/user.model';
import { UserService } from '../../../../src/services/users/users.service';
import { MessageBoxService } from '../../../services/message-box/message-box.service';

// THE @Component DECORATOR INDICATES THAT THIS
// FILE IS A COMPONENT
@Component({
  selector: 'signup', // CUSTOM HTML SELECTOR
  templateUrl: 'signup.component.html', // LINK TO HTML
  styleUrls: ['signup.component.css'], // LINK TO CSS
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule]
})
export class SignUpComponent {
  // SET isActive STATE TO false
  isActive: boolean = false;

  signUpForm!: FormGroup;

  // FONT AWESOME ICONS
  homeIcon: IconDefinition = faHome;
  plusIcon: IconDefinition = faPlusCircle;
  cartIcon: IconDefinition = faCartShopping;
  upIcon: IconDefinition = faArrowCircleUp;
  lockIcon: IconDefinition = faLock;
  closeIcon: IconDefinition = faClose;
  warningIcon: IconDefinition = faExclamationTriangle;

  // DEFAULT FORM INPUT VALUES
  defaultParams = {
    email: 'Email address...',
    userPassword: 'Password...',
    firstName: 'First name...',
    lastName: 'Last name...',
    streetAddress: 'Street address',
    city: 'City',
    country: 'Country',
    phone: 'Phone number...'
  };

  // INJECT SHARED SERVICE & FORM CLASSES
  constructor(private sharedService: SharedService, private userService: UserService, private formBuilder: FormBuilder, private messageBoxService: MessageBoxService) { }

  ngOnInit() {
    // CREATE FORM
    this.signUpForm = this.formBuilder.group({
      email: ["", [Validators.required, this.userService.EMAIL_PATTERN_VALIDATOR()]],
      userPassword: ["", [Validators.required, this.userService.PASSWORD_PATTERN_VALIDATOR()]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      streetAddress: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      phone: ["", Validators.required]
    });

    this.sharedService.signUpForm$.subscribe(active => {
      this.isActive = active;
    });
  }

  // METHOD FOR CLOSING SignUpForm
  closeSignUpForm() {
    this.sharedService.closeSignUpForm();
  }

  // METHOD FOR SIGNING UP USERS
  signUp() {
    if (this.signUpForm.valid) {
      const newUser: USER_MODEL = this.signUpForm.value;

      this.userService.createUser(newUser).subscribe((response: any) => {
        console.log(response);
      },
        (error: any) => {
          console.error(error);
        });
    }
  }
}
