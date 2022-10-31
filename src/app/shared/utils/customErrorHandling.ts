import { HttpErrorResponse } from "@angular/common/http";

export const customErrorHandling = (response: HttpErrorResponse) => {
  let message = null;
  switch (true) {
    case response.status === 403 && response.error.reason === 'userBanned':
      message = `Opps, you are banned! Please contact our customer service.`;
      break;

    default:
      break;
  }

  return message;
}