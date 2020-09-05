import { createActions, handleActions } from 'redux-actions';
import { SET_OPENKEYS, CLEAR_OPENKEYS } from '@/redux/actionTypes';

const openKeys: string[] = [];
const openKeysAction = createActions({
  [SET_OPENKEYS]: (openKeys: string[]) => openKeys,
  [CLEAR_OPENKEYS]: () => []
});

// console.log(openKeysAction);
export const setOpenKeys = openKeysAction.setOpenKeys;
export const clearOpenkeys = openKeysAction.clearOpenkeys;

export const openKeysReducer = handleActions(
  {
    [SET_OPENKEYS]: (state: string[], action) => action.payload,
    [CLEAR_OPENKEYS]: (state: string[], action) => action.payload
  },
  openKeys
);


