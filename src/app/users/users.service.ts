import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    const headers = new HttpHeaders()
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUxMjQxNjI0LCJleHAiOjE2NTEzMjgwMjR9._b5a2K6bElJCxmGfp8_4HfwCTrW7ug5OuQLN7nWHghQ')
    return this.http.get<User[]>('api/users', { 'headers': headers });
  }

  addUser(data: AddUserDto) {
    return this.http.post<User[]>('users', data);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`users/${id}`);
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AddUserDto {
  name: string;
  email: string;
}