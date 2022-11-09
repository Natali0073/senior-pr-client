import { createAction, props } from '@ngrx/store';
import { Chat, ChatListDTO, ListPagination } from 'src/app/home/home.service';

export const getChats = createAction(
  '[Chats] Get Chats',
  props<{ data: ChatListDTO }>()
);

export const getChat = createAction(
  '[Chats] Get Chat',
  props<{ chat: Chat }>()
);

export const getChatsPagination = createAction(
  '[Chats] Get Chats Pagination',
  props<{ data: ListPagination }>()
);
