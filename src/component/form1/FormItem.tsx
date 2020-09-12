import React from 'react';
import { useMount, useUpdateEffect, useSetState } from 'ahooks';
import { rules } from './validate';
import { FormItemContext } from './context';
import { FormItemProps, FormItemType } from './types';
import { FormItemLabel } from './FormItemLabel';
import { FormItemValidateErrorMsg } from './FormItemValidateErrorMsg';
import { FormItemText } from './FormItemText';
import { FormItemInput } from './FormItemInput';

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
    const itemWidth = props.formitemStyle || {
      labelWidth,
      inputWidth
    };
    return itemWidth;
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
        const item = props.rules[i];
        const rule = rules[item.type];

        showErr = item.showErr === false ? false : true;

        // 内置 校验方式
        if (rule) {
          isPass = rule.reg.test(value || '');
          msg = item.msg || rule.msg;
        }
        // 其他 校验方式

        // if (item.type === 'maxLen' && item.num && value) {
        //   isPass = value.length <= item.num;
        //   msg = item.msg || '';
        // }
        // if (item.type === 'minLen' && item.num && value) {
        //   isPass = value.length >= item.num;
        //   msg = item.msg || '';
        // }

        // if (item.type === 'confirm' && item.name) {
        //   let brotherValue = props.refBrother[item.name].getValue();

        //   isPass = brotherValue === value;
        //   msg = item.msg || '';
        // }

        // // 自定义的校验方式
        // if (item.type === 'custom') {
        //   let result = item.validate
        //     ? item.validate(value)
        //     : { isPass: false, msg: '' };

        //   isPass = result.isPass;
        //   msg = item.msg || result.msg;
        // }
        // //校验文件上传的空
        // // console.log(props.type, item.type, value);
        // if (
        //   props.type === 'upload' &&
        //   item.type === 'required' &&
        //   (!value || value.length === 0)
        // ) {
        //   isPass = false;
        // }

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
    // 对数据进行校验
    const result = validateValue(value);

    // TODO: showErr
    if (!result.isPass && result.showErr === false) {
      return;
    }

    setState({
      value,
      validate: result
    });

    props.onChange && props.onChange(value);
    // if (this.props.type === 'switch') {
    //   const v = this.getSwitchValue(value);
    //   this.props.onChange && this.props.onChange(v);
    // } else {
    //   this.props.onChange && this.props.onChange(value);
    // }
  };
  //#endregion

  //#region 生命周期
  useMount(() => {
    setState({
      mount: true
    });
    setState({
      value: props.value || undefined,
      defaultValue: props.value || undefined
    });

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
    setState({
      value: props.value || undefined,
      defaultValue: props.value || undefined
    });
  }, [props.value]);
  //#endregion

  //#region 渲染函数
  const renderFormItem = (type: FormItemType, props: FormItemProps) => {
    if (type === 'text') {
      return <FormItemText {...props} />;
    } else if (type === 'input') {
      return (
        <FormItemInput
          {...props}
          setValue={setValue}
          setParentState={setState}
        />
      );
    }
  };

  //#endregion
  return (
    <FormItemContext.Provider value={state}>
      <div
        className={`formItem ${
          props.formItemClassName && props.formItemClassName.item
        }`}
      >
        <FormItemLabel
          label={props.label}
          labelShould={props.labelShould}
          width={getWidth().labelWidth}
          itemLabel={
            props.formItemClassName && props.formItemClassName.itemLabel
          }
          rules={props.rules}
          itemRequireSymbol={
            props.formItemClassName && props.formItemClassName.itemRequireSymbol
          }
        />
        <span
          style={{ width: getWidth().inputWidth }}
          className={`itemInput ${
            state.validate.isPass ? '' : 'validate-error'
          }`}
        >
          {renderFormItem(props.type, props)}
          <FormItemValidateErrorMsg
            isPass={state.validate.isPass}
            msg={state.validate.msg}
            itemValidateErrMsg={
              props.formItemClassName &&
              props.formItemClassName.itemValidateErrMsg
            }
          />
        </span>
      </div>
    </FormItemContext.Provider>
  );
};
