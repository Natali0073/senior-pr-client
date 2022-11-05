import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";

export function googleAppInitializer(accountService: AuthService) {
  return new Promise((resolve, reject) => {
    const handleCredentialResponse = (event: any) => {
      console.log(event);
      
    }

    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "336777826953-p2cboe6lq10rhh7klva43k65vlqs481f.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
    }

    // google.accounts.id.renderButton(
    //   (document as any).getElementById("buttonDiv"),
    //   { theme: "outline", size: "large", type: "icon" }  // customization attributes
    // );
    // google.accounts.id.prompt(); // also display the One Tap dialog

    resolve(null);
    
    // wait for facebook sdk to initialize before starting the angular app
    // window['fbAsyncInit'] = function () {
    //   FB.init({
    //     appId: environment.facebookAppId,
    //     autoLogAppEvents: true,
    //     xfbml: true,
    //     version: 'v15.0'
    //   });
    // }

    // // auto authenticate with the api if already logged in with facebook
    // FB.getLoginStatus(({ authResponse }) => {
    //   if (authResponse) {
    //     accountService.apiFBAuthenticate(authResponse.accessToken)
    //       .subscribe()
    //       .add(() => resolve(null));
    //   } else {
    //     resolve(null);
    //   }
    // });
  });
}