export const rules: { [key: string]: any } = {
  required: {
    reg: /[\s\S]*\S+[\s\S]*/,
    msg: '不能为空'
  },
  number: {
    reg: /^\d*$/,
    msg: '只能输入数字'
  },
  positiveInteger: {
    reg: /^[1-9]+[0-9]*$/,
    msg: '只能输入正整数'
  },
  greaterZeroInteger: {
    reg: /^[0-9]*$/,
    msg: '只能输入大于等于零的整数'
  },
  orderCusNo: {
    reg: /^[0-9][0-9]{8}$/,
    msg: '请输入九位数字'
  },
  sysUserName: {
    reg: /^[\u4e00-\u9fa5A-Za-z_]*$/,
    msg: '请输入十位任意字母、汉字、_'
  },
  cPassword: {
    reg: /^[A-Za-z0-9]+$/,
    msg: '请输入任意字母或数字'
  }
};
