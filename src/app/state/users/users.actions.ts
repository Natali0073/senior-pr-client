import { createAction, props } from '@ngrx/store';
import { User } from '../../home/home.service';

export const getCurrentUser = createAction(
  '[Users] Get Current User',
  props<{ user: User }>()
);

export const getUsers = createAction(
  '[Users] Get Users',
  props<{ users: any }>()
);
