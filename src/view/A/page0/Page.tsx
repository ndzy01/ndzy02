import React, { useRef } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { useMount, useSetState, useUnmount } from 'ahooks';
import { Input } from 'antd';
// import { Form } from '@/component/form';
import { FormBase } from '@/component/form';
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
    setTimeout(() => {
      NProgress.done();
    }, 2000);
  });
  useUnmount(() => {});
  const getData = () => {
    console.log(ref.current.getFormData && ref.current.getFormData());
  };
  const getData1 = () => {
    console.log(
      ref.current.getFormItemData && ref.current.getFormItemData('t3')
    );
  };
  const getData2 = () => {
    ref.current.clearFormItems && ref.current.clearFormItems();
  };
  const getData3 = () => {
    ref.current.setFormItemData && ref.current.setFormItemData('t3', '22');
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
        获取数据项
      </button>
      <br />

      <button
        onClick={() => {
          getData3();
        }}
      >
        设置数据
      </button>
      <br />
      <button
        onClick={() => {
          getData2();
        }}
      >
        重置
      </button>
      <FormBase
        ref={ref}
        formConfig={[
          {
            name: 't3',
            label: state.isPass === 'Y' ? 'abc' : 'BBB',
            type: 'input',
            value: state.value1,
            rules: [{ type: 'required' }]
          }
        ]}
      ></FormBase>
      {/* <Form
        ref={ref}
        formClassName={'formClassName'}
        formConfig={[
          {
            name: 't1',
            label: state.isPass === 'Y' ? 'AAA' : 'BBB',
            labelShould: true,
            type: 'text',
            value: state.value,
            // onChange: (value) => {
            //   setState({
            //     value: value
            //   });
            // },
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
            ],
            hidden: state.isPass === 'Y' ? true : false
          },
          {
            name: 't2',
            type: 'select',
            label: 'select',
            selectType: {
              placeholder: '请选择',
              options: [
                {
                  label: 'AAAA',
                  value: '0'
                }
              ],
              allowClear: true
            }
          },
          // ------------------------
          {
            name: 't3',
            label: state.isPass === 'Y' ? 'abc' : 'BBB',
            type: 'input',
            value: state.value1,
            // onChange: (value) => {
            //   // 使用方式 配合内部状态 实现 属性的自由配置
            //   if (value === '22') {
            //     setState({
            //       isPass: 'Y',
            //       value1: value
            //     });
            //   } else {
            //     setState({
            //       isPass: 'N',
            //       value1: value
            //     });
            //   }
            // },
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
    */}
    </div>
  );
};
