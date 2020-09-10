import React from 'react';
import { FormItemType, FormItemProps } from './types';
import { useSetState, useMount, useUpdateEffect } from 'ahooks';
import { rules } from './validate';
import { FormValidateMsg } from './FormValidateMsg';
import { FormItemInput } from './FormItemInput';
import { FormItemText } from './FormItemText';
import { FormItemContext } from './context';

export const FormItem = (props: FormItemProps) => {
  const [state, setState] = useSetState({
    defaultValue: '',
    value: '',
    validate: {
      isPass: true,
      msg: ''
    },
    mount: false
  });

  //#region getRequire 显示必填*号
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
  //#endregion

  //#region getWidth 计算表单label和input的宽度
  /**
   * @description 计算表单label和input的宽度
   */
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
  //#endregion

  //#region validateValue 验证表单数据
  /**
   * @description 验证表单数据
   * @param value
   */
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
  //#endregion

  //#region getValue 获取数据 setValue 设置数据
  /**
   * @description 获取数据
   * @param isValidate
   */
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
  /**
   * @description 设置数据
   * @param value
   */
  const setValue = (value: any) => {
    let result = validateValue(value);

    if (!result.isPass && result.showErr === false) {
      return;
    }

    setState({
      value,
      validate: result
    });
    // if (this.props.type === 'switch') {
    //   const v = this.getSwitchValue(value);
    //   this.props.onChange && this.props.onChange(v);
    // } else {
    //   this.props.onChange && this.props.onChange(value);
    // }
  };
  //#endregion

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (props.validateValueOnChange) {
      setValue(value);
    } else {
      setState({
        value
      });
    }
  };
  //#region 生命周期
  useMount(() => {
    setState({
      mount: true
    });
    if (props.value) {
      setState({
        value: props.value
      });
    }
    props.setParentState({
      [props.name]: { getValue, setValue }
    });
  });
  useUpdateEffect(() => {
    props.setParentState({
      [props.name]: { getValue, setValue }
    });
  }, [state.value]);
  useUpdateEffect(() => {
    if (props.value) {
      setState({
        value: props.value
      });
    }
  }, [props.value]);
  //#endregion
  const itemWidth = props.itemStyle ? props.itemStyle : getWidth();
  //#region 渲染函数
  const renderFormItem = (type: FormItemType, props: FormItemProps) => {
    if (type === 'text') {
      return <FormItemText {...props} />;
    } else if (type === 'input') {
      return <FormItemInput {...props} handleInput={handleInput} />;
    }
  };
  //#endregion

  return (
    <FormItemContext.Provider value={state}>
      <div
        className={`formItem ${
          props.formItemClassName && props.formItemClassName.itemClassName
        }`}
      >
        {props.label && (
          <span
            style={{ width: itemWidth.labelWidth }}
            className={`itemLabel ${
              props.formItemClassName &&
              props.formItemClassName.itemLabelClassName
            }`}
          >
            {getRequire()}
            {props.label}：
          </span>
        )}

        {!props.label && props.labelShould && (
          <span
            style={{ width: itemWidth.labelWidth }}
            className={`itemLabel ${
              props.formItemClassName &&
              props.formItemClassName.itemInputClassName
            }`}
          />
        )}

        <span
          style={{ width: itemWidth.inputWidth }}
          className={`${
            props.formItemClassName &&
            props.formItemClassName.itemInputClassName
          } ${state.validate.isPass ? '' : 'validate-error'}`}
        >
          {renderFormItem(props.type, props)}
          <FormValidateMsg
            msg={state.validate.isPass ? null : state.validate.msg}
            className={
              props.formItemClassName && props.formItemClassName.errMsgClassName
            }
          />
        </span>
      </div>
    </FormItemContext.Provider>
  );
};
