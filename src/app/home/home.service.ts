import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers() {
    return this.http.get<User[]>('api/users');
  }
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken?: string;
}
