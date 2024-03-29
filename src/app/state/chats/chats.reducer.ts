import { combineReducers } from "@ngrx/store";
import { createReducer, on } from '@ngrx/store';
import { Chat, ListPagination } from "src/app/home/home.service";
import { chatsSorting } from "src/app/shared/utils/utils";
import { getChat, getChats, getChatsPagination } from "./chats.actions";

export interface ChatsStore {
  chatsData: Chat[];
  chatsPagination: ListPagination;
}

export const chatsListReducer = createReducer(
  [] as Chat[],
  on(getChats,
    (state, { data }) => {
      return chatsSorting([...data.chats]);
    }),
  on(getChat,
    (state: Chat[], { chat }) => {
      const index = state.findIndex((el: Chat) => el.id === chat.id);
      const stateCopy: Chat[] = [...state];
      // new chat add to the start of array, existed - update
      index === -1 ? stateCopy.unshift(chat) : stateCopy.splice(index, 1, chat);

      return chatsSorting(stateCopy);
    })
);

export const chatsPaginationReducer = createReducer(
  {},
  on(getChatsPagination,
    (state, { data }) => {
      const pagination: ListPagination = {
        currentPage: data.currentPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages
      }
      return pagination;
    })
);

export const chatssReducer = combineReducers({
  chatsData: chatsListReducer,
  chatsPagination: chatsPaginationReducer
});