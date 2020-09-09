import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useMount } from 'ahooks';
import { Form } from '@/component/form';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}

// 函数模板页面
export const PageA0 = (props: Props) => {
  useMount(() => {});
  return (
    <div className="Page">
      <span className="text-green-500 text-4xl ">函数模板页面</span>
      <Form
        formConfig={[
          {
            name: 't1',
            label: 'AAAA',
            type: 'text',
            value: '1'
          },
          {
            name: 't2',
            label: 'AAAA',
            type: 'input',
            value: '1',
            rules: [
              {
                type: 'required',
                showErr: true
              }
            ]
          }
        ]}
      ></Form>
    </div>
  );
};
