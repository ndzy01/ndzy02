import React, { useContext } from 'react';

import { Input } from 'antd';
import { FormContext } from '@/component/form';
import { FormItemProps } from '@/component/form/form-types';
interface Props extends FormItemProps {
  setValue: (value: any) => void;
}
export const FormItemPassword = (props: Props) => {
  const state = useContext(FormContext);
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
      value={state[props.name]?.value}
      onChange={(e) => {
        handleInput(e);
      }}
    />
  );
};
