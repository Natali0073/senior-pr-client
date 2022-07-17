import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../home/home.service';

export interface NewUserDto extends UserLoginDto {
  firstName: string;
  lastName: string;
}

export interface UserLoginDto {
  email: string;
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

  resetPassword(userEmail: string) {
    return this.http.post(`${this.apiBase}/password-reset/mail`, { userEmail: userEmail });
  }

  changePassword(data: UserLoginDto) {
    return this.http.post<User>(`${this.apiBase}/change-password`, data);
  }
}
