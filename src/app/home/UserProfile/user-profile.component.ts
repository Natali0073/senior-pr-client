import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatchValidator } from 'src/app/shared/utils/match-validator';
import { passwordValidator } from 'src/app/shared/utils/password-validator';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  userProfile = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    avatar: new FormControl('', []),
  });

  changePassword = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      passwordValidator()
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      passwordValidator()
    ]),
  }, [MatchValidator('password', 'passwordConfirmation')]);

  activeTabIndex = 0;
  selectedFileNames: string[] = [];
  selectedFiles?: FileList;
  message: string[] = [];
  preview: string = '';

  constructor() {
  }

  onTabChange(event: MatTabChangeEvent) {
    this.activeTabIndex = event.index;
  }

  selectFiles(event: any) {
    console.log(event.target?.files);
    this.message = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFiles[0]);
      this.selectedFileNames.push(this.selectedFiles[0].name);
    }
  }

  checkValid(form: FormGroup, fieldName: string) {
    return checkFieldValid(form.get(fieldName));
  }

  getErrorMessage(form: FormGroup, fieldName: string) {
    return formErrorMessage(form.get(fieldName));
  }

  passwordMatchError() {
    return (
      this.changePassword.getError('mismatch') &&
      this.changePassword.get('passwordConfirmation')?.touched
    );
  }

  uploadFiles(): void {

  }

  submitUserData() {
    const formValues = { ...this.userProfile.value };
    console.log(formValues);

  }

  submitPassword() {
    const formValues = { ...this.changePassword.value };
  }

}