import { FormGroup } from "@angular/forms";

export const checkFieldValid = (form: FormGroup, fieldName: string) => {
  return (form.get(fieldName)?.invalid &&
    form.get(fieldName)?.touched) ||
    form.get(fieldName)?.dirty;
}

export const formErrorMessage = (form: FormGroup, fieldName: string) => {
  let message = 'Field is required';

  switch (true) {
    case form.get(fieldName)?.errors?.email:
      message = 'Email is invalid';
      break;

    case form.get(fieldName)?.errors?.required:
      message = 'Field is required';
      break;

    default:
      message = 'Field is required';
      break;
  }

  return message;
}