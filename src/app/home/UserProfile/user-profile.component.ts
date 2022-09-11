import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { MatchValidator } from 'src/app/shared/utils/match-validator';
import { passwordValidator } from 'src/app/shared/utils/password-validator';
import { checkFieldValid, formErrorMessage, validateImageSize } from 'src/app/shared/utils/utils';

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
  preview: string = '../../../assets/avatar.png';
  validImage: boolean = true;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserProfileComponent>) {
  }

  onTabChange(event: MatTabChangeEvent) {
    this.activeTabIndex = event.index;
  }

  selectFiles(event: any) {
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
      this.validImage = validateImageSize(this.selectedFiles[0].size);
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

  submitUserData() {
    const formValues = { ...this.userProfile.value };

    const formData: any = new FormData();
    formData.append('firstName', formValues.firstName);
    formData.append('lastName', formValues.lastName);
    this.selectedFiles && formData.append('avatar', this.selectedFiles[0]);

    this.authService.updatePersonalInfo(formData)
    .subscribe(() => {
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: 'Account updated successfully',
        duration: 1500
      });
      this.dialogRef.close();
    });

  }

  submitPassword() {
    const formValues = { ...this.changePassword.value };
  }

}