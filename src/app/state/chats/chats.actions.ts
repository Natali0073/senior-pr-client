import { createAction, props } from '@ngrx/store';

export const getChats = createAction(
  '[Users] Get Chats',
  props<{ chats: any }>()
);
