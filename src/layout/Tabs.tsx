import React, { MouseEvent, useRef } from 'react';
import './Tab.scss';
import { connect } from 'react-redux';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { RouteChildrenProps } from 'react-router-dom';
import { MyStore } from '@/redux/store';
import { historyHash as history } from '@/utils';
import { useMount, useSetState } from 'ahooks';

// utils
import { getOpenKeysG } from '@/utils';

interface Props extends RouteChildrenProps {
  breadcrumb: any[];
  selectedKeys: string[];
  collapsed: boolean;
  resetBreadcrumb?: (
    breadcrums: {
      path?: string;
      name: string;
    }[]
  ) => void;
  menuOpenkeys?: (paths: string[]) => void;
  menuSelectkeys?: (paths: string[]) => void;
}

const mapStateToProps = (store: MyStore) => {
  const { breadcrumb, menu, collapsed } = store;
  const { selectedKeys } = menu;

  return {
    breadcrumb,
    selectedKeys,
    collapsed
  };
};

export default connect(
  mapStateToProps,
  {}
)((props: Props) => {
  const moveNode = useRef<any>();
  const fixedNode = useRef<any>();
  const [state, setState] = useSetState({
    left: 1,
    rightBtn: true,
    leftBtn: true,
    handleClickPath: ''
  });

  /**
   * @description 点击
   * @param path
   */
  const handleClick = (path: string) => {
    setState({ handleClickPath: path });
    // setHandleClickPath(path);

    history.push(path);
    props.menuSelectkeys && props.menuSelectkeys([path]);

    // 侧边栏收缩时不设置openKey
    if (!props.collapsed) {
      props.menuOpenkeys && props.menuOpenkeys(getOpenKeysG(path));
    }
  };

  /**
   * @description
   * @param path
   * @param e
   */
  const handleCloseTab = (path: string, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let closeIndex = 0;
    const newBreadcrumb = props.breadcrumb.filter((item, index) => {
      if (item.path === path) {
        closeIndex = index;
      }
      return item.path !== path;
    });
    // 删除的是选中的tab时才重设openKey和selectKey
    if (props.selectedKeys.includes(path)) {
      let newPath = '';
      if (closeIndex - 1 > -1) {
        newPath = newBreadcrumb[closeIndex - 1].path;
      } else {
        newPath = newBreadcrumb[closeIndex].path;
      }

      // 侧边栏收缩时不设置openKey
      if (!props.collapsed) {
        props.menuOpenkeys && props.menuOpenkeys(getOpenKeysG(newPath));
      }
      props.menuSelectkeys && props.menuSelectkeys([newPath]);

      props.history.push(newPath);
    }
    props.resetBreadcrumb && props.resetBreadcrumb(newBreadcrumb);
  };

  const getNodeNum = () => {
    let fixedLeft = 0;
    let moveLeft = 0;
    let fixedW = 0;
    let moveW = 0;

    if (fixedNode.current) {
      const { left, width } = fixedNode.current.getBoundingClientRect();
      fixedLeft = left;
      fixedW = width;
    }

    if (moveNode.current) {
      const { left, width } = moveNode.current.getBoundingClientRect();
      moveLeft = left;
      moveW = width;
    }

    return {
      fixedLeft,
      moveLeft,
      fixedW,
      moveW
    };
  };

  const setTabsPosition = () => {
    const { fixedW, moveW } = getNodeNum();

    let len = fixedW - moveW;
    let nextLeft = len < 0 ? len : 1;
    setState({
      left: nextLeft,
      leftBtn: nextLeft < 0,
      rightBtn: nextLeft > fixedW - moveW
    });
  };

  const moveLeft = () => {
    if (!state.leftBtn) {
      return;
    }

    const { moveLeft, fixedW, moveW } = getNodeNum();

    let nextLeft = moveLeft + fixedW;
    let leftBtn_ = true;

    if (nextLeft > 0) {
      nextLeft = 1;
      leftBtn_ = false;
    }

    setState({
      left: nextLeft,
      leftBtn: leftBtn_,
      rightBtn: nextLeft > fixedW - moveW
    });
  };

  const moveRight = () => {
    if (!state.rightBtn) {
      return;
    }

    const { moveLeft, fixedW, moveW } = getNodeNum();

    let nextLeft = moveLeft - fixedW;
    let rightBtn_ = true;

    if (nextLeft < fixedW - moveW) {
      nextLeft = fixedW - moveW;
      rightBtn_ = false;
    }

    setState({
      left: nextLeft,
      leftBtn: nextLeft < 0,
      rightBtn: rightBtn_
    });
  };

  useMount(() => {
    setTabsPosition();
  });

  return (
    <div className="custom-tabs relative overflow-auto c-p-t-4 c-p-x-28 h-full w-full bg-white">
      <span>
        <LeftOutlined
          className={`custom-tabs-left absolute ${
            state.leftBtn ? '' : 'custom-tabs-notActive'
          }`}
          onClick={() => {
            moveLeft();
          }}
        />

        <RightOutlined
          className={`custom-tabs-right absolute ${
            state.rightBtn ? '' : 'custom-tabs-notActive'
          }`}
          onClick={() => {
            moveRight();
          }}
        />
      </span>
      <div className="custom-tabs-wrap" ref={fixedNode}>
        <div
          className="custom-tabs-wrap-move"
          ref={moveNode}
          style={{ transform: `translateX(${state.left}px)` }}
        >
          {props.breadcrumb.map((item) => {
            let bool: boolean = item.path === props.selectedKeys[0];

            return (
              <div
                className={`custom-tabs-wrap-move-item ${
                  bool ? 'custom-tabs-active' : ''
                }`}
                key={item.path}
                onClick={() => {
                  if (item.path !== state.handleClickPath) {
                    handleClick(item.path);
                  }
                }}
              >
                {!bool && (
                  <span className="custom-tabs-wrap-move-item-line"></span>
                )}

                <span className="custom-tabs-wrap-move-item-text">
                  {item.name}
                </span>

                {/* 只是一个tab时不显示删除按钮 */}
                {props.breadcrumb.length > 1 && (
                  <CloseOutlined
                    className="custom-tabs-wrap-move-item-close-icon"
                    onClick={(e: MouseEvent) => {
                      handleCloseTab(item.path, e);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
