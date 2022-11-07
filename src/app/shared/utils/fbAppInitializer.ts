import { environment } from "src/environments/environment";

export function fbAppInitializer() {
  return () => {
    new Promise((resolve, reject) => {
      window.onload = function () {
        // wait for facebook sdk to initialize before starting the angular app
        window.fbAsyncInit = () => {
          FB.init({
            appId: environment.facebookAppId,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v15.0'
          });
        }
      }
    });
  }

}
