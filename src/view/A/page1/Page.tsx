import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useMount } from 'ahooks';
// import { Form } from '@/component/form1';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}

// PageA1
export const PageA1 = (props: Props) => {
  useMount(() => {});
  return (
    <div className="PageA1">
      <span className="text-green-500 text-4xl ">PageA1</span>
      {/* <Form></Form> */}
    </div>
  );
};
