import React, { useRef } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useMount, useSetState, useUnmount } from 'ahooks';
import { Input } from 'antd';
import { FormRef } from '@/component/form2/types';
import { Form as Form2 } from '@/component/form2';
import { Form } from '@/component/form';
import { useCreation } from 'ahooks';
import NProgress from 'nprogress';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}
const Foo = () => {
  return <div>{Math.random()}</div>;
};

// 函数模板页面
export const PageA0 = (props: Props) => {
  const foo = useCreation(() => Foo(), []);
  const [state, setState] = useSetState({
    value: '',
    value1: '',
    isPass: 'N'
  });
  const ref: FormRef = useRef({});
  useMount(() => {
    NProgress.start();
  });
  useUnmount(() => {
    NProgress.done();
  });
  const getData = () => {
    // console.log(ref.current.getFormData && ref.current.getFormData());
  };
  const getData1 = () => {
    // ref.current.setFormItem && ref.current.setFormItem('t2', '111');
  };
  const getData2 = () => {
    // ref.current.handleReset && ref.current.handleReset();
  };
  const getData3 = () => {
    // ref.current.handleReset && ref.current.handleReset();

    setState({
      value: ''
    });
  };

  return (
    <div className="Page">
      {foo}
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
          getData3();
        }}
      >
        清理所有
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
      <Form
        column={3}
        formClassName={'formClassName'}
        formConfig={[
          {
            column: 2,
            formItemStyle: {
              itemInput: { width: '50%' }
            },
            formItemClassName: {
              itemWrap: 'AA',
              item: 'A',
              itemLabel: 'B',
              itemInput: 'C',
              itemInputValidate: state.value === '22' ? 'c' : ''
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
            // customizeValidate: {
            //   // 自定义校验
            //   isPass: state.value !== '22',
            //   msg: '1111'
            // },
            rules: [
              {
                type: 'required',
                showErr: true
              }
            ],
            hidden: state.isPass === 'Y' ? true : false
          },
          // ------------------------
          {
            name: 't3',
            label: state.isPass === 'Y' ? 'abc' : 'BBB',
            type: 'input',
            value: state.value1,
            // customizeValidate: {
            //   // 自定义校验
            //   isPass: state.value1 !== '22',
            //   msg: '1111'
            // },
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
                      showErr: true,
                      validate: (value: any) => {
                        if (value > 10) {
                          return {
                            isPass: false,
                            msg: '111111111111111111'
                          };
                        }

                        return {
                          isPass: true,
                          msg: ''
                        };
                      }
                    }
                  ]
                : []
          }
        ]}
      ></Form>
      <Form2
        ref={ref}
        column={3}
        formClassName={'formClassName'}
        // isShowMessage={true}
        formConfig={[
          {
            column: 2,
            formItemClassName: {
              itemWrap: 'AA',
              item: 'A',
              itemLabel: 'B',
              itemInput: 'C',
              itemInputValidateErr: state.value === '22' ? 'c' : ''
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
            // customizeValidate: {
            //   // 自定义校验
            //   isPass: state.value !== '22',
            //   msg: '1111'
            // },
            rules: [
              {
                type: 'required',
                showErr: true
              }
            ],
            hidden: state.isPass === 'Y' ? true : false
          },
          // ------------------------
          {
            name: 't2',
            label: state.isPass === 'Y' ? 'abc' : 'BBB',
            type: 'input',
            value: state.value1,
            validate: true,
            // customizeValidate: {
            //   // 自定义校验
            //   isPass: state.value1 !== '22',
            //   msg: '1111'
            // },
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
