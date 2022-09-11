import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../home/home.service';
import { AppState } from './app.state';
import { UsersStore } from './users.reducer';

export const selectUsersStore = (state: AppState) => state.usersStore;

export const selectCurrentUser = createSelector(
  selectUsersStore,
  (state: UsersStore) => state.currentUser
);
