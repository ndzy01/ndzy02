import React, { forwardRef, useImperativeHandle } from 'react';
import '@/component/form/Form.scss';
import { FormContext, FormItem } from '@/component/form';
import { useSetState, useMount, useUpdateEffect } from 'ahooks';
import * as _ from 'lodash';

export const Form = forwardRef((props: FormProps, ref: any) => {
  const [formItems, setFormItems] = useSetState<{
    [key: string]: FormContextItem;
  }>({});

  const [state, setState] = useSetState<{
    column?: number;
    formClassName?: string;
    formStyles?: AnyObj;
    formConfig: FormConfig[];
  }>({
    column: undefined,
    formClassName: undefined,
    formStyles: undefined,
    formConfig: []
  });

  const getFormData = (validate: boolean = true): {} | boolean => {
    const data: AnyObj = {};
    const formConfig = _.cloneDeep(props.formConfig);
    let isAllPass = true;

    _.map(formConfig, (item) => {
      const key = item.name;
      const { validateValue, value } = formItems[key];
      // 隐藏不获取数据 不校验
      if (!item.hidden) {
        if (validate) {
          validateValue && validateValue(value);
        }
        data[key] = value;
      }
      return item;
    });

    for (let index = 0; index < formConfig.length; index++) {
      const element = formConfig[index];
      const key = element.name;
      const { validate } = formItems[key];

      if (!formItems[key]) {
        break;
      }
      // 隐藏不获取数据 不校验
      if (!element.hidden) {
        if (validate) {
          isAllPass = validate.isPass;
          if (validate.isPass === false) {
            break;
          }
        }
      }
    }
    if (!isAllPass) {
      if (validate) {
        return false;
      }
      return data;
    }
    return data;
  };
  const getFormItemData = (
    key: string,
    validate: boolean = true
  ): {} | boolean => {
    const data: AnyObj = {};
    if (!formItems[key]) {
      return false;
    }
    const { validateValue, value } = formItems[key];
    data[key] = value;
    if (validate) {
      validateValue && validateValue(value);
    }
    return data;
  };
  const setFormItemData = (key: string, value: any) => {
    if (formItems[key]) {
      const { setValue } = formItems[key];
      setValue && setValue(value);
    }
  };

  useMount(() => {
    setState({
      column: props?.column,
      formClassName: props?.formClassName,
      formStyles: props?.formStyles,
      formConfig: props?.formConfig
    });
  });
  useUpdateEffect(() => {
    setState({
      column: props?.column,
      formClassName: props?.formClassName,
      formStyles: props?.formStyles,
      formConfig: props?.formConfig
    });
  }, [props]);
  useImperativeHandle(ref, () => {
    return { getFormData, getFormItemData, setFormItemData };
  });
  return (
    <FormContext.Provider value={formItems}>
      <div
        ref={ref}
        style={{ ...(state?.formStyles ?? {}) }}
        className={`custom-form ${state?.formClassName ?? ''}`}
      >
        {state?.formConfig?.map((item) => {
          // 如果有 hidden 属性 不渲染
          if (item?.hidden) {
            return null;
          }

          let column = state?.column ?? 1;

          if (item.column && item.column <= column) {
            column = column / item.column;
          }
          const styleObj = { width: `${(1 / column) * 100}%` };
          return (
            <div
              style={{ ...styleObj, ...(item?.formItemStyle?.itemWrap ?? {}) }}
              className={`custom-form-wrap ${
                item?.formItemClassName?.itemWrap ?? ''
              }`}
              key={item.name}
            >
              <FormItem
                key={item.name}
                setParentState={setFormItems}
                parentColumn={state?.column ?? 1}
                formState={formItems}
                {...item}
              />
            </div>
          );
        }) ?? null}
      </div>
    </FormContext.Provider>
  );
});
