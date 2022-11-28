import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { MatchValidator } from 'src/app/shared/utils/match-validator';
import { passwordValidator } from 'src/app/shared/utils/password-validator';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';
import { AuthService, ResetPasswordDto } from '../auth.service';
import { finalize } from 'rxjs/operators';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [UnsubscriberService]
})
export class ResetPasswordComponent implements OnInit {
  userToken: string = '';
  private fb = new FormBuilder();
  changePasswordForm = new FormGroup({
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required,
      passwordValidator()]
    }),
    passwordConfirmation: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required,
      passwordValidator()]
    }),
  }, [MatchValidator('password', 'passwordConfirmation')]);

  loading = false;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe(params => {
        this.userToken = params.get('token') || '';
      });
  }

  checkValid(fieldName: string) {
    return checkFieldValid(this.changePasswordForm.get(fieldName));
  }

  getErrorMessage(fieldName: string) {
    return formErrorMessage(this.changePasswordForm.get(fieldName));
  }

  passwordMatchError() {
    return (
      this.changePasswordForm.getError('mismatch') &&
      this.changePasswordForm.get('passwordConfirmation')?.touched
    );
  }

  onSubmit() {
    const formValues = this.changePasswordForm.getRawValue();
    const dto: ResetPasswordDto = {
      token: this.userToken,
      password: formValues.password
    }
    this.loading = true;
    this.authService.resetPassword(dto)
      .pipe(
        this.unsubscriber.takeUntilDestroy,
        catchError((error) => {
          if (error.status === 401) {
            this._snackBar.openFromComponent(SnackBarComponent, {
              data: 'Sorry, you request expired or invalid!',
              panelClass: 'snack-bar-error'
            });
          }
          return throwError(() => error);
        }),
        finalize(() => this.loading = false),
      )
      .subscribe(() => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: 'Password changed successfully!',
        });
        this.router.navigate(['/login']);
      });
  }
}
