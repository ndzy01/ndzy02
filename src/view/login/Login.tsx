import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { Button } from 'antd';
import { useMount } from 'ahooks';
import { connect, DispatchProp } from 'react-redux';

interface Props extends RouteChildrenProps, DispatchProp {
  // 设置面包屑 有两种形式
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}

const Login = (props: Props) => {
  const handleLogin = () => {
    const authInfo = [{ auth: '张一', name: '111' }];
    const path = '/A/page0';
    props.setBreadcrumb(path);
    props.setAuth(authInfo);
    props.history.push(path);
  };
  useMount(() => {});
  return (
    <div className="h-full flex justify-center items-center">
      <Button
        type="primary"
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default connect()(Login);
