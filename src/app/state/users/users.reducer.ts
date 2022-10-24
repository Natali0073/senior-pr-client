import { combineReducers } from "@ngrx/store";
import { createReducer, on } from '@ngrx/store';
import { User } from "src/app/home/home.service";
import { getCurrentUser, getUsers } from './users.actions';

export interface UsersStore {
  currentUser: User | null;
  users: User[];
}

export const currentUserReducer = createReducer(
  {},
  on(getCurrentUser, (state, { user }) => user)
);

export const usersListReducer = createReducer(
  [] as User[],
  on(getUsers, (state, { users }) => users)
);

export const usersReducer = combineReducers({
  currentUser: currentUserReducer,
  users: usersListReducer
});