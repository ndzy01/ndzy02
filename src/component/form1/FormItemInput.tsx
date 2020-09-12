import React, { useContext } from 'react';
import { FormItemProps } from './types';

import { Input } from 'antd';
import { FormItemContext } from './context';
interface Props extends FormItemProps {
  setValue: (value: any) => void;
  setParentState: (value: any) => void;
}

export const FormItemInput = (props: Props) => {
  const state = useContext(FormItemContext);
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    if (props.validateValueOnChange) {
      props.setValue(value);
    } else {
      props.setParentState({
        value
      });
    }
  };
  return (
    <Input
      autoComplete="off"
      placeholder={props.placeholder}
      suffix={props.suffix}
      addonAfter={props.addonAfter}
      value={state.value}
      onChange={(e) => {
        handleInput(e);
      }}
      disabled={props.disabled}
    />
  );
};
