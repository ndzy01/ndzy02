import React from 'react';
import { FormItemProps } from '@/component/form/form-types';
import { Input } from 'antd';

interface Props extends FormItemProps {
  setValue: (value: any) => void;
}
export const FormItemInput = (props: Props) => {
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    props.setValue(value);
  };
  return (
    <Input
      autoComplete="off"
      placeholder={props?.inputType?.placeholder}
      suffix={props?.inputType?.suffix}
      addonAfter={props?.inputType?.addonAfter}
      disabled={props?.inputType?.disabled}
      value={props?.value}
      onChange={(e) => {
        handleInput(e);
      }}
    />
  );
};
