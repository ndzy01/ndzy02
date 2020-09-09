import React, { useState } from 'react';
import './Frame.scss';
import { connect, DispatchProp } from 'react-redux';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { RouteChildrenProps } from 'react-router-dom';
import PS from 'perfect-scrollbar';
import { throttle } from 'underscore';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { useMount, useUnmount } from 'ahooks';

import SidebarMenu from './SidebarMenu';
import Tabs from './Tabs';
import { Breadcrumbs } from './Breadcrumbs';

import { RootProps } from './Root';

// utils
import { getOpenKeysG } from '@/utils';

import { MyStore } from '@/redux/store';

interface Props extends RootProps, RouteChildrenProps, DispatchProp {
  collapsed: boolean;
  selectedKeys: string[];
  changeCollapsed?: (collapsed: boolean) => void;
  menuOpenkeys?: (paths: string[]) => void;
  [propsName: string]: any;
}

export default connect((state: MyStore) => {
  const { collapsed, menu } = state;
  const { selectedKeys } = menu;
  return {
    collapsed,
    selectedKeys
  };
}, {})((props: Props) => {
  const { collapsed, headerHeight } = props;
  const sidebarWidth = collapsed ? 88 : 236; //侧边栏收缩和展开的宽度
  const [menuScroll, setMenuScroll] = useState<any>();

  const handleCollapsedBtn = () => {
    props.changeCollapsed && props.changeCollapsed(!props.collapsed);
    if (props.collapsed) {
      props.menuOpenkeys &&
        props.menuOpenkeys(getOpenKeysG(props.selectedKeys[0]));
    } else {
      props.menuOpenkeys && props.menuOpenkeys([]);
    }
  };

  const setScrollbar = () => {
    try {
      const scrollNode = document.getElementById('menu-scrollbar');

      if (scrollNode) {
        setMenuScroll(new PS(scrollNode, { suppressScrollX: true }));
      }
    } catch (e) {
      // IE9不支持 PerfectScrollbar
    }

    window.onresize = throttle(() => {
      try {
        menuScroll.update();
      } catch (err) {
        // IE9不支持 PerfectScrollbar
      }
    }, 300);
  };
  useMount(() => {
    setScrollbar();
  });
  useUnmount(() => {
    window.onresize = null;
    menuScroll.destroy();
    setMenuScroll(null);
  });
  return (
    <div className="frame">
      {/* left */}
      <div className="frame-sidebar" style={{ width: sidebarWidth }}>
        <div className="frame-sidebar-wrap">
          {/* logo */}
          <div className="relative" style={{ height: headerHeight }}>
            {props.logo(props.collapsed)}
          </div>
          {/* 导航菜单 */}
          <div
            id="menu-scrollbar"
            className="frame-sidebar-content"
            style={{ height: `calc(100% - ${headerHeight + 40}px)` }}
          >
            <SidebarMenu {...props} />
          </div>
          {/* 收缩按钮 */}
          <div className="h-8 w-full text-center">
            <span className=" text-2xl">
              {collapsed ? (
                <MenuUnfoldOutlined
                  onClick={() => {
                    handleCollapsedBtn();
                  }}
                />
              ) : (
                <MenuFoldOutlined
                  onClick={() => {
                    handleCollapsedBtn();
                  }}
                />
              )}
            </span>
          </div>
        </div>
      </div>
      {/* right */}
      <div
        className=" h-full absolute top-0"
        style={{
          width: `calc(100% - ${sidebarWidth}px)`,
          left: sidebarWidth
        }}
      >
        {/* 头部 */}
        <div
          className="w-full overflow-hidden relative bg-white border-b  p-4"
          style={{ height: headerHeight }}
        >
          {props.headerComponent}
        </div>
        {/* 头部导航栏 */}
        <div className="w-full overflow-hidden" style={{ height: 40 }}>
          {props.navType === 'tab' && <Tabs {...props} />}
          {props.navType === 'breadcrumb' && <Breadcrumbs {...props} />}
        </div>

        {/* 页面主体 */}
        <div
          className="w-full p-4 overflow-hidden"
          style={{ height: `calc(100% - ${headerHeight + 40}px)` }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
});
