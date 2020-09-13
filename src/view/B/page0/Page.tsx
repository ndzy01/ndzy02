import React, { Component, createRef } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { InitState, InitProps } from '@/types';
import { FormRef } from '@/component/form2/types';
import { Form as Form2 } from '@/component/form2';

interface Props extends RouteChildrenProps, InitProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}
interface State extends InitState {
  [propName: string]: any;
}

// class 模板页面
export class PageB0 extends Component<Props, State> {
  formRef: FormRef;
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.formRef = createRef<any>();
  }

  componentDidMount() {
    this.setBreadcrumb();
  }

  render() {
    console.log(this.formRef);
    return (
      <div className="Page">
        <span className="text-green-500 text-4xl ">class模板页面</span>
        <button
          onClick={() => {
            // console.log(
            //   this.formRef.current.getFormData &&
            //     this.formRef.current.getFormData()
            // );
            this.formRef.current.setFormItem &&
              this.formRef.current.setFormItem('t2', undefined);
          }}
        >
          获取数据
        </button>
        <Form2
          ref={this.formRef}
          column={3}
          formClassName={'formClassName'}
          // isShowMessage={true}
          formConfig={[
            // ------------------------
            {
              name: 't2',
              label: 'BBB',
              type: 'input',
              value: '11',
              validate: true,
              // customizeValidate: {
              //   // 自定义校验
              //   isPass: state.value1 !== '22',
              //   msg: '1111'
              // },
              onChange: (value) => {
                // 使用方式 配合内部状态 实现 属性的自由配置
                // 获取 当前的数据
                // console.log(ref.current.getFormData());
                // console.log(ref.current.getFormData(false));
              },
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
  }

  // 设置面包屑参数
  setBreadcrumb() {
    // breadcrumb形式设置格式
    // let arr = [
    //   { name: '面包屑名称1' },
    //   { path: '/a/a', name: '面包屑名称2' }
    // ];
    // this.props.setBreadcrumb(arr);
    // tab形式设置格式
    // this.props.setBreadcrumb('/moduleA/page3?a=1&b=2');
  }
}
