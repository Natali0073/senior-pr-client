import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private socket: Socket) { }

  getUsers() {
    return this.http.get<User[]>('api/users');
  }

  getCurrentUser() {
    return this.http.get<User>('api/current-user');
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data.msg));
  }

  getAllChats(pagination: any) {
    return this.http.get<any[]>('api/chats', { params: pagination });
  }

  startConversation(receiverData: any) {
    return this.http.get<any[]>('api/chat', { params: receiverData });
  }

  getMessagesByChat(chatId: string, pagination: any) {
    return this.http.get<any[]>(`/api/chat/${chatId}/messages`, { params: pagination });
  }

  sendMessage(chatId: string, message: string) {
    return this.http.post<any[]>(`/api/chat/${chatId}/send`, { text: message });
  }

}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  role: string;
  updatedAt: string;
  accessToken?: string;
}
