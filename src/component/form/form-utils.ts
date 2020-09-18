import { rules as rules_ } from '@/component/form';
import { FormItemProps, Rule } from '@/component/form/form-types';
export const getWidth = (
  props: FormItemProps
): {
  label: { width: string };
  input: {
    width: string;
  };
} => {
  let labelWidth = '';
  let inputWidth = '';
  const labelDefault = props?.labelWidth ?? 30;
  const inputDefault = props?.inputWidth ?? 70;

  if (!props.column) {
    labelWidth = `${labelDefault}%`;
    inputWidth = `${inputDefault}%`;
  }

  if (props.column && props.column <= props.parentColumn) {
    const defaultW = labelDefault * (1 / props.parentColumn);
    const allW = (1 / props.parentColumn) * props.column;
    const w = defaultW / allW;

    labelWidth = `${w}%`;
    inputWidth = `${100 - w}%`;
  }

  if (!props.label && !props.labelShould) {
    labelWidth = '';
    inputWidth = '100%';
  }

  const itemWidth = {
    label: { width: labelWidth },
    input: {
      width: inputWidth
    }
  };
  return itemWidth;
};

export const customValidateValue = (
  value: any,
  rules?: Rule[]
): { isPass: boolean; msg: string; showErr?: boolean } => {
  let isPass = true;
  let msg = '';
  let showErr = true;
  if (rules) {
    for (let i = 0; i < rules.length; i++) {
      const item = rules[i];
      const rule = rules_[item.type];
      showErr = item.showErr === false ? false : true;

      // 内置 校验方式
      if (rule) {
        isPass = rule.reg.test(value || '');
        msg = item.msg || rule.msg;
      }
      if (item.validate) {
        isPass = item.validate(value).isPass;
        msg = item.validate(value).msg;
      }
      // 其他 校验方式

      // 验证失败，不再验证其它的规则
      if (!isPass) {
        break;
      }
    }
  }
  return {
    isPass,
    msg,
    showErr
  };
};
