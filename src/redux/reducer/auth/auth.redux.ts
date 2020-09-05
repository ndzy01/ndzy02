import { createActions, handleActions } from 'redux-actions';
import { SET_AUTH, CLEAR_AUTH } from '@/redux/actionTypes';
import { AnyObj } from '@/types';

const auth: AnyObj[] = [];

const actions = createActions({
  [SET_AUTH]: (authInfo: AnyObj[]) => {
    return authInfo;
  },
  [CLEAR_AUTH]: () => {
    return [];
  }
});
console.log(actions);
export const setAuth = actions.setAuth;
export const clearAuth = actions.clearAuth;

export const authReducer = handleActions(
  {
    [SET_AUTH]: (state: AnyObj[], action) => {
      return action.payload;
    },
    [CLEAR_AUTH]: (state: AnyObj[], action) => action.payload
  },
  auth
);
