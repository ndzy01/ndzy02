import React, { useEffect } from 'react';
import { FormConfig } from './types';
import { useSetState } from 'ahooks';
import { AnyObj } from '@/types';
interface Props extends FormConfig {
  setParentState: (state: AnyObj) => void;
  parentColumn: number;
  refBrother: { [key: string]: any };
  [key: string]: any;
}
export const FormItem = (props: Props) => {
  // useEffect(() => {
  //   props.setParentState({
  //     [props.name]: {
  //       getValue: getValue
  //     }
  //   });
  // }, []);
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
  const getValue = () => {
    return '11';
  };
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
          (props.render ? props.render(props.name) : props.value || '')}
      </span>
    </div>
  );
};
