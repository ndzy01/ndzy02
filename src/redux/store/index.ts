import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
//
import {
  authReducer as auth,
  breadcrumbReducer as breadcrumb,
  collapsedReducer as collapsed,
  openKeysReducer as openKeys,
  selectKeysReducer as selectKeys,
  clearAuth,
  clearBreadcrumb,
  clearCollapsed,
  clearOpenkeys,
  clearSelectkeys
} from '@/redux/reducer';
//
import { cacheData } from '@/redux/middleware/cacheData';

//
import { getSession } from '@/utils';
import { SYSTEM_KEY } from '@/constant';
import { AnyObj } from '@/types';

export interface MyStore extends Store {
  auth: AnyObj[];
  breadcrumb: {
    path?: string;
    name: string;
  }[];
  collapsed: boolean;
  openKeys: string[];
  selectKeys: string[];
}

const middlewares: any = [];
middlewares.push(promiseMiddleware);
middlewares.push(cacheData as any);
if (process.env.NODE_ENV === 'development') {
  //创建中间件logger
  const logger = createLogger({
    predicate: () => {
      return true;
    }
  });
  middlewares.push(logger);
}

const reducer = combineReducers({
  auth,
  breadcrumb,
  collapsed,
  openKeys,
  selectKeys
});

const state = getSession(SYSTEM_KEY);
let initState = {};

if (state) {
  initState = state[0].state;
}
//  window.STATE_FROM_SERVER 可以有第二个参数,表示 State 的最初状态。这通常是服务器给出的。
export const store = createStore(
  reducer,
  initState,
  applyMiddleware(...middlewares)
);
export const clearStore = () => {
  store.dispatch(clearAuth());
  store.dispatch(clearBreadcrumb());
  store.dispatch(clearCollapsed());
  store.dispatch(clearOpenkeys());
  store.dispatch(clearSelectkeys());
};
