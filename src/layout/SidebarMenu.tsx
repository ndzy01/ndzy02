import React from 'react';
import {
  Menu
  // Icon
} from 'antd';
import { RouteChildrenProps } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { MyStore } from '@/redux/store';

import { appConfig, menuRouter } from './router';
import { hasAuth } from '@/utils';

interface Props extends RouteChildrenProps, DispatchProp {
  collapsed: boolean;
  breadcrumb: any[];
  menu: {
    openKeys: string[];
    selectedKeys: string[];
  };
  auth: {}[];
  //
  [key: string]: any;
}

const mapStateToProps = (store: MyStore) => {
  const { collapsed, breadcrumb, menu, auth } = store;
  return {
    collapsed,
    breadcrumb,
    menu,
    auth
  };
};

export default connect(mapStateToProps)((props: Props) => {
  /**
   * @description 打开的菜单项
   */
  const selectedKeys = props.menu.selectedKeys.map((key) => {
    return key.split('?')[0];
  });

  /**
   * @description 设置 打开的菜单组
   * @param openKeys
   */
  const handleOpen = (openKeys: string[]) => {
    props.menuOpenkeys(Array.from(new Set(openKeys)));
  };
  /**
   * @description 设置面包屑
   * @param key
   */
  const setBreadcrumb = (key: string) => {
    const pathInfo = props.breadcrumb.find((item) => {
      return item.path === key;
    });
    // 防止重复设置
    if (pathInfo) {
      return;
    }

    menuRouter.forEach((item) => {
      if (key.includes(item.path)) {
        props.changeBreadcrumb({ path: key, name: item.title });
      }
    });
  };

  /**
   * @description 设置 选中菜单项
   * @param params
   */
  const handleMenu = (params: { key: string; selectedKeys: string[] }) => {
    props.history.push(params.key);
    props.menuSelectkeys(params.selectedKeys);
    setBreadcrumb(params.key);
  };

  // 渲染导航列表
  const renderMenu = (menu: any[]): (JSX.Element | null)[] => {
    let router = menu.map((item) => {
      // 配置隐藏的页面不在侧边栏显示
      if (item.hidden || !hasAuth(item.auth, props.auth)) {
        return null;
      }

      if (item.subMenu) {
        return (
          <Menu.SubMenu
            key={item.key}
            title={
              <span>
                {/* TODO: 图标 */}
                {/* {item.icon && item.icon.includes('icon-') ? (
                  <i className={`menu-iconfont iconfont ${item.icon}`} />
                ) : item.icon ? (
                  <Icon type={item.icon} />
                ) : null} */}
                <span>{item.title}</span>
              </span>
            }
          >
            {renderMenu(item.subMenu)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={item.key}>
          {/* TODO: 图标 */}

          {/* {item.icon && item.icon.includes('icon-') ? (
            <i className={`menu-iconfont iconfont ${item.icon}`} />
          ) : item.icon ? (
            <Icon type={item.icon} />
          ) : null} */}
          <span>{item.title}</span>
        </Menu.Item>
      );
    });

    return router;
  };
  return (
    <Menu
      className="frame-sidebar-content-menu"
      style={{ minHeight: '100%', width: '100%' }}
      mode="inline"
      theme="light"
      inlineCollapsed={props.collapsed}
      openKeys={props.menu.openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={(keys: any) => {
        handleOpen(keys);
      }}
      onSelect={(info: any) => {
        handleMenu(info);
      }}
    >
      {renderMenu(appConfig.menu)}
    </Menu>
  );
});
