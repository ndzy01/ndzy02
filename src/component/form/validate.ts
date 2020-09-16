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
  }
};
