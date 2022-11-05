import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";
import { loadScript } from "./loadScript";

export function fbAppInitializer(accountService: AuthService) {
  return new Promise((resolve, reject) => {
    // wait for facebook sdk to initialize before starting the angular app
    window['fbAsyncInit'] = function () {
      FB.init({
        appId: environment.facebookAppId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v15.0'
      });
    }

    // auto authenticate with the api if already logged in with facebook
    FB.getLoginStatus(({ authResponse }) => {
      if (authResponse) {
        accountService.apiFBAuthenticate(authResponse.accessToken)
          .subscribe()
          .add(() => resolve(null));
      } else {
        resolve(null);
      }
    });

  });
}
