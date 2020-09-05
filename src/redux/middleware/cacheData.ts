import moment from 'moment';
import { message } from 'antd';
import * as Redux from 'redux';

import { SYSTEM_KEY } from '@/constant';
import { setSession, getSession } from '@/utils';

// 缓存数据中间件
export function cacheData(store: Redux.Store) {
  return (next: Redux.Dispatch) => (action: Redux.AnyAction) => {
    next(action);

    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    const state = store.getState();
    const storeData = getSession(SYSTEM_KEY) || [];
    const obj = {
      state,
      time
    };

    // 只缓存最新的6条store
    try {
      setSession(SYSTEM_KEY, [obj, ...storeData.splice(0, 5)]);
    } catch (e) {
      message.error('缓存历史数据出错');
    }
  };
}
