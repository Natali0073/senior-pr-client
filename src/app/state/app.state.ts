import { ChatsStore } from "./chats/chats.reducer";
import { UsersStore } from "./users/users.reducer";

export interface AppState {
  usersStore: UsersStore;
  chatsStore: ChatsStore;
}