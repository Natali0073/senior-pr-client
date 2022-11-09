import { createAction, props } from '@ngrx/store';
import { User, UserListDTO } from '../../home/home.service';

export const getCurrentUser = createAction(
  '[Users] Get Current User',
  props<{ user: User }>()
);
