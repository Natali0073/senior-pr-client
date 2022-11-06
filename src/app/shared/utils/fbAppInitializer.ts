import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";

interface AuthResponse {
  accessToken: string;
  data_access_expiration_time: number;
  expiresIn: number;
  signedRequest: string;
  userID: string;
  grantedScopes?: string | undefined;
  reauthorize_required_in?: number | undefined;
}

export function fbAppInitializer(accountService: AuthService) {
  return () => {
    new Promise((resolve, reject) => {
      window.onload = function () {
        // wait for facebook sdk to initialize before starting the angular app
      window['fbAsyncInit'] = function () {
        FB.init({
          appId: environment.facebookAppId,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v15.0'
        });
      }
  
      getLoginStatus(resolve, (authResponse) => {
        accountService.apiFBAuthenticate(authResponse.accessToken)
          .subscribe()
          .add(() => resolve(null));
      })
  
      FB.Event.subscribe('auth.login', function () {
        getLoginStatus(resolve, (authResponse) => {
          accountService.apiFBAuthenticate(authResponse.accessToken)
            .subscribe()
            .add(() => resolve(null));
        })
      });
      }
  
      
    });
  }
  
}

function getLoginStatus(
  resolve: (data: null) => void,
  callback: (authResponse: AuthResponse) => void
) {
  FB.getLoginStatus((data) => {
    console.log('getLoginStatus', data);
    const { authResponse } = data;
    authResponse ? callback(authResponse) : resolve(null);
  });
}
