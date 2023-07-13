// THIS IS THE ROOT COMPONENT OF THE APP
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// IMPORT FONTAWESOME ICONS
import { faHome, faPlusCircle, faCartShopping, faArrowCircleUp, faLock, faClose, IconDefinition, faFaceFrown, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// This service handles the displaying of pop up forms
import { SharedService } from '../../../services/forms/shared.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/services/users/users.service';
import { LOGIN_MODEL } from 'src/abstract_classes/login.model';
import { RESPONSE_MODEL } from 'src/abstract_classes/response.model';
import { Component, OnInit } from '@angular/core';
import { PageReloaderService } from 'src/services/pageReloader/pageReloader.service';
import { MessageBoxService } from 'src/services/message-box/message-box.service';

// THE @Component DECORATOR INDICATES THAT THIS
// FILE IS A COMPONENT
@Component({
  selector: 'signin', // CUSTOM HTML SELECTOR
  templateUrl: './signin.component.html', // LINK TO HTML
  styleUrls: ['./signin.component.css'], // LINK TO CSS
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule]
})
export class SignInComponent implements OnInit {
  // SET isActive STATE TO false
  isActive: boolean = false;

  // INITIALIZE SIGN in FORM
  signInForm!: FormGroup;

  // FONT AWESOME ICONS
  homeIcon: IconDefinition = faHome;
  plusIcon: IconDefinition = faPlusCircle;
  cartIcon: IconDefinition = faCartShopping;
  upIcon: IconDefinition = faArrowCircleUp;
  lockIcon: IconDefinition = faLock;
  closeIcon: IconDefinition = faClose;
  warningIcon: IconDefinition = faExclamationTriangle;
  frownEmoji: IconDefinition = faFaceFrown;

  // DEFAULT FORM INPUT VALUES
  defaultParams = {
    email: 'Email address...',
    password: 'Password...',
  };

  // INJECT SERVICES & MODULAR SERVICES
  constructor(private sharedService: SharedService, private formBuilder: FormBuilder, private userService: UserService, private pageReloaderService: PageReloaderService, private messageBoxService: MessageBoxService) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ["", [Validators.required, this.userService.EMAIL_PATTERN_VALIDATOR()]],
      userPassword: ["", [Validators.required]]
    })

    this.sharedService.signInForm$.subscribe(active => {
      this.isActive = active;
    });
  }

  // PROPERTY TO HOLD ACTIVE STATE
  setResetPasswordActive(): void {
    this.sharedService.openResetPasswordForm();
  }

  closeSignInForm() {
    this.sharedService.closeSignInForm();
  }

  ///////////////////////////////////
  /// METHOD FOR SIGNING IN USERS ///
  ///////////////////////////////////
  signIn() {
    if (this.signInForm.valid) {
      const user: LOGIN_MODEL = this.signInForm.value;
      // EXECUTE SERVICE
      this.userService.loginUser(user).subscribe((signInResponse: RESPONSE_MODEL) => {

        // RETRIEVE RESPONSE FROM REQUEST
        const response = signInResponse.response;
        // RETRIEVE TOKEN FROM REQUEST
        const token = signInResponse.token;

        // SAVE TOKEN TO LOCAL STORAGE
        localStorage.setItem('token', token);

        // RELOAD PAGE ON SIGN IN AFTER 2s
        setTimeout(() => {
          this.pageReloaderService.refreshRoute();
        }, 2000);
      });
    }
  }
}
