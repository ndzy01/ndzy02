import { createActions, handleActions } from 'redux-actions';
import { SET_SELECTKEYS, CLEAR_SELECTKEYS } from '@/redux/actionTypes';

const selectKeys: string[] = [];

const selectKeysAction = createActions({
  [SET_SELECTKEYS]: (selectKeys: string[]) => {
    return selectKeys;
  },
  [CLEAR_SELECTKEYS]: () => {
    return [];
  }
});
// console.log(selectKeysAction);
export const setSelectKeys = selectKeysAction.setSelectKeys;
export const clearSelectkeys = selectKeysAction.clearSelectkeys;

export const selectKeysReducer = handleActions(
  {
    [SET_SELECTKEYS]: (state: string[], action) => action.payload,
    [CLEAR_SELECTKEYS]: (state: string[], action) => action.payload
  },
  selectKeys
);
