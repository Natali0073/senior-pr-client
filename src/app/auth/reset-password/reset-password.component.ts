import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  userToken: string = '';
  changePasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      passwordValidator()
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      passwordValidator()
    ]),
  }, [MatchValidator('password', 'passwordConfirmation')]);

  constructor(private authService: AuthService, private _snackBar: MatSnackBar,
    private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
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
    const formValues = { ...this.changePasswordForm.value };

    const dto = {
      token: this.userToken,
      password: formValues.password
    }

    this.authService.resetPassword(dto)
      .subscribe(() => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: 'Password changed successfully!',
        });
        this.router.navigate(['/login']);
      });
  }
}
