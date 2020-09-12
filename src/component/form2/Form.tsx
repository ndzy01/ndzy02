import React, { forwardRef, useImperativeHandle } from 'react';
// import { message } from 'antd';
import './Form.scss';
import { FormItem } from './FormItem';
import { FormProps, FormContextItem } from './types';
import { useSetState } from 'ahooks';
import { FormContext } from './context';
import * as _ from 'lodash';
import { AnyObj } from '@/types';

export const Form = forwardRef((props: FormProps, ref: any) => {
  const [state, setState] = useSetState<{
    [key: string]: FormContextItem;
  }>();

  //#region getFormData
  /**
   * @description 获取表单数据
   * @param isValidate
   */
  const getFormData = (finalValidate: boolean = true): {} | boolean => {
    const data: AnyObj = {};
    const formConfig = _.cloneDeep(props.formConfig);
    let isAllPass = true;

    _.map(formConfig, (item) => {
      const key = item.name;
      const { value, validateValue } = state[key];
      if (finalValidate) {
        setState({
          [item.name]: {
            ...state[key],
            validate: validateValue && validateValue(value)
          }
        });
      }
      data[key] = value;
      return item;
    });

    for (let index = 0; index < formConfig.length; index++) {
      const element = formConfig[index];
      const key = element.name;
      const { value, validateValue } = state[key];

      if (!state[key]) {
        break;
      }
      const validate = validateValue && validateValue(value);
      if (validate) {
        isAllPass = validate.isPass;
        if (validate.isPass === false) {
          break;
        }
      }
    }

    if (!isAllPass) {
      if (!finalValidate) {
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
