import { NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { CredentialResponse } from "google-one-tap";
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";

export function googleAppInitializer(authService: AuthService, zone: NgZone, router: Router) {
  return () => {
    new Promise((resolve, reject) => {
      window.onload = () => {
        const handleCredentialResponse = (response: CredentialResponse) => {
          authService.googleLogin(response.credential)
            .subscribe(res => {
              console.log(res);
              zone.run(() => {
                router.navigate(['/']);
              });
            })
        };
        // @ts-ignore
        window.onGoogleLibraryLoad = () => {
          // @ts-ignore
          window.google.accounts.id.initialize({
            client_id: environment.googleAppId,
            callback: handleCredentialResponse,
          });

          // @ts-ignore
          window.google.accounts.id.renderButton(
            // @ts-ignore
            document.getElementById("google-signin"),
            {
              type: 'standard',
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              shape: 'rectangular',
              logo_alignment: 'left',
              width: 200,
            }
          );

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