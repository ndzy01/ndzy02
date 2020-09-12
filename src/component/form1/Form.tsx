import React, { forwardRef, useImperativeHandle } from 'react';
import { message } from 'antd';
import './Form.scss';
import { FormItem } from './FormItem';
import { FormProps } from './types';
import { useSetState, useMount } from 'ahooks';
import * as _ from 'lodash';
import { AnyObj } from '@/types';

export const Form = forwardRef((props: FormProps, ref: any) => {
  const [state, setState] = useSetState<{
    [key: string]: {
      getValue: (state: any) => any;
      setValue: (value: any) => void;
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
    const data: AnyObj = {};
    let isAllPass = true;
    const formConfig = _.cloneDeep(props.formConfig);

    formConfig.forEach((item) => {
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
      if (props.isShowMessage) {
        message.info('请按照要求填写表单');
      }
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
    const data: AnyObj = {};
    const formConfig = _.cloneDeep(props.formConfig);

    formConfig.forEach((item) => {
      const key = item.name;
      // TODO: 初始化表单的值
      data[key] = undefined;
      clearFormItem(key);
    });
    props.onReset && props.onReset(data);
  };

  /**
   * @description 与 table 联动
   */
  const handleSearch = () => {
    const data = getFormData();

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
    <div className={`custom-form ${props.formClassName}`}>
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
            className={`formItemWrap ${item.formItemClassName?.itemWrap}`}
            key={item.name}
            style={{ width: `${(1 / column) * 100}%` }}
          >
            <FormItem
              setParentState={setState}
              key={item.name}
              parentColumn={props.column || 1}
              {...item}
              refOther={state}
            />
          </div>
        );
      })}
    </div>
  );
});
