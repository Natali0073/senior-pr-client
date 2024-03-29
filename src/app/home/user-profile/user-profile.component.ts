import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { MatchValidator } from 'src/app/shared/utils/match-validator';
import { passwordValidator } from 'src/app/shared/utils/password-validator';
import { checkFieldValid, formErrorMessage, validateImageSize } from 'src/app/shared/utils/utils';
import { getCurrentUser } from 'src/app/state/users/users.actions';
import { User } from '../home.service';
import { finalize } from 'rxjs/operators';
import { selectCurrentUser } from 'src/app/state/users/users.selectors';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UnsubscriberService]
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;
  preview: string = '../../../assets/avatar.png';
  userProfile = new FormGroup({
    email: new FormControl({ value: this.currentUser?.email, disabled: true}),
    firstName: new FormControl(this.currentUser?.firstName || '', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    lastName: new FormControl(this.currentUser?.lastName || '', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  changePassword = new FormGroup({
    oldPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, passwordValidator()]
    }),
    passwordConfirmation: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, passwordValidator()]
    }),
  }, [MatchValidator('password', 'passwordConfirmation')]);

  activeTabIndex = 0;
  selectedFileNames: string[] = [];
  selectedFiles: FileList | null;
  message: string[] = [];
  validImage: boolean = true;
  loading = false;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.selectUserStore();
  }

  selectUserStore() {
    this.store.select(selectCurrentUser)
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((user) => {
        if (user) {
          this.currentUser = user;
          this.preview = user.avatar || this.preview;
          this.userProfile.setValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });
        }
      }
      );
  }

  onTabChange(event: MatTabChangeEvent) {
    this.activeTabIndex = event.index;
  }

  selectFiles(event: Event) {
    this.message = [];
    this.selectedFileNames = [];
    this.selectedFiles = (event.target as HTMLInputElement).files;
    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.preview = e.target?.result as string || '';
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
    const formValues = this.userProfile.getRawValue();

    const formData = new FormData();
    formData.append('firstName', formValues.firstName);
    formData.append('lastName', formValues.lastName);
    this.selectedFiles && formData.append('avatar', this.selectedFiles[0]);
    this.loading = true;
    this.authService.updatePersonalInfo(formData)
      .pipe(
        this.unsubscriber.takeUntilDestroy,
        finalize(() => this.loading = false),
      )
      .subscribe((user) => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: 'Account updated successfully',
        });
        this.dialogRef.close();
        this.store.dispatch(getCurrentUser({ user }))
      });
  }

  submitPassword() {
    const formValues = this.changePassword.getRawValue();
    const dto = {
      oldPassword: formValues.oldPassword,
      password: formValues.password,
    }
    this.loading = true;
    this.authService.changePassword(dto)
      .pipe(
        this.unsubscriber.takeUntilDestroy,
        finalize(() => this.loading = false),
      )
      .subscribe((user) => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: 'Password updated successfully',
        });
        this.dialogRef.close();
        this.store.dispatch(getCurrentUser({ user }))
      });
  }

}