import React from 'react';
import { Rule } from '@/component/form/form-types';
interface Props {
  rules?: Rule[];
  styles?: AnyObj;
  className?: string;
}

export const FormItemRequireSymbol = ({ rules, styles, className }: Props) => {
  if (!rules) {
    return null;
  }
  const requiredRule = rules.find((item) => {
    return item.type === 'required';
  });
  if (!requiredRule) {
    return null;
  }
  // 显示必填*号
  return (
    <span
      style={{ ...(styles ? styles : {}) }}
      className={`${
        className ? className : 'custom-form-wrap-item-require-symbol'
      }`}
    >
      *
    </span>
  );
};
