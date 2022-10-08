import { createAction, props } from '@ngrx/store';

export const getChats = createAction(
  '[Chats] Get Chats',
  props<{ chats: any }>()
);
