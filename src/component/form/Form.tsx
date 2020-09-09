import React, { useEffect, createContext } from 'react';
import { FormItem } from './FormItem';
import { Button } from 'antd';
import { FormProps } from './types';
import { useSetState } from 'ahooks';

const FormContext = createContext({});

export const Form = (props: FormProps) => {
  const [state, setState] = useSetState<{
    [key: string]: {
      getValue: any;
    };
  }>({});

  useEffect(() => {
    console.log(state['t1'] && state['t1'].getValue());
  });
  return (
    <FormContext.Provider value={state}>
      <div className="custom-form">
        {props.formConfig.map((item) => {
          if (item.hidden) {
            return null;
          }

          let column = props.column || 1;

          if (item.column && item.column <= column) {
            column = column / item.column;
          }

          return (
            <div
              className={`formItemWrap ${props.className}`}
              key={item.name}
              style={{ width: `${(1 / column) * 100}%` }}
            >
              <FormContext.Consumer>
                {(content: { [key: string]: any }) => (
                  <FormItem
                    setParentState={(state) => {
                      setState(state);
                    }}
                    content={content[item.name]}
                    key={item.name}
                    parentColumn={props.column || 1}
                    {...item}
                    refBrother={content[item.name]}
                    labelWidth={props.labelWidth || 30}
                    inputWidth={props.inputWidth || 70}
                    itemStyle={props.itemStyle}
                  />
                )}
              </FormContext.Consumer>
            </div>
          );
        })}

        {props.hasBtn && (
          <div
            style={{ width: `${(1 / (props.column || 1)) * 100}%` }}
            className="formItemWrap"
          >
            <div style={{ paddingLeft: '10%' }} className="formItem">
              <Button
                style={{ marginRight: 10 }}
                type="primary"
                // onClick={handleSearch.bind(this)}
              >
                搜索
              </Button>
              <Button
              // onClick={handleReset.bind(this)}
              >
                重置
              </Button>
            </div>
          </div>
        )}
      </div>
    </FormContext.Provider>
  );

  // getFormData(isValidate: boolean = true): {} | boolean {
  //   let data: { [propName: string]: any } = {};
  //   let isAllPass = true;

  //   props.formConfig.forEach((item) => {
  //     let key = item.name;
  //     if (!itemRef[key]) {
  //       return;
  //     }

  //     let value = itemRef[key].getValue(isValidate);

  //     data[key] = value;

  //     if (value === false) {
  //       isAllPass = false;
  //     }
  //   });

  //   if (!isAllPass) {
  //     return false;
  //   }

  //   return data;
  // }

  // // 点击搜索按钮
  // handleSearch() {
  //   let data = getFormData();

  //   props.onSearch && props.onSearch(data);
  // }

  // // 点击重置按钮,或父级调用
  // handleReset() {
  //   let data: { [propName: string]: any } = {};

  //   props.formConfig.forEach((item) => {
  //     let key = item.name;

  //     data[key] = '';

  //     clearFormItem(key);
  //   });

  //   props.onReset && props.onReset(data);
  // }

  // // 父级可以调用
  // clearFormItem(key: string) {
  //   if (key && itemRef[key]) {
  //     itemRef[key].setValue(undefined);
  //   }
  // }
};
