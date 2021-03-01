import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.model';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const storeUser = createAction('[Navbar Component] store User', props<{user: User}>());
export const resetUser = createAction('[Navbar Component] reset User');