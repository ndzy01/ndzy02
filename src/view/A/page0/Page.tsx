import React, { useRef } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useMount, useSetState } from 'ahooks';
import { Input } from 'antd';
// import { Form } from '@/component/form';
import { Form as Form1 } from '@/component/form1';
import { Form as Form2 } from '@/component/form2';

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

      {/* <Form1
        ref={ref}
        // isShowMessage={true}
        formConfig={[
          {
            // formItemStyle: {
            //   labelWidth: 1,
            //   inputWidth: 2
            // },
            formItemClassName: {
              itemWrap: 'AA',
              item: 'A',
              itemLabel: 'B',
              itemInput: 'c'
            },
            name: 't1',
            label: 'AAAA',
            labelShould: true,
            type: 'text',
            value: state.value,
            textType: {
              render: () => (
                <>
                  <Input
                    value={state.value}
                    onChange={(e) => {
                      setState({
                        value: e.target.value
                      });
                    }}
                  ></Input>
                </>
              )
            },
            rules: [
              {
                type: 'required',
                showErr: true
              }
            ]
          },
          {
            name: 't2',
            label: 'AAAA',
            type: 'input',
            value: '1',
            validateValueOnChange: true,
            rules: [
              {
                type: 'required',
                showErr: true
              }
            ]
          }
        ]}
      ></Form1> */}

      <Form2
        ref={ref}
        // isShowMessage={true}
        formConfig={[
          {
            // formItemStyle: {
            //   labelWidth: 1,
            //   inputWidth: 2
            // },
            formItemClassName: {
              itemWrap: 'AA',
              item: 'A',
              itemLabel: 'B',
              itemInput: 'c'
            },
            name: 't1',
            label: 'AAAA',
            labelShould: true,
            type: 'text',
            value: state.value,
            textType: {
              render: () => (
                <>
                  <Input
                    value={state.value}
                    onChange={(e) => {
                      setState({
                        value: e.target.value
                      });
                    }}
                  ></Input>
                </>
              )
            },
            validate: true,
            rules: [
              {
                type: 'required',
                showErr: true
              }
            ]
          },
          {
            name: 't2',
            label: 'AAAA',
            type: 'input',
            value: '1',
            validate: true,
            rules: [
              {
                type: 'required',
                showErr: true
              }
            ]
          }
        ]}
      ></Form2>
    </div>
  );
};
