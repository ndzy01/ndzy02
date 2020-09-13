export const getIsValidate = (
  customizeValidate?:  {
    isPass: boolean;
    msg: string;
  },
  validate?: boolean
) => {
  if (customizeValidate) {
    return customizeValidate;
  }
  return validate;
};
