import { createActions, handleActions } from 'redux-actions';
import {
  MENU_OPENKEYS,
  MENU_SELECTKEYS,
  CLEAR_MENU
} from '@/redux/actionTypes';
import * as _ from 'lodash';

const menu: {
  openKeys: string[];
  selectedKeys: string[];
} = {
  openKeys: [],
  selectedKeys: []
};

const menuAction = createActions({
  [MENU_OPENKEYS]: (openKeys: string[]) => openKeys,
  [MENU_SELECTKEYS]: (selectedKeys: string[]) => selectedKeys,
  [CLEAR_MENU]: () => menu
});
export const menuOpenkeys = menuAction.menuOpenkeys;
export const menuSelectkeys = menuAction.menuSelectkeys;
export const clearMenu = menuAction.clearMenu;

export const menuReducer = handleActions(
  {
    [MENU_OPENKEYS]: (state, action: any) => {
      const state_ = _.cloneDeep(state);
      state_.openKeys = action.payload;
      return state_;
    },
    [MENU_SELECTKEYS]: (state, action: any) => {
      const state_ = _.cloneDeep(state);
      state_.selectedKeys = action.payload;
      return state_;
    },
    [CLEAR_MENU]: (state, action) => action.payload
  },
  menu
);
