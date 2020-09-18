import React, { Component, createRef } from 'react';
import { RouteChildrenProps } from 'react-router-dom';

interface Props extends RouteChildrenProps, InitProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuth: (authInfo: any) => void;
}
interface State extends InitState {
  [propName: string]: any;
  validate: boolean;
}

// class 模板页面
export class PageB0 extends Component<Props, State> {
  formRef: FormRef;
  constructor(props: Props) {
    super(props);
    this.state = { validate: true };
    this.formRef = createRef<any>();
  }

  componentDidMount() {
    this.setBreadcrumb();
  }

  render() {
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
