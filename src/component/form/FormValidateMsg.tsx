import React from 'react';
interface Props {
  msg: string | null;
}
export const FormValidateMsg = ({ msg }: Props) => {
  return <span className="text-red-500">{msg}</span>;
};
