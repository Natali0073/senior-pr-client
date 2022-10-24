import { HttpRequest } from "@angular/common/http";
import { AbstractControl } from "@angular/forms";
import { Chat } from "src/app/home/home.service";

export const checkFieldValid = (field: AbstractControl | null) => (field?.invalid && field?.touched) || field?.dirty || true;

export const formErrorMessage = (field: AbstractControl | null) => {
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

export const chatsSorting = (chats: Chat[]): Chat[] => chats.sort((a: Chat, b: Chat) => new Date(b.updatedAt).getTime() < new Date(a.updatedAt).getTime() ? -1 : 1);
