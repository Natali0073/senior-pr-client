import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
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
          else this._snackBar.openFromComponent(SnackBarComponent, {
            data: error.error.message,
            panelClass: 'snack-bar-error'
          });
          console.log(error);
          return EMPTY;
        })
      )
      .subscribe((result) => {
        result.accessToken && window.localStorage.setItem('token', result.accessToken);
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      })

  }


  logout() {
    this.authService.logout();
  }
}