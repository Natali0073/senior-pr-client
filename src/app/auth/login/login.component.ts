import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@AutoUnsubscribe
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  showLoginFailure = false;

  constructor(public authService: AuthService, public router: Router, private _snackBar: MatSnackBar) {
  }

  checkValid(fieldName: string) {
    return checkFieldValid(this.loginForm.get(fieldName));
  }

  getErrorMessage(fieldName: string) {
    return formErrorMessage(this.loginForm.get(fieldName));
  }

  onSubmit() {
    const formValues = { ...this.loginForm.value };
    this.authService.login(formValues)
      .pipe(
        catchError((error) => {
          if (error.status === 401) this.showLoginFailure = true;
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      })
  }

  logout() {
    this.authService.logout();
  }
}