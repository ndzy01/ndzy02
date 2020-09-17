/*
 * ie9不支持CROS跨域，只能做服务器代理实现跨域
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isEmpty, isObject, isString, isArray } from 'lodash';
import NProgress from 'nprogress';
import { message } from 'antd';
import { historyHash as history } from './goPage';
import { getSession } from './index';
import { useRequest } from 'ahooks';
import { customConfig } from './customConfig';

interface Options {
  allBack: boolean;
}

interface DefaultConfig extends AxiosRequestConfig {
  url: string;
  baseURL: string;
  headers: {
    authorization: string;
  };
  params: {
    [propName: string]: any;
  };
  data: any;
  timeout: number;
  maxRedirects: number;
  cancelToken: any;
  timestamp: boolean;
  single: boolean;
}

interface Config {
  url: string;
  data: any;
  [propName: string]: any;
}

const method = {
  get: 'get',
  post: 'post',
  put: 'put'
};

const responseType = {
  json: 'json',
  arraybuffer: 'arraybuffer',
  blob: 'blob',
  document: 'document',
  text: 'text',
  stream: 'stream'
};

axios.interceptors.response.use(
  function (response) {
    // IE 9 bug
    if (
      !response.data &&
      response.request.responseText &&
      response.config.responseType === responseType.json
    ) {
      response.data = JSON.parse(response.request.responseText);
    }

    return response;
  },
  function (err) {
    return Promise.reject('网络加载失败，请重试');
  }
);

class AxiosPackage {
  defaultConfig: DefaultConfig;
  reqList: { [propName: string]: any };
  cancelMessage: string;
  reqCount: number;

  constructor(baseUrl: string) {
    // 所有可配置参数
    this.defaultConfig = {
      url: '',
      method: 'get',
      baseURL: baseUrl || '',
      headers: {
        authorization: ''
      }, //自定义请求头
      params: {}, //get请求参数
      data: {}, //请求参数
      timeout: 10000, //超时时间
      responseType: 'json', //响应类型
      maxRedirects: 3, //重定向次数
      cancelToken: null, //取消未完成请求

      timestamp: true, //时间戳
      single: false //同一接口只能同时存在一次请求
    };

    this.reqList = {}; // 当前未完成的请求
    this.cancelMessage = 'stop request';
    this.reqCount = 0;
  }
  /**
   * @description 验证请求参数 checkParams
   * @param params
   */
  checkParams(params: Config) {
    // 序列化data中的对象
    for (const key in params.data) {
      const value = params.data[key];

      if (isObject(value)) {
        // params.data[key] = JSON.stringify(value);
      }
    }

    // 处理get和post参数
    if (params.method === method.get) {
      params.params = params.data || {};
    }

    // 添加时间戳
    if (params.timestamp) {
      params.params.t = Date.now();
    }

    // 中断当前接口的未完成请求
    if (params.single) {
      this.reqList[params.url] && this.reqList[params.url](this.cancelMessage);

      params.cancelToken = new axios.CancelToken((c) => {
        this.reqList[params.url] = c;
      });
    }

    //TODO: 自定义请求头
    const userInfo = getSession('SYSTEM_KEY');
    let token = '';

    if (isArray(userInfo)) {
      // TODO: 登录后 设置 token
      // token = userInfo[0].state.loginInfo.token;
    }

    params.headers.authorization = token || '';

    return params;
  }

  /**
   * @description 中断所有未完成请求 stopAllReq
   */
  stopAllReq() {
    for (let key in this.reqList) {
      this.reqList[key] && this.reqList[key](this.cancelMessage);
    }

    this.reqList = {};
  }

  //#region 通用请求 req
  /**
   * @description 通用请求 req
   * @description allBack 不管什么状态都返回结果
   * @description spin 是否加载全局loading图标
   * @param config
   * @param options
   */
  req(config: Config, options: Options = { allBack: false }) {
    let p = null;

    if (isEmpty(config.url)) {
      return Promise.reject('url 不能为空');
    }

    p = new Promise((resolve, reject) => {
      NProgress.start();
      this.reqCount += 1;

      axios(config)
        .then((res) => {
          if (options.allBack) {
            resolve(res.data);
            return;
          }
          const resCode = String(res.data.status);

          // 正常状态，返回数据
          if (resCode === '0') {
            resolve(res.data.data);
            return;
          }

          // 登录过期
          if (resCode === '100' || resCode === '101') {
            this.stopAllReq();
            history.push('/login');
            reject('登录过期，请重新登录');
            return;
          }

          reject(res.data.message);
        })
        .catch((err) => {
          if (isString(err)) {
            reject(err);
            return;
          }

          reject('axios错误');
        });
    });

    p.catch((err) => {
      console.log(err);
      if (options.allBack) {
        return err;
      }

      if (isString(err)) {
        message.error(err);
        return;
      }

      // 中断请求，不弹提示框
      if (config.single && err.message === this.cancelMessage) {
        return;
      }

      if (err && err.message) {
        message.error(err.message);
      } else {
        message.error('返回数据有误，请重试');
      }
    }).finally(() => {
      if (this.reqList[config.url]) {
        delete this.reqList[config.url];
      }

      this.reqCount -= 1;
      if (this.reqCount <= 0) {
        NProgress.done();
      }
    });

    return p;
  }
  //#endregion

  /**
   * @description post 方法
   * @param params
   * @param options
   */
  post(params: Config, options?: Options) {
    let config;

    params = Object.assign(
      {},
      this.defaultConfig,
      { method: method.post },
      params
    );
    config = this.checkParams(params);

    return this.req(config, options);
  }

  /**
   * @description get 方法
   * @param params
   * @param options
   */
  get(params: Config, options?: Options) {
    let config;

    params = Object.assign(
      {},
      this.defaultConfig,
      { method: method.get },
      params
    );
    config = this.checkParams(params);

    return this.req(config, options);
  }

  /**
   * @description put 方法
   * @param params
   * @param options
   */
  put(params: Config, options?: Options) {
    let config;

    params = Object.assign(
      {},
      this.defaultConfig,
      { method: method.put },
      params
    );
    config = this.checkParams(params);

    return this.req(config, options);
  }
}

// 单例模式
const request = (function () {
  let instance: AxiosPackage;

  return function () {
    if (!instance) {
      const baseURL = customConfig.baseURL;

      instance = new AxiosPackage(baseURL);
    }

    return instance;
  };
})();

//#region useAxiosReq useLazyAxiosReq
/**
 * @description 自动执行 useAxiosReq
 * @param type
 * @param options
 */
export const useAxiosReq = (type: 'get' | 'post' = 'post', options?: any) =>
  useRequest((param) => param, {
    requestMethod: (param: any) => {
      if (type === 'get') {
        return request().get(param);
      } else if (type === 'post') {
        return request().post(param);
      }
    },
    formatResult: (res: AxiosResponse) => res.data,
    ...options
  });

/**
 * @description 手动调用 useLazyAxiosReq
 * @param type
 * @param options
 */
export const useLazyAxiosReq = (type: 'get' | 'post' = 'post', options?: any) =>
  useRequest((param) => param, {
    manual: true,
    requestMethod: (param: any) => {
      const http = request();
      if (type === 'get') {
        return request().get(param);
      } else if (type === 'post') {
        return http.post({ ...param });
      }
    },
    formatResult: (res: AxiosResponse) => res.data,
    ...options
  });
//#endregion

export default request();
