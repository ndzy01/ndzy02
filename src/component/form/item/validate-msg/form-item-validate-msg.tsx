import React from 'react';
interface Props {
  isPass?: boolean;
  msg?: string;
  className?: string;
  styles?: AnyObj;
}
export const FormItemValidateMsg = ({
  isPass,
  msg,
  className,
  styles
}: Props) => {
  if (isPass) {
    return null;
  }
  return (
    <span
      style={{ ...(styles ? styles : {}) }}
      className={`${className ? className : 'text-red-500'}`}
    >
      {msg}
    </span>
  );
};
