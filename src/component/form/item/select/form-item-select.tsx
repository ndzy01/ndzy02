import React from 'react';
import { FormItemProps } from '@/component/form/form-types';
import { Select } from 'antd';

interface Props extends FormItemProps {
  setValue: (value: any) => void;
}
export const FormItemSelect = (props: Props) => {
  const handleInput = (value: any) => {
    props.setValue(value);
  };
  return (
    <Select
      options={props?.selectType?.options}
      placeholder={props?.selectType?.placeholder}
      disabled={props?.selectType?.disabled}
      allowClear={props?.selectType?.allowClear}
      value={props?.value}
      onChange={(value) => {
        handleInput(value);
      }}
    />
  );
};
