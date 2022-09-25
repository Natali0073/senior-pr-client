import { combineReducers } from "@ngrx/store";
import { createReducer, on } from '@ngrx/store';
import { getChats } from "./chats.actions";

export interface UsersStore {
  chats: any[];
}

export const chatsListReducer = createReducer(
  [],
  on(getChats, (state, { chats }) => chats)
);

export const chatssReducer = combineReducers({
  chatsData: chatsListReducer
});