import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
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

export interface FbStatusResponse {
  status: FbLoginStatus;
  authResponse: FbAuthResponse;
}

type FbLoginStatus =
  | 'authorization_expired'
  | 'connected'
  | 'not_authorized'
  | 'unknown';

export interface FbAuthResponse {
  accessToken: string;
  data_access_expiration_time: number;
  expiresIn: number;
  signedRequest: string;
  userID: string;
  grantedScopes?: string | undefined;
  reauthorize_required_in?: number | undefined;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // store the URL so we can redirect after logging in
  private apiBase = '/api/auth';

  authToken: string = '';
  fbLoginSubject = new Subject<FbStatusResponse>();

  constructor(private http: HttpClient, public router: Router) { }

  register(data: NewUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiBase}/register`, data);
  }

  login(data: UserLoginDto): Observable<User> {
    return this.http.post<User>(`${this.apiBase}/login`, data);
  }

  fbLoginHandler(token: string) {
    return this.http.post(`${this.apiBase}/login-facebook`, { accessToken: token });
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
    FB.login((response: FbStatusResponse) => {
      this.fbLoginSubject.next(response);
    }, { scope: 'email' });
  }

  fbLogout() {
    FB.logout();
  }
}
