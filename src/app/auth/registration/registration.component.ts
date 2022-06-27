import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchValidator } from 'src/app/shared/match-validator';
import { passwordValidator } from 'src/app/shared/password-validator';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      passwordValidator()
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      passwordValidator()
    ]),
    termsPolicyAgree: new FormControl('', [
      Validators.required
    ]),
  }, [MatchValidator('password', 'passwordConfirmation')]);

  constructor(public authService: AuthService, public router: Router) {
  }

  checkValid(fieldName: string) {
    return checkFieldValid(this.registrationForm.get(fieldName));
  }

  getErrorMessage(fieldName: string) {
    return formErrorMessage(this.registrationForm.get(fieldName));
  }

  passwordMatchError() {
    return (
      this.registrationForm.getError('mismatch') &&
      this.registrationForm.get('passwordConfirmation')?.touched
    );
  }

  onSubmit() {
    console.log(1111);

    console.log(this.registrationForm);

  }

  login() {

    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/admin';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
