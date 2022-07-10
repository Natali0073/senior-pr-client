import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const passwordValidator = (): ValidatorFn => {
  // at least 1 lowercase & uppercase & numeric characters
  // 8 characters or longer 
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const passwordValid = value.match(passwordRegex);

    return !passwordValid ? { passwordStrength: true } : null;
  }
}