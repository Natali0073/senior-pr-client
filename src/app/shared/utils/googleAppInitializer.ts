import { environment } from "src/environments/environment";

export function googleAppInitializer() {
  return new Promise((resolve, reject) => {
    const handleCredentialResponse = () => {
    };
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: environment.googleAppId,
        callback: handleCredentialResponse,
        auto_select: true,
        cancel_on_tap_outside: false
      });
    };

    resolve(null);
  });
}