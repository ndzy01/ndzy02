import React, { forwardRef, useImperativeHandle } from 'react';
import {
  FormItemProps,
  FormItemState,
  FormItemType
} from '@/component/form/form-types';
import {
  getWidth,
  customValidateValue,
  FormItemInput,
  FormItemPassword,
  FormItemRequireSymbol,
  FormItemSelect,
  FormItemText,
  FormItemValidateMsg
} from '@/component/form';
import { useSetState, useUpdateEffect } from 'ahooks';

export const FormItem = forwardRef((props: FormItemProps, ref: any) => {
  const [state, setState] = useSetState<FormItemState>({
    value: props?.value,
    validate: {
      isPass: true,
      msg: ''
    }
  });
  const validateValue = (value: any): void => {
    const result = customValidateValue(value, props.rules);
    if (result.isPass) {
      setState({
        validate: { isPass: true, msg: '' }
      });
    } else {
      setState({
        validate: result
      });
    }
  };
  const getValue = (isValidate: boolean = true): any => {
    if (isValidate) {
      validateValue(state.value);
    }
    return state.value;
  };

  const setValue = (value: any): void => {
    const result = customValidateValue(value, props.rules);

    //TODO: 设置了showErr 代表不能输入 不通过校验的值
    if (!result.isPass && result.showErr === false) {
      return;
    }
    setState({ value, validate: result });

    props.onChange && props.onChange(value);
  };
  useImperativeHandle(ref, () => {
    return {
      setValue,
      getValue,
      validateValue
    };
  });
  const renderFormItem = (type: FormItemType, props: FormItemProps) => {
    if (type === 'text') {
      return <FormItemText {...props} value={state.value} />;
    } else if (type === 'input') {
      return (
        <FormItemInput {...props} setValue={setValue} value={state.value} />
      );
    } else if (type === 'password') {
      return (
        <FormItemPassword {...props} setValue={setValue} value={state.value} />
      );
    } else if (type === 'select') {
      return (
        <FormItemSelect {...props} setValue={setValue} value={state.value} />
      );
    }
  };
  return (
    <React.Fragment>
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
          } ${
            state?.validate?.isPass === false
              ? 'custom-form-wrap-item-validate-error'
              : ''
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
    </React.Fragment>
  );
});
