import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatchValidator } from 'src/app/shared/utils/match-validator';
import { passwordValidator } from 'src/app/shared/utils/password-validator';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { checkFieldValid, formErrorMessage } from 'src/app/shared/utils/utils';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [UnsubscriberService]
})
export class RegistrationComponent {
  registrationForm = new UntypedFormGroup({
    firstName: new UntypedFormControl('', [
      Validators.required
    ]),
    lastName: new UntypedFormControl('', [
      Validators.required
    ]),
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new UntypedFormControl('', [
      Validators.required,
      passwordValidator()
    ]),
    passwordConfirmation: new UntypedFormControl('', [
      Validators.required,
      passwordValidator()
    ]),
    termsPolicyAgree: new UntypedFormControl('', [
      Validators.required
    ]),
  }, [MatchValidator('password', 'passwordConfirmation')]);

  loading = false;

  constructor(
    private readonly unsubscriber: UnsubscriberService,
    public authService: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  checkValid(fieldName: string) {
    return checkFieldValid(this.registrationForm.get(fieldName));
  }

  getErrorMessage(fieldName: string) {
    return formErrorMessage(this.registrationForm.get(fieldName));
  }

  passwordMatchError() {
    return (
      this.registrationForm.getError('mismatch') &&
      this.registrationForm.get('passwordConfirmation')?.touched
    );
  }

  onSubmit() {
    const formValues = { ...this.registrationForm.value };

    const dto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password
    }
    this.loading = true;
    this.authService.register(dto)
      .pipe(
        this.unsubscriber.takeUntilDestroy,
        finalize(() => this.loading = false),
      )
      .subscribe(() => {
        this._snackBar.openFromComponent(SnackBarComponent, {
          data: 'Account created successfully',
          duration: 1500
        });
        this.router.navigate(['/']);
      });
  }
}
