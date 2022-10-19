import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  chatsUpdate = new Subject<boolean>();

  constructor(private http: HttpClient, private socket: Socket) { }

  getUsers(filter: string) {
    const params = new HttpParams()
      .set('name', filter || '');
      
    return this.http.get<User[]>('api/users', { params });
  }

  getCurrentUser() {
    return this.http.get<User>('api/current-user');
  }

  getAllChats(pagination: Pagination) {
    const params = new HttpParams()
      .set('page', pagination.page || 0)
      .set('size', pagination.size);
    return this.http.get<Chat[]>('api/chats', { params });
  }

  startConversation(receiverData: { receiverId: string }) {
    return this.http.get<Chat>('api/chat', { params: receiverData });
  }

  getMessagesByChat(chatId: string, pagination: Pagination) {
    const params = pagination.lastMessageDate ?
      new HttpParams()
        .set('lastMessageDate', pagination.lastMessageDate)
        .set('size', pagination.size) :
      new HttpParams()
        .set('size', pagination.size);

    return this.http.get<any[]>(`/api/chat/${chatId}/messages`, { params });
  }

  sendMessage(chatId: string, message: string) {
    return this.http.post<any[]>(`/api/chat/${chatId}/send`, { text: message });
  }

  emitSocketMessage(message: string) {
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

export interface ChatsPagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface ChatListDTO extends ChatsPagination {
  chats: Chat[];
}

export interface Chat {
  icon?: string;
  id: string;
  lastMessageText: string;
  name: string;
  updatedAt: string;
}

export interface Message {
  text: string;
}

export interface Pagination {
  lastMessageDate?: string;
  page?: number;
  size: number;
}