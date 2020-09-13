import React, { forwardRef, useImperativeHandle } from 'react';
// import { message } from 'antd';
import './Form.scss';
import { FormItem } from './FormItem';
import { FormProps, FormContextItem } from './types';
import { useSetState } from 'ahooks';
import { FormContext } from './context';
import * as _ from 'lodash';
import { getIsValidate } from './utils';
import { AnyObj } from '@/types';

export const Form = forwardRef((props: FormProps, ref: any) => {
  const [state, setState] = useSetState<{
    [key: string]: FormContextItem;
  }>();

  //#region getFormData setFormItem handleReset handleSearch
  /**
   * @description 获取表单数据
   * @param finalValidate 默认为 true 默认校验
   */
  const getFormData = (finalValidate: boolean = true): {} | boolean => {
    const data: AnyObj = {};
    const formConfig = _.cloneDeep(props.formConfig);
    let isAllPass = true;

    _.map(formConfig, (item) => {
      const key = item.name;
      const { value, validateValue, validateItem } = state[key];
      const isValidate = getIsValidate(item.customizeValidate, item.validate);
      // 隐藏不获取数据 不校验
      if (!item.hidden) {
        if (finalValidate) {
          setState({
            [item.name]: {
              ...state[key],
              validate:
                typeof isValidate === 'object'
                  ? validateItem && validateItem()
                  : validateValue && validateValue(value)
            }
          });
        }
        data[key] = value;
      }
      return item;
    });

    for (let index = 0; index < formConfig.length; index++) {
      const element = formConfig[index];
      const key = element.name;
      const { value, validateValue, validateItem } = state[key];
      const isValidate = getIsValidate(
        element.customizeValidate,
        element.validate
      );

      if (!state[key]) {
        break;
      }
      // 隐藏不获取数据 不校验
      if (!element.hidden) {
        const validate =
          typeof isValidate === 'object'
            ? validateItem && validateItem()
            : validateValue && validateValue(value);
        if (validate) {
          isAllPass = validate.isPass;
          if (validate.isPass === false) {
            break;
          }
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

  /**
   * @description 设置表单项数据
   * @param key
   */
  const setFormItem = (key: string, value: any) => {
    const { setValue } = state[key];
    setValue && setValue(value, false);
  };

  /**
   * @description 重置表单
   */
  const handleReset = () => {
    const data: AnyObj = {};
    const formConfig = _.cloneDeep(props.formConfig);
    _.map(formConfig, (item) => {
      const key = item.name;
      data[key] = undefined;
      setFormItem(key, undefined);
      return item;
    });
    return data;
  };

  /**
   * @description handleSearch
   */
  const handleSearch = () => {
    const data = getFormData();
    return data;
  };

  //#endregion

  useImperativeHandle(ref, () => {
    return { getFormData, setFormItem, handleReset, handleSearch };
  });

  return (
    <FormContext.Provider value={state}>
      <div ref={ref} className={`custom-form ${props.formClassName}`}>
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
