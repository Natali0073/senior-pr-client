import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { EMPTY, iif, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { HttpErrorResponse } from '@angular/common/http';
import { customErrorHandling } from 'src/app/shared/utils/customErrorHandling';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UnsubscriberService]
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new UntypedFormControl('', [
      Validators.required
    ]),
  });

  loading = false;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    public authService: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private zone: NgZone
  ) {
    setTimeout(() => {
      this.googleRenderButton();
    }, 100);
  }

  ngOnInit() {
  }

  googleRenderButton() {
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-signin"),
      {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: 200,
      }
    );
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
          this.errorHandling(error);
          return EMPTY;
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      })
  }

  fbLogin() {
    this.authService.fbLogin();

    // call server method and redirect to roo route
    this.authService.fbLoginSubject.pipe(
      map(response => response),
      mergeMap(response => iif(() =>
        !!response.authResponse && !!response.authResponse.accessToken,
        this.fbLoginHandler(response.authResponse && response.authResponse.accessToken || null),
        throwError(() => 'Fb login failed'))
      ),
      catchError((error) => {
        return EMPTY;
      }))
      .subscribe((response) => {
        this.zone.run(() => {
          this.router.navigate(['/']);
          this.authService.fbLogout();
        });
      })
  }

  fbLoginHandler(accessToken: string | null) {
    return accessToken ?
      this.authService.fbLoginHandler(accessToken).pipe(map(response => response)) :
      throwError(() => 'Fb login failed');
  }

  errorHandling(error: HttpErrorResponse) {
    let message = customErrorHandling(error);
    switch (true) {
      case error.status === 401 || error.status === 404:
        message = 'Credentials are invalid! Please check email and password';
        break;

      default:
        break;
    }

    if (message) {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: message,
        panelClass: 'snack-bar-error'
      });
    }
  }
}
