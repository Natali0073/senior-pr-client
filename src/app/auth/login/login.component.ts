import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UnsubscriberService]
})
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

  loading = false;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    public authService: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  checkValid(fieldName: string) {
    return checkFieldValid(this.loginForm.get(fieldName));
  }

  getErrorMessage(fieldName: string) {
    return formErrorMessage(this.loginForm.get(fieldName));
  }

  onSubmit() {
    const formValues = { ...this.loginForm.value };
    this.loading = true;
    this.authService.login(formValues)
      .pipe(
        this.unsubscriber.takeUntilDestroy,
        catchError((error) => {
          if (error.status === 401 || error.status === 404) {
            this._snackBar.openFromComponent(SnackBarComponent, {
              data: 'Credentials are invalid! Please check email and password',
              panelClass: 'snack-bar-error'
            });
          }
          return EMPTY;
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      })
  }

  logout() {
    this.authService.logout();
  }
}