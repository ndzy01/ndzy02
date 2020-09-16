import React, { forwardRef, useImperativeHandle } from 'react';
import '@/component/form/Form.scss';
import { FormContext, FormItem } from '@/component/form';

import { useSetState, useMount, useUpdateEffect } from 'ahooks';
import { AnyObj } from '@/types';

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
