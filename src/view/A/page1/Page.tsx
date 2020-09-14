import React from 'react';
import { Button } from 'antd';
import { RouteChildrenProps } from 'react-router-dom';
import { useMount } from 'ahooks';
import { useLazyAxiosReq } from '@/utils/http';
// import { Form } from '@/component/form1';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}

// PageA1
export const PageA1 = (props: Props) => {
  const { data, run, loading } = useLazyAxiosReq('get');
  useMount(() => {});
  return (
    <div className="PageA1">
      {JSON.stringify(data)}
      <hr />
      <Button
        loading={loading}
        onClick={() => {
          run({
            url: '/test/get-delay'
          });
        }}
      >
        click
      </Button>
      <hr />
      <span className="text-green-500 text-4xl ">PageA1</span>
      {/* <Form></Form> */}
    </div>
  );
};
