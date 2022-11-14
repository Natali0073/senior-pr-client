
import { FbStatusResponse } from "./app/auth/auth.service";
import fb = facebook;

export {};

declare global {
  interface Window {
    FB: fb.FacebookStatic;
  }
}

declare namespace facebook {
  interface FacebookStatic {
    login(
      callback: (response: FbStatusResponse) => void,
      options?: { scope: string }
    ): void; 
    logout(): void;
  }
}
