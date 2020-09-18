import React, { useContext } from 'react';

import { Input } from 'antd';
import { FormContext } from '@/component/form';
import { FormItemProps } from '@/component/form/form-types';
interface Props extends FormItemProps {
  setValue: (value: any) => void;
}
export const FormItemInput = (props: Props) => {
  const state = useContext(FormContext);
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
      value={state[props.name]?.value}
      onChange={(e) => {
        handleInput(e);
      }}
    />
  );
};
