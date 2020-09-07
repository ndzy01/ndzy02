import React from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';
import { menuOpenkeys, menuSelectkeys } from '@/redux/reducer';
import { ActionFunctionAny } from 'redux-actions';
import { Action } from 'redux';
import { MyStore } from '@/redux/store';

// utils
import { getOpenKeysG, getSelectKeysG } from './util';

interface Props extends RouteChildrenProps {
  breadcrumb: any[];
  collapsed: boolean;
  selectedKeys: string[];
  menuOpenkeys?: ActionFunctionAny<Action<any>>;
  menuSelectkeys?: ActionFunctionAny<Action<any>>;
}

export default connect(
  (state: MyStore) => {
    const { breadcrumb, collapsed, menu } = state;
    const { selectedKeys } = menu;
    return {
      breadcrumb,
      collapsed,
      selectedKeys
    };
  },
  { menuOpenkeys, menuSelectkeys }
)((props: Props) => {
  const handleClick = (path: string) => {
    if (path) {
      props.history.push(path);
      props.menuSelectkeys && props.menuSelectkeys([path]);

      // 侧边栏收缩时不设置openKey
      if (!props.collapsed) {
        props.menuOpenkeys && props.menuOpenkeys(getOpenKeysG(path));
      }
    }
  };

  return (
    <div className="px-4">
      <Breadcrumb>
        {props.breadcrumb.map((item, index) => {
          return (
            <Breadcrumb.Item key={index}>
              <span
                className={
                  getSelectKeysG(item.path)[0] === props.selectedKeys[0]
                    ? 'text-blue-600'
                    : ''
                }
                onClick={() => {
                  handleClick(item.path);
                }}
              >
                {item.name}
              </span>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
});
