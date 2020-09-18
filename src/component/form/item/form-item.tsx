import React, { useContext, useState } from 'react';
import {
  FormContext,
  getWidth,
  customValidateValue,
  FormItemRequireSymbol,
  FormItemValidateMsg,
  FormItemText,
  FormItemInput
} from '@/component/form';
import { FormItemProps, FormItemType } from '@/component/form/form-types';
import { useMount, useUpdateEffect } from 'ahooks';
export const FormItem = (props: FormItemProps) => {
  const { [props.name]: state } = useContext(FormContext);
  const [isValidate, setIsValidate] = useState(true);
  const validateValue = (value: any): void => {
    const result = customValidateValue(value, props.rules);
    if (result.isPass) {
      props.setParentState({
        [props.name]: {
          ...state,
          value,
          validate: { isPass: true, msg: '' }
        }
      });
    } else {
      props.setParentState({
        [props.name]: {
          ...state,
          value,
          validate: result
        }
      });
    }
  };
  const setValue = (value: any, validate: boolean = true): void => {
    setIsValidate(validate);
    if (validate) {
      const result = customValidateValue(value, props.rules);
      if (result.isPass) {
        props.setParentState({
          [props.name]: {
            ...state,
            value,
            validate: { isPass: true, msg: '' }
          }
        });
      } else {
        props.setParentState({
          [props.name]: {
            ...state,
            value,
            validate: result
          }
        });
      }
      // 应用场景
      // 设置了showErr 为 false 不能输入 不通过校验的值
      if (!result.isPass && result.showErr === false) {
        return;
      }
    } else {
      props.setParentState({
        [props.name]: {
          ...state,
          value,
          validate: { isPass: true, msg: '' }
        }
      });
    }

    props.onChange && props.onChange(value);
  };
  useMount(() => {
    props.setParentState({
      [props.name]: {
        ...state,
        value: props.value,
        validate: { isPass: true, msg: '' },
        setValue,
        validateValue
      }
    });
  });
  useUpdateEffect(() => {
    if (isValidate) {
      props.setParentState({
        [props.name]: {
          ...state,
          value: props.value,
          validate: customValidateValue(props.value, props.rules),
          mount: true,
          setValue,
          validateValue
        }
      });
    } else {
      props.setParentState({
        [props.name]: {
          ...state,
          value: props.value,
          validate: { isPass: true, msg: '' },
          mount: true,
          setValue,
          validateValue
        }
      });
    }
  }, [props.value]);
  const renderFormItem = (type: FormItemType, props: FormItemProps) => {
    if (type === 'text') {
      return <FormItemText {...props} />;
    } else if (type === 'input') {
      return <FormItemInput {...props} setValue={setValue} />;
    }
  };
  return (
    <div
      style={{
        ...(props?.formItemStyle?.item ?? {})
      }}
      className={`custom-form-wrap-item ${
        props?.formItemClassName?.item ?? ''
      }`}
    >
      {props.label && (
        <span
          style={{
            ...getWidth(props).label,
            ...(props?.formItemStyle?.itemLabel ?? {})
          }}
          className={`custom-form-wrap-item-label ${
            props?.formItemClassName?.itemLabel ?? ''
          }`}
        >
          <FormItemRequireSymbol
            rules={props.rules}
            styles={props?.formItemStyle?.itemRequireSymbol}
            className={props?.formItemClassName?.itemRequireSymbol}
          />
          {props.label}：
        </span>
      )}
      {/* 没有设置label 是否 占用label的位置 */}
      {!props.label && props.labelShould && (
        <span
          style={{
            ...(props?.formItemStyle?.itemLabel ?? {}),
            ...getWidth(props).label
          }}
          className={`custom-form-wrap-item-label ${
            props?.formItemClassName?.itemLabel ?? ''
          }`}
        />
      )}
      {/* ------------- */}
      <span
        style={{
          ...getWidth(props).input,
          ...(props?.formItemStyle?.itemInput ?? {})
        }}
        className={`custom-form-wrap-item-input ${
          props?.formItemClassName?.itemInput ?? ''
        }`}
      >
        {renderFormItem(props.type, props)}
        <FormItemValidateMsg
          styles={props?.formItemStyle?.itemValidateMsg}
          className={props?.formItemClassName?.itemValidateMsg}
          isPass={state?.validate?.isPass}
          msg={state?.validate?.msg}
        />
      </span>
    </div>
  );
};
