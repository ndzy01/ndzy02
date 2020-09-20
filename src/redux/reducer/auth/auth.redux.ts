import { createActions, handleActions } from 'redux-actions';
import { SET_AUTH, CLEAR_AUTH } from '@/redux/actionTypes';

const auth: AnyObj[] = [];

const actions = createActions({
  [SET_AUTH]: (auth: AnyObj[]) => auth,
  [CLEAR_AUTH]: () => []
});

export const setAuth = actions.setAuth;
export const clearAuth = actions.clearAuth;

export const authReducer = handleActions(
  {
    [SET_AUTH]: (state, action) => action.payload,
    [CLEAR_AUTH]: (state, action) => action.payload
  },
  auth
);
