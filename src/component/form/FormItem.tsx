import React from 'react';
import { FormConfig } from './types';
import { Input } from 'antd';
import { useSetState, useMount, useUpdate, useUpdateEffect } from 'ahooks';
import { AnyObj } from '@/types';
import { rules } from './validate';
interface Props extends FormConfig {
  setParentState: (state: AnyObj) => void;
  parentColumn: number;
  refBrother: { [key: string]: any };
  [key: string]: any;
}
export const FormItem = (props: Props) => {
  const [state, setState] = useSetState({
    defaultValue: '',
    value: '',
    validate: {
      isPass: true,
      msg: ''
    }
  });

  /**
   * @description 显示必填*号
   */
  const getRequire = (): null | JSX.Element => {
    if (!props.rules) {
      return null;
    }

    let requiredRule = props.rules.find((item) => {
      return item.type === 'required';
    });

    if (requiredRule) {
      // 显示必填*号
      return <span className="requireSymbol">*</span>;
    }

    return null;
  };
  // 计算表单label和input的宽度
  const getWidth = (): { labelWidth: string; inputWidth: string } => {
    let labelWidth = '';
    let inputWidth = '';
    const labelDefault = props.labelWidth || 30;
    const inputDefault = props.inputWidth || 70;

    if (!props.column) {
      labelWidth = `${labelDefault}%`;
      inputWidth = `${inputDefault}%`;
    }

    if (props.column && props.column <= props.parentColumn) {
      let defaultW = labelDefault * (1 / props.parentColumn);
      let allW = (1 / props.parentColumn) * props.column;
      let w = defaultW / allW;

      labelWidth = `${w}%`;
      inputWidth = `${100 - w}%`;
    }

    if (!props.label && !props.labelShould) {
      labelWidth = '';
      inputWidth = '100%';
    }

    return {
      labelWidth,
      inputWidth
    };
  };
  // 验证表单数据
  const validateValue = (
    value: any
  ): { isPass: boolean; msg: string; showErr?: boolean } => {
    let isPass = true;
    let msg = '';
    let showErr = true;

    if (props.rules) {
      for (let i = 0; i < props.rules.length; i++) {
        let item = props.rules[i];
        let rule = rules[item.type];

        showErr = item.showErr === false ? false : true;

        if (item.type === 'maxLen' && item.num && value) {
          isPass = value.length <= item.num;
          msg = item.msg || '';
        }
        if (item.type === 'minLen' && item.num && value) {
          isPass = value.length >= item.num;
          msg = item.msg || '';
        }

        // 内置校验方式
        if (rule) {
          isPass = rule.reg.test(value || '');

          msg = item.msg || rule.msg;
        }

        if (item.type === 'confirm' && item.name) {
          let brotherValue = props.refBrother[item.name].getValue();

          isPass = brotherValue === value;
          msg = item.msg || '';
        }

        // 自定义的校验方式
        if (item.type === 'custom') {
          let result = item.validate
            ? item.validate(value)
            : { isPass: false, msg: '' };

          isPass = result.isPass;
          msg = item.msg || result.msg;
        }
        //校验文件上传的空
        // console.log(props.type, item.type, value);
        if (
          props.type === 'upload' &&
          item.type === 'required' &&
          (!value || value.length === 0)
        ) {
          isPass = false;
        }

        //校验富文本的空
        // const reg = /<[^>]+>/g;
        // if (reg.test(value)) {
        //   console.log('reg-', value);
        // }

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

  const getValue = (isValidate: boolean = true): any => {
    if (isValidate) {
      const result = validateValue(state.value);

      // 返回数据前，先进行校验
      if (!result.isPass) {
        setState({
          validate: result
        });

        return false;
      }

      if (!state.validate.isPass) {
        setState({
          validate: result
        });
      }
    }
    return state.value;
  };
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;
    setState({
      value
    });
  };
  useMount(() => {
    if (props.value) {
      setState({
        value: props.value
      });
    }
  });
  useUpdateEffect(() => {
    props.setParentState({
      [props.name]: { getValue }
    });
  }, [state.value]);

  const itemWidth = props.itemStyle || getWidth();
  return (
    <div className="formItem">
      {props.label && (
        <span style={{ width: itemWidth.labelWidth }} className="itemLabel">
          {getRequire()}
          {props.label}：
        </span>
      )}

      {!props.label && props.labelShould && (
        <span style={{ width: itemWidth.labelWidth }} className="itemLabel" />
      )}

      <span
        style={{ width: itemWidth.inputWidth }}
        className={`itemInput ${state.validate.isPass ? '' : 'validate-error'}`}
      >
        {props.type === 'text' &&
          (props.render
            ? props.render(props.name)
            : props.value || state.defaultValue)}
        {props.type === 'input' && (
          <Input
            autoComplete="off"
            placeholder={props.placeholder}
            suffix={props.suffix}
            addonAfter={props.addonAfter}
            value={state.value}
            onChange={(e) => {
              handleInput(e);
            }}
            disabled={props.disabled}
          />
        )}
        {/* 验证提示 */}
        {state.validate.isPass ? (
          ''
        ) : (
          <span className="text-red-500">{state.validate.msg}</span>
        )}
      </span>
    </div>
  );
};
