import React, { useContext } from 'react';
import { FormItemProps } from './types';

import { Input } from 'antd';
import { FormContext } from './context';
interface Props extends FormItemProps {
  setValue: (value: any, isValidate?: boolean) => void;
  // setFormContextValue?: (value: any) => void;
}

export const FormItemInput = (props: Props) => {
  const state = useContext(FormContext);
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let validateValueOnChange = true;
    if (props.inputType) {
      validateValueOnChange = props.inputType.validateValueOnChange
        ? true
        : false;
    }
    console.log(validateValueOnChange);

    const value = e.target.value;
    props.setValue(value, validateValueOnChange);

    // if (props.validateValueOnChange) {
    //   props.setValue(value);
    // } else {
    //   props.setFormContextValue &&
    //     props.setFormContextValue({
    //       value
    //     });
    // }
  };
  return (
    <Input
      autoComplete="off"
      placeholder={props.placeholder}
      suffix={props.suffix}
      addonAfter={props.addonAfter}
      value={state[props.name].value}
      onChange={(e) => {
        handleInput(e);
      }}
      disabled={props.disabled}
    />
  );
};
