import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ChatsStore } from './chats.reducer';

export const selectChatsStore = (state: AppState) => state.chatsStore;

export const selectChats = createSelector(
  selectChatsStore,
  (state: ChatsStore) => state.chatsData
);

export const selectChatsPagination = createSelector(
  selectChatsStore,
  (state: ChatsStore) => state.chatsPagination
);
