import { createActions, handleActions } from 'redux-actions';
import { CHANGE_COLLAPSED, CLEAR_COLLAPSED } from '@/redux/actionTypes';

const collapsed: boolean = false;
const collapsedAction = createActions({
  [CHANGE_COLLAPSED]: (collapsed: boolean) => collapsed,
  [CLEAR_COLLAPSED]: () => false
});
// console.log(collapsedAction);
export const changeCollapsed = collapsedAction.changeCollapsed;
export const clearCollapsed = collapsedAction.clearCollapsed;

export const collapsedReducer = handleActions(
  {
    [CHANGE_COLLAPSED]: (state: boolean, action) => action.payload,
    [CLEAR_COLLAPSED]: (state: boolean, action) => action.payload
  },
  collapsed
);
