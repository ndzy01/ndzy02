import React, { useContext } from 'react';
import {
  FormContext,
  getWidth,
  FormItemRequireSymbol,
  FormItemValidateMsg
} from '@/component/form';
export const FormItem = (props: FormItemProps) => {
  const { [props.name]: state } = useContext(FormContext);
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
        input
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
