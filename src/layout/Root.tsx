import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { isArray } from 'underscore';
import Frame from './Frame';
import { historyBrowser, historyHash, hasAuth } from '@/utils';
import { menuRouter, fullScreenRouter, errRouter } from './router';
import {
  setAuth,
  changeBreadcrumb,
  resetBreadcrumb,
  menuOpenkeys,
  menuSelectkeys
} from '@/redux/reducer';

import { MyStore } from '@/redux/store';

import { ActionFunctionAny } from 'redux-actions';
import { Action } from 'redux';
import * as _ from 'lodash';

const history = {
  browser: historyBrowser,
  hash: historyHash
};

export interface RootProps extends DispatchProp {
  logo: (collapsed: boolean) => JSX.Element;
  headerHeight: number;
  headerComponent: JSX.Element | null;
  navType: 'tab' | 'breadcrumb';
  maxTabNum: number;
  historyType: 'browser' | 'hash';
  auth: any[];
  collapsed: boolean;
  breadcrumb: any[];
  setAuth?: ActionFunctionAny<Action<any>>;
  resetBreadcrumb?: ActionFunctionAny<Action<any>>;
  changeBreadcrumb?: ActionFunctionAny<Action<any>>;
  menuSelectkeys?: ActionFunctionAny<Action<any>>;
  menuOpenkeys?: ActionFunctionAny<Action<any>>;
  [key: string]: any;
}

const mapStateToProps = (store: MyStore) => {
  const { auth, collapsed, breadcrumb } = store;
  return {
    auth,
    collapsed,
    breadcrumb
  };
};

export const Root = connect(mapStateToProps, {
  resetBreadcrumb,
  setAuth,
  changeBreadcrumb,
  menuOpenkeys,
  menuSelectkeys
})((props: RootProps) => {
  /**
   * @description 设置面包屑
   * @param data
   */
  const handleSetBreadcrumb = (
    data: { path?: string; name: string }[] | string
  ) => {
    const deepMenuRouter = _.cloneDeep(menuRouter);
    if (isArray(data)) {
      props.resetBreadcrumb && props.resetBreadcrumb(data);
      return;
    }

    const pathInfo = props.breadcrumb.find((item) => {
      return item.path === data;
    });

    // tab形式的面包屑需要同步设置selectKeys
    let openKey: string[] = [];

    deepMenuRouter.forEach((item) => {
      if (data.split('?')[0] === item.path) {
        if (!pathInfo) {
          props.changeBreadcrumb &&
            props.changeBreadcrumb({ path: data, name: item.title });
        }
        props.menuSelectkeys && props.menuSelectkeys([data]);
      } else if (data.includes(item.parent)) {
        openKey.push(item.parent);
      }
    });

    openKey = _.uniq(openKey).filter((item) => item !== '');

    if (!props.collapsed) {
      props.menuOpenkeys && props.menuOpenkeys(openKey);
    }
  };
  return (
    <Router history={history[props.historyType]}>
      <Switch>
        {/* 导航菜单下的子模块 */}
        {menuRouter.map((item) => {
          // 路由权限
          if (!hasAuth(item.auth, props.auth)) {
            return null;
          }
          return (
            <Route
              exact
              key={item.path}
              path={item.path}
              render={(routeProps) => {
                const Page = item.component; //页面

                return (
                  <Frame {...props} {...routeProps}>
                    <Page
                      {...routeProps}
                      setBreadcrumb={(data: any) => {
                        handleSetBreadcrumb(data);
                      }}
                      setAuth={(authInfo: any) => {
                        props.setAuth && props.setAuth(authInfo);
                      }}
                    />
                  </Frame>
                );
              }}
            />
          );
        })}

        {/* 全局模块 */}
        {fullScreenRouter.map((item) => {
          return (
            <Route
              exact
              key={item.path}
              path={item.path}
              render={(routeProps) => {
                const Page = item.component;

                return (
                  <Page
                    {...routeProps}
                    setBreadcrumb={(data: any) => {
                      handleSetBreadcrumb(data);
                    }}
                    setAuth={(authInfo: any) => {
                      props.setAuth && props.setAuth(authInfo);
                    }}
                  />
                );
              }}
            />
          );
        })}

        <Redirect exact path="/" to={{ pathname: '/login' }} />

        <Route
          render={(routeProps) => {
            let Error = errRouter[0].component;
            return <Error />;
          }}
        />
      </Switch>
    </Router>
  );
});
