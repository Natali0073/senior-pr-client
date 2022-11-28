import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { iif, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { HttpErrorResponse } from '@angular/common/http';
import { customErrorHandling } from 'src/app/shared/utils/customErrorHandling';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UnsubscriberService]
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required,
      Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  loading = false;
  isProd = environment.production;

  @ViewChild('googleElement') googleElement: ElementRef<HTMLElement>;

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

  ngAfterViewInit() {
    this.googleElement.nativeElement.setAttribute('data-login_uri', `${environment.clientUrl}/api/auth/login-google`);
    this.googleElement.nativeElement.setAttribute('data-client_id', environment.googleAppId);
  }

  googleRenderButton() {
    // @ts-ignore
    window.google?.accounts.id.renderButton(
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
    const formValues = this.loginForm.getRawValue();

    this.loading = true;
    this.authService.login(formValues)
      .pipe(
        this.unsubscriber.takeUntilDestroy,
        catchError((error) => {
          this.errorHandling(error);
          return throwError(() => error);
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
      ))
      .subscribe(() => {
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
