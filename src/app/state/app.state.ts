import { UsersStore } from "./users/users.reducer";

export interface AppState {
  usersStore: UsersStore;
  chatsStore: any;
}