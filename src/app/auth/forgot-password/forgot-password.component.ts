import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
@AutoUnsubscribe
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  checkValid() {
    return checkFieldValid(this.email);
  }

  getErrorMessage() {
    return formErrorMessage(this.email);
  }

  resetEmail() {
    this.authService.resetPasswordRequest(this.email.value)
      .subscribe(() => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: 'Recovery letter is sent! Please check your mail box.',
          panelClass: 'snack-bar-success'
        });
        this.email.reset();
      })
  }
}
