import { combineReducers } from "@ngrx/store";
import { createReducer, on } from '@ngrx/store';
import { getChat, getChats } from "./chats.actions";

export interface UsersStore {
  chats: any[];
}

export const chatsListReducer = createReducer(
  [],
  on(getChats,
    (state, { data }) => {
      let chatsById = {};
      data.chats.forEach((chat: any) => {
        chatsById = { ...chatsById, [chat.id]: chat }
      });
      return data.chats;
    }),
  on(getChat,
    (state: any, { chat }) => {
      const index = state.findIndex((el: any) => el.id === chat.id);
      const stateCopy: any = [...state];
      
      index === -1 ? stateCopy.push(chat) : stateCopy.splice(index, 1, chat);
      
      return stateCopy;
    }),
);

export const chatssReducer = combineReducers({
  chatsData: chatsListReducer
});