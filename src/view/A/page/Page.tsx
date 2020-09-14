import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}
// 函数模板页面
export const PageA = (props: Props) => {
  return <div className="Page"></div>;
};
