import { CredentialResponse } from "google-one-tap";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";

export function googleAppInitializer(authService: AuthService) {
  return () => {
    new Promise((resolve, reject) => {
      window.onload = () => {
        const handleCredentialResponse = (response: CredentialResponse) => {
        };
        // @ts-ignore
        window.onGoogleLibraryLoad = () => {
          // @ts-ignore
          window.google.accounts.id.initialize({
            client_id: environment.googleAppId,
            callback: handleCredentialResponse,
            auto_select: true,
            cancel_on_tap_outside: false
          });
  
          const button = document.getElementById('g_signout_button');
          if (button) button.onclick = () => {
            // @ts-ignore
            google.accounts.id.disableAutoSelect();
          }
        };
  
        resolve(null);
      }
    });
  }

}