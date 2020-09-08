import React from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';
import { MyStore } from '@/redux/store';

// utils
import { getOpenKeysG, getSelectKeysG } from './util';

interface Props extends RouteChildrenProps {
  breadcrumb: {
    path?: string;
    name: string;
  }[];
  collapsed: boolean;
  selectedKeys: string[];
  menuOpenkeys?: (paths: string[]) => void;
  menuSelectkeys?: (paths: string[]) => void;
}

export const Breadcrumbs = connect((state: MyStore) => {
  const { breadcrumb, collapsed, menu } = state;
  const { selectedKeys } = menu;
  return {
    breadcrumb,
    collapsed,
    selectedKeys
  };
}, {})(
  ({
    breadcrumb,
    collapsed,
    selectedKeys,
    menuOpenkeys,
    menuSelectkeys,
    history
  }: Props) => {
    /**
     * @description handleClick
     * @param path
     */
    const handleClick = (path: string | undefined) => {
      if (path) {
        history.push(path);
        menuSelectkeys && menuSelectkeys([path]);

        // 侧边栏收缩时不设置openKey
        if (!collapsed) {
          menuOpenkeys && menuOpenkeys(getOpenKeysG(path));
        }
      }
    };

    return (
      <div className="px-4">
        <Breadcrumb>
          {breadcrumb.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                <span
                  className={
                    getSelectKeysG(item.path)[0] === selectedKeys[0]
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
  }
);
