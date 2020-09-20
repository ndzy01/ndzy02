import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { FormProps } from '@/component/form/form-types';
import { FormItem } from '@/component/form';
import '@/component/form/form.scss';

export const FormBase = forwardRef((props: FormProps, ref: any) => {
  const itemRefs: AnyObj = {};
  props.formConfig.forEach((item) => {
    itemRefs[item.name] = useRef();
  });

  const getFormData = (isValidate: boolean = true): {} | boolean => {
    const data: AnyObj = {};
    let isAllPass = true;

    props.formConfig.forEach((item) => {
      if (!itemRefs[item.name]) {
        return;
      }
      console.log(itemRefs[item.name]);

      const value =
        itemRefs[item.name].current.getValue &&
        itemRefs[item.name].current.getValue(isValidate);

      data[item.name] = value;

      if (value === false) {
        isAllPass = false;
      }
    });

    if (!isAllPass) {
      return false;
    }

    return data;
  };
  useImperativeHandle(ref, () => {
    return {
      getFormData
    };
  });
  return (
    <React.Fragment>
      <div
        style={{ ...(props?.formStyles ?? {}) }}
        className={`custom-form ${props?.formClassName ?? ''}`}
      >
        {props?.formConfig?.map((item) => {
          // 如果有 hidden 属性 不渲染
          if (item?.hidden) {
            return null;
          }

          let column = props?.column ?? 1;

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
                ref={itemRefs[item.name]}
                key={item.name}
                parentColumn={props?.column ?? 1}
                {...item}
              />
            </div>
          );
        }) ?? null}
      </div>
    </React.Fragment>
  );
});
