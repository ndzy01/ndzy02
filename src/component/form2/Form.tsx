import React, { forwardRef, useImperativeHandle } from 'react';
import { message } from 'antd';
import './Form.scss';
import { FormItem } from './FormItem';
import { FormProps } from './types';
import { useSetState } from 'ahooks';
import { FormContext } from './context';
import * as _ from 'lodash';
import { AnyObj } from '@/types';

export const Form = forwardRef((props: FormProps, ref: any) => {
  const [state, setState] = useSetState<{
    [key: string]: {
      defaultValue?: string;
      value?: string;
      validate?: {
        isPass: boolean;
        msg: string;
      };
      mount?: boolean;
      getValue?: (isValidate: boolean) => any;
      setValue?: (value: any, isValidate?: boolean) => void;
    };
  }>();

  //#region getFormData
  /**
   * @description 获取表单数据
   * @param isValidate
   */
  const getFormData = (isValidate: boolean = true): {} | boolean => {
    const data: AnyObj = {};
    const formConfig = _.cloneDeep(props.formConfig);
    let isAllPass = true;

    _.map(formConfig, (item) => {
      const key = item.name;
      const { value } = state[key];
      data[key] = value;
      return item;
    });

    for (let index = 0; index < formConfig.length; index++) {
      const element = formConfig[index];
      const key = element.name;

      if (!state[key]) {
        break;
      }
      const { validate } = state[key];
      if (validate) {
        isAllPass = validate.isPass;
        if (validate.isPass === false) {
          break;
        }
      }
    }

    if (!isAllPass) {
      if (!isValidate) {
        return data;
      }
      return false;
    }

    return data;
  };

  //#endregion
  useImperativeHandle(ref, () => {
    return { getFormData };
  });

  return (
    <FormContext.Provider value={state}>
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
              className={`formItemWrap ${
                item.formItemClassName && item.formItemClassName.itemWrap
              }`}
              key={item.name}
              style={{ width: `${(1 / column) * 100}%` }}
            >
              <FormItem
                setParentState={setState}
                key={item.name}
                parentColumn={props.column || 1}
                refOther={state}
                {...item}
              />
            </div>
          );
        })}
      </div>
    </FormContext.Provider>
  );
});
