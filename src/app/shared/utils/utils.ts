import { HttpRequest } from "@angular/common/http";

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

    case field?.errors?.passwordStrength:
      message = `Password must include upper case character, number. Min 8 symbols.`;
      break;

    default:
      message = 'Field is required';
      break;
  }

  return message;
}

export const validateImageSize = (imageSize: number) => imageSize <= 2048000;

export const redirectionIsAvailable = (request: HttpRequest<unknown>) => request.url !== '/api/auth/reset-password';
