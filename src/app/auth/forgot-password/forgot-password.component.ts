import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'src/app/shared/utils/AutoUnsubscribe';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';

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

  constructor() { }

  ngOnInit(): void {
  }

  checkValid() {
    return checkFieldValid(this.email);
  }

  getErrorMessage() {
    return formErrorMessage(this.email);
  }
}
