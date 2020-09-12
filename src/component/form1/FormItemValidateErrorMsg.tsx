import React from 'react';
interface Props {
  isPass?: boolean;
  msg: string | null;
  itemValidateErrMsg?: string;
}
export const FormItemValidateErrorMsg = ({
  isPass,
  msg,
  itemValidateErrMsg
}: Props) => {
  if (isPass) {
    return null;
  }
  return (
    <span
      className={`${itemValidateErrMsg ? itemValidateErrMsg : 'text-red-500'}`}
    >
      {msg}
    </span>
  );
};
