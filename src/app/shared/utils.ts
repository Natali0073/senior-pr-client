import { FormGroup } from "@angular/forms";

export const checkFieldValid = (field: any) => (field?.invalid && field?.touched) || field?.dirty;

export const formErrorMessage = (field: any) => {
  let message = 'Field is required';

  switch (true) {
    case field?.errors?.email:
      message = 'Email is invalid';
      break;

    case field?.errors?.required:
      message = 'Field is required';
      break;

    default:
      message = 'Field is required';
      break;
  }

  return message;
}