import { combineReducers } from "@ngrx/store";
import { createReducer, on } from '@ngrx/store';
import { User } from "src/app/home/home.service";
import { getCurrentUser } from './users.actions';

export interface UsersStore {
  currentUser: User | null;
}

export const currentUserReducer = createReducer(
  {},
  on(getCurrentUser, (state, { user }) => user)
);

export const usersReducer = combineReducers({
  currentUser: currentUserReducer,
});