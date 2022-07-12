import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { MatchValidator } from 'src/app/shared/utils/match-validator';
import { passwordValidator } from 'src/app/shared/utils/password-validator';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
@AutoUnsubscribe
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      passwordValidator()
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      passwordValidator()
    ]),
  }, [MatchValidator('password', 'passwordConfirmation')]);

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  checkValid(fieldName: string) {
    return checkFieldValid(this.resetPasswordForm.get(fieldName));
  }

  getErrorMessage(fieldName: string) {
    return formErrorMessage(this.resetPasswordForm.get(fieldName));
  }

  passwordMatchError() {
    return (
      this.resetPasswordForm.getError('mismatch') &&
      this.resetPasswordForm.get('passwordConfirmation')?.touched
    );
  }

  onSubmit() {

  }
}
