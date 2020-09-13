import React, { useRef } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useMount, useSetState } from 'ahooks';
import { Input } from 'antd';
import { Form as Form2 } from '@/component/form2';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}

// 函数模板页面
export const PageA0 = (props: Props) => {
  const [state, setState] = useSetState({
    value: '',
    value1: '11',
    isPass: 'N'
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
      {/* {console.log(state)} */}
      <Form2
        ref={ref}
        column={3}
        // isShowMessage={true}
        formConfig={[
          {
            column: 2,
            formItemClassName: {
              itemWrap: 'AA',
              item: 'A',
              itemLabel: 'B',
              itemInput: 'c'
            },
            name: 't1',
            label: state.isPass === 'Y' ? 'AAA' : 'BBB',
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
            validate: false,
            customizeValidate: {
              // 自定义校验
              isPass: state.value !== '22',
              msg: '1111'
            },
            rules: [
              {
                type: 'required',
                showErr: true
              }
            ],
            hidden: state.isPass === 'Y' ? true : false
          },
          {
            name: 't2',
            label: state.isPass === 'Y' ? 'abc' : 'BBB',
            type: 'input',
            value: state.value1,
            validate: false,
            customizeValidate: {
              // 自定义校验
              isPass: state.value1 !== '22',
              msg: '1111'
            },
            onChange: (value) => {
              // 使用方式 配合内部状态 实现 属性的自由配置
              if (value === '22') {
                setState({
                  isPass: 'Y',
                  value1: value
                });
              } else {
                setState({
                  isPass: 'N',
                  value1: value
                });
              }
              // 获取 当前的数据
              // console.log(ref.current.getFormData());
              // console.log(ref.current.getFormData(false));
            },
            rules:
              state.isPass !== 'Y'
                ? [
                    {
                      type: 'required',
                      showErr: true
                    }
                  ]
                : []
          }
        ]}
      ></Form2>
    </div>
  );
};
