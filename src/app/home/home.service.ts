import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  chatsUpdate = new Subject<boolean>();

  constructor(private http: HttpClient, private socket: Socket) { }

  getUsers(filter: string, pagination: Pagination) {
    const params = new HttpParams()
      .set('name', filter || '')
      .set('page', pagination.page || 0)
      .set('size', pagination.size);

    return this.http.get<UserListDTO>('api/users', { params });
  }

  getCurrentUser() {
    return this.http.get<User>('api/current-user');
  }

  getAllChats(pagination: Pagination) {
    const params = new HttpParams()
      .set('page', pagination.page || 0)
      .set('size', pagination.size);
    return this.http.get<ChatListDTO>('api/chats', { params });
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

    return this.http.get<Message[]>(`/api/chat/${chatId}/messages`, { params });
  }

  sendMessage(chatId: string, message: string) {
    return this.http.post<Message[]>(`/api/chat/${chatId}/send`, { text: message });
  }

  emitSocketMessage(message: Message) {
    this.socket.emit('message', message);
  }

  socketChatSubscribe(chatId: string): Observable<Message> {
    return this.socket.fromEvent(`newMessageInChatId/${chatId}`).pipe(map((message) => message)) as Observable<Message>;
  }

  socketGlobalSubscribe(userId: string): Observable<Chat> {
    return this.socket.fromEvent(`chatUpdatedForUserId/${userId}`).pipe(map((chat) => chat)) as Observable<Chat>;
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

export interface UserListDTO extends ListPagination {
  users: User[];
}

export interface ListPagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface ChatListDTO extends ListPagination {
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

export interface Message {
  chatId: string;
  createdAt: string;
  id?: string;
  text: string;
  updatedAt?: string;
  userId: string;
  formattedDate?: string;
}