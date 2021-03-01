import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../model/user.model';
export const featureKey = 'user';

export interface UserState {
    user: User
}
export const selectUser = (state: UserState) => state.user;
;

export const selectFeatureUser = createSelector(
    selectUser,
    (state: User) => ({...state})
  );