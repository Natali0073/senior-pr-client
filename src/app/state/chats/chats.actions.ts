import { createAction, props } from '@ngrx/store';

export const getChats = createAction(
  '[Chats] Get Chats',
  props<{ data: any }>()
);

export const getChat = createAction(
  '[Chats] Get Chat',
  props<{ chat: any }>()
);

export const getChatsPagination = createAction(
  '[Chats] Get Chats Pagination',
  props<{ data: any }>()
);
