import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, EMPTY, from, Observable, of } from 'rxjs';
import { User } from '../home/home.service';

export interface NewUserDto extends UserLoginDto {
  firstName: string;
  lastName: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface ChangePwDto {
  oldPassword: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // store the URL so we can redirect after logging in
  private apiBase = '/api/auth';

  authToken: string = '';

  constructor(private http: HttpClient) { }

  register(data: NewUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiBase}/register`, data);
  }

  login(data: UserLoginDto): Observable<User> {
    return this.http.post<User>(`${this.apiBase}/login`, data);
  }

  logout() {
    return this.http.post(`${this.apiBase}/logout`, {});
  }

  resetPasswordRequest(userEmail: string) {
    return this.http.post(`${this.apiBase}/reset-password/mail`, { userEmail: userEmail });
  }

  resetPassword(data: ResetPasswordDto) {
    return this.http.post<User>(`${this.apiBase}/reset-password`, data);
  }

  changePassword(data: ChangePwDto) {
    return this.http.post<User>(`${this.apiBase}/change-password`, data);
  }

  updatePersonalInfo(data: FormData) {
    return this.http.put<User>(`/api/user-update`, data);
  }

  fbLogin() {
      FB.login(function(response: any) {
        console.log('response', response);

        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response: any) {
          console.log('response', response);

           console.log('Good to see you, ' + response.name + '.');
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    });

    // login with facebook and return observable with fb access token on success
    // return from(new Promise<fb.StatusResponse>(resolve => FB.login(resolve)))
    //   .pipe(concatMap(({ authResponse }) => {
    //     console.log('fbLogin authResponse', authResponse);

    //     if (!authResponse) return EMPTY;
    //     return of(authResponse.accessToken);
    //   }));
  }

  apiFBAuthenticate(token: string) {
    console.log('apiFBAuthenticate', token);
    return of(token);

  }
}
