import React, { useContext } from 'react';

import { Select } from 'antd';
import { FormContext } from '@/component/form';
import { FormItemProps } from '@/component/form/form-types';
interface Props extends FormItemProps {
  setValue: (value: any) => void;
}
export const FormItemSelect = (props: Props) => {
  const state = useContext(FormContext);
  const handleInput = (value: any) => {
    props.setValue(value);
  };
  return (
    <Select
      options={props?.selectType?.options}
      placeholder={props?.selectType?.placeholder}
      disabled={props?.selectType?.disabled}
      allowClear={props?.selectType?.allowClear}
      value={state[props.name]?.value}
      onChange={(value) => {
        handleInput(value);
      }}
    />
  );
};
