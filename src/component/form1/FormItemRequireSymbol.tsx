import React from 'react';
import { Rule } from './types';
interface Props {
  rules?: Rule[];
  itemRequireSymbol?: string;
}

export const FormItemRequireSymbol = ({ rules, itemRequireSymbol }: Props) => {
  if (!rules) {
    return null;
  }
  let requiredRule = rules.find((item) => {
    return item.type === 'required';
  });
  if (!requiredRule) {
    return null;
  }
  // 显示必填*号
  return (
    <span
      className={`${itemRequireSymbol ? itemRequireSymbol : 'requireSymbol'}`}
    >
      *
    </span>
  );
};
