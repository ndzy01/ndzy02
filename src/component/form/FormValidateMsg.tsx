import React from 'react';
interface Props {
  msg: string | null;
  className?: string;
}
export const FormValidateMsg = ({ msg, className }: Props) => {
  return (
    <span className={`${className ? className : 'text-red-500'}`}>{msg}</span>
  );
};
