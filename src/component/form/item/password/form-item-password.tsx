import React from 'react';
import { FormItemProps } from '@/component/form/form-types';
import { Input } from 'antd';

interface Props extends FormItemProps {
  setValue: (value: any) => void;
}
export const FormItemPassword = (props: Props) => {
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    props.setValue(value);
  };
  return (
    <Input.Password
      autoComplete="off"
      visibilityToggle={props?.passwordType?.visibilityToggle}
      placeholder={props?.passwordType?.placeholder}
      disabled={props?.passwordType?.disabled}
      value={props?.value}
      onChange={(e) => {
        handleInput(e);
      }}
    />
  );
};
