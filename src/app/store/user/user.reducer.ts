import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, storeUser, resetUser } from './user.actions';

export const initialState = 0;
export const initialUserState = {
  username: 'default',
  password: '123',
  role: 'default'
};

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);

const _userReducer = createReducer(
  initialUserState,
  on(storeUser, (state, data) => (state = {
    username: data['userName'],
    password: data['password'],
    role: data['role']
  })),
  on(resetUser, (state) => (
    {
      username: '',
      password: '',
      role: ''
    }
  ))
)

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}

export function userReducer(state, action) {
  console.log('state:', state , 'action: ', action);
  return _userReducer(state, action);
}