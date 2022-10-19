import { combineReducers } from "@ngrx/store";
import { createReducer, on } from '@ngrx/store';
import { chatsSorting } from "src/app/shared/utils/utils";
import { getChat, getChats } from "./chats.actions";

export interface UsersStore {
  chats: any[];
}

export const chatsListReducer = createReducer(
  [],
  on(getChats,
    (state, { data }) => {
      return chatsSorting([...data.chats]);
    }),
  on(getChat,
    (state: any, { chat }) => {
      const index = state.findIndex((el: any) => el.id === chat.id);
      const stateCopy: any = [...state];
      // new chat add to the start of array, existed - update
      index === -1 ? stateCopy.unshift(chat) : stateCopy.splice(index, 1, chat);

      return chatsSorting(stateCopy);
    }),
);

export const chatssReducer = combineReducers({
  chatsData: chatsListReducer
});