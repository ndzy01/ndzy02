import React, { forwardRef, useImperativeHandle } from 'react';
import './Form.scss';
import { FormItem } from './FormItem';
import { Button } from 'antd';
import { FormProps } from './types';
import { useSetState, useMount } from 'ahooks';

export const Form = forwardRef((props: FormProps, ref: any) => {
  const [state, setState] = useSetState<{
    [key: string]: {
      getValue: any;
      setValue: any;
    };
  }>({});

  useMount(() => {
    //
  });
  //#region
  /**
   * @description 获取表单数据
   * @param isValidate
   */
  const getFormData = (isValidate: boolean = true): {} | boolean => {
    let data: { [propName: string]: any } = {};
    let isAllPass = true;

    props.formConfig.forEach((item) => {
      let key = item.name;

      if (!state[key]) {
        return;
      }

      const value = state[key].getValue(isValidate);

      data[key] = value;

      if (value === false) {
        isAllPass = false;
      }
    });

    if (!isAllPass) {
      return false;
    }

    return data;
  };
  /**
   * @description 清理表单项
   * @param key
   */
  const clearFormItem = (key: string) => {
    if (key && state[key]) {
      state[key].setValue(undefined);
    }
  };
  /**
   * @description 重置表单
   */
  const handleReset = () => {
    let data: { [propName: string]: any } = {};

    props.formConfig.forEach((item) => {
      let key = item.name;

      data[key] = '';

      clearFormItem(key);
    });

    props.onReset && props.onReset(data);
  };
  /**
   * @description 与 table 联动
   */
  const handleSearch = () => {
    let data = getFormData();

    props.onSearch && props.onSearch(data);
  };
  //#endregion
  useImperativeHandle(ref, () => {
    return {
      getFormData,
      clearFormItem,
      handleReset,
      handleSearch
    };
  });
  return (
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
            className={`formItemWrap ${props.formItemClassName}`}
            key={item.name}
            style={{ width: `${(1 / column) * 100}%` }}
          >
            <FormItem
              setParentState={(state) => {
                setState(state);
              }}
              // content={content[item.name]}
              key={item.name}
              parentColumn={props.column || 1}
              {...item}
              refBrother={state[item.name]}
              labelWidth={props.labelWidth || 30}
              inputWidth={props.inputWidth || 70}
            />
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
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </div>
        </div>
      )}
    </div>
  );
});
