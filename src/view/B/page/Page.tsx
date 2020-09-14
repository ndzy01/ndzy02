import React, { Component } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { InitState, InitProps } from '@/types';

interface Props extends RouteChildrenProps, InitProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}
interface State extends InitState {
  [propName: string]: any;
}

// class 模板页面
export class PageB extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setBreadcrumb();
  }

  render() {
    return <div className="Page"></div>;
  }

  // 设置面包屑参数
  setBreadcrumb() {
    // breadcrumb形式设置格式
    // let arr = [
    //   { name: '面包屑名称1' },
    //   { path: '/a/a', name: '面包屑名称2' }
    // ];
    // this.props.setBreadcrumb(arr);
    // tab形式设置格式
    // this.props.setBreadcrumb('/moduleA/page3?a=1&b=2');
  }
}
