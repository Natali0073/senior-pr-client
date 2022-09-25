import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectChatsStore = (state: AppState) => state.chatsStore;

export const selectChats = createSelector(
  selectChatsStore,
  (state: any) => state.chatsData
);
