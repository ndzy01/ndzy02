import React, { useContext } from 'react';
import { FormItemProps } from './types';

import { Input } from 'antd';
import { FormItemContext } from './context';
interface Props extends FormItemProps {
  handleInput: any;
}

export const FormItemInput = (props: Props) => {
  const state = useContext(FormItemContext);

  return (
    <Input
      autoComplete="off"
      placeholder={props.placeholder}
      suffix={props.suffix}
      addonAfter={props.addonAfter}
      value={state.value}
      onChange={(e) => {
        props.handleInput(e);
      }}
      disabled={props.disabled}
    />
  );
};
