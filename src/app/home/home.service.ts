import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  chatsUpdate = new Subject<boolean>();

  constructor(private http: HttpClient, private socket: Socket) { }

  getUsers() {
    return this.http.get<User[]>('api/users');
  }

  getCurrentUser() {
    return this.http.get<User>('api/current-user');
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

  emitSocketMessage(message: any) {
    this.socket.emit('message', message);
  }

  socketChatSubscribe(chatId: string) {
    return this.socket.fromEvent(`newMessageInChatId/${chatId}`).pipe(map((data: any) => data));
  }

  socketGlobalSubscribe(userId: string) {
    return this.socket.fromEvent(`chatUpdatedForUserId/${userId}`).pipe(map((data: any) => data));
  }

}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  role: string;
  updatedAt: string;
  accessToken?: string;
}
