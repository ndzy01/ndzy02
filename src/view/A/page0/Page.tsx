import React, { useRef } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useMount, useSetState } from 'ahooks';
import { Input } from 'antd';
import { Form } from '@/component/form';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}

// 函数模板页面
export const PageA0 = (props: Props) => {
  const [state, setState] = useSetState({
    value: ''
  });
  const ref: any = useRef();
  useMount(() => {});
  const getData = () => {
    console.log(ref.current.getFormData());
  };
  const getData1 = () => {
    ref.current.clearFormItem('t2');
  };
  const getData2 = () => {
    ref.current.handleReset();
  };

  return (
    <div className="Page">
      <span className="text-green-500 text-4xl ">函数模板页面</span>
      <br />

      <button
        onClick={() => {
          getData();
        }}
      >
        获取数据
      </button>
      <br />

      <button
        onClick={() => {
          getData1();
        }}
      >
        清理
      </button>
      <br />
      <button
        onClick={() => {
          getData2();
        }}
      >
        重置
      </button>
      <Form
        ref={ref}
        formConfig={[
          {
            itemStyle: {
              labelWidth: '100px',
              inputWidth: '200px'
            },
            formItemClassName: {
              itemClassName: 'A',
              itemLabelClassName: 'B',
              itemInputClassName: 'c'
            },
            name: 't1',
            label: 'AAAA',
            type: 'text',
            value: state.value,
            render: () => (
              <Input
                onChange={(e) => {
                  setState({
                    value: e.target.value
                  });
                }}
              ></Input>
            )
          },
          {
            name: 't2',
            label: 'AAAA',
            type: 'input',
            // value: '1',
            validateValueOnChange: true,
            rules: [
              {
                type: 'required',
                showErr: false
              }
            ]
          }
        ]}
      ></Form>
    </div>
  );
};
