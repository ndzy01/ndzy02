import React from 'react';
import { Button } from 'antd';
import { RouteChildrenProps } from 'react-router-dom';
import { useMount, useSetState } from 'ahooks';
import { useLazyAxiosReq } from '@/utils/http';
import { TextComtext } from './TextComtext';
import { Son } from './son';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}

// PageA1
export const PageA1 = (props: Props) => {
  const { data, run, loading } = useLazyAxiosReq('get');
  const [state, setState] = useSetState({
    value: 'abc'
  });
  useMount(() => {});
  return (
    <TextComtext.Provider value={{ state, setState }}>
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
        <div>{state.value}</div>
        <hr />
        <Son />
        {/* <Form></Form> */}
      </div>
    </TextComtext.Provider>
  );
};
