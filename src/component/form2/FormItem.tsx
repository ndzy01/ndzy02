import React, { useContext } from 'react';
import { useMount, useUpdateEffect, useSetState } from 'ahooks';
import { rules } from './validate';
import { FormContext } from './context';
import { FormItemProps, FormItemType } from './types';
import { FormItemLabel } from './FormItemLabel';
import { FormItemValidateErrorMsg } from './FormItemValidateErrorMsg';
import { FormItemText } from './FormItemText';
import { FormItemInput } from './FormItemInput';
import * as _ from 'lodash';
import { getIsValidate } from './utils';

export const FormItem = (props: FormItemProps) => {
  const { [props.name]: state } = useContext(FormContext);
  // 验证方式
  const isValidate = getIsValidate(props.customizeValidate, props.validate);
  const [formItemState, setFormItemState] = useSetState({
    validate: true
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
    const itemWidth = props.formitemStyle || {
      labelWidth,
      inputWidth
    };
    return itemWidth;
  };
  //#endregion

  //#region validateValue validateItem 验证表单数据
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
  /**
   * @description
   */
  const validateItem = () => props.customizeValidate;
  //#endregion

  //#region getValue 获取数据 setValue 设置数据
  /**
   * @description 获取数据
   */
  const getValue = (): any => {
    return state.value;
  };

  /**
   * @description 设置数据
   * @param value
   */
  const setValue = (value: any, validate: boolean = true) => {
    //  设置数据时 是否验证
    setFormItemState({
      validate
    });
    const result = validateValue(value);
    if (validate) {
      if (typeof isValidate === 'object') {
        props.setParentState({
          [props.name]: {
            ...state,
            value,
            validate: validateItem()
          }
        });
      } else if (typeof isValidate === 'boolean') {
        if (isValidate) {
          props.setParentState({
            [props.name]: {
              ...state,
              value,
              validate: result
            }
          });
        } else {
          props.setParentState({
            [props.name]: {
              ...state,
              value
            }
          });
        }
      }
    } else {
      props.setParentState({
        [props.name]: {
          ...state,
          value,
          validate: { isPass: true, msg: '' }
        }
      });
    }

    // TODO: showErr
    if (!result.isPass && result.showErr === false) {
      return;
    }

    props.onChange && props.onChange(value);
  };
  //#endregion

  //#region 生命周期
  const initStateOnUpdate = () => {
    if (formItemState.validate) {
      if (typeof isValidate === 'object') {
        props.setParentState({
          [props.name]: {
            ...state,
            defaultValue: props.value,
            value: props.value,
            validate: validateItem(),
            mount: true,
            getValue,
            setValue,
            validateValue,
            validateItem
          }
        });
      } else if (typeof isValidate === 'boolean') {
        if (isValidate) {
          props.setParentState({
            [props.name]: {
              ...state,
              defaultValue: props.value,
              value: props.value,
              validate: validateValue(props.value),
              mount: true,
              getValue,
              setValue,
              validateValue,
              validateItem
            }
          });
        } else {
          props.setParentState({
            [props.name]: {
              ...state,
              defaultValue: props.value,
              value: props.value,
              validate: { isPass: true, msg: '' },
              mount: true,
              getValue,
              setValue,
              validateValue,
              validateItem
            }
          });
        }
      }
    } else {
      props.setParentState({
        [props.name]: {
          ...state,
          defaultValue: props.value,
          value: props.value,
          validate: { isPass: true, msg: '' },
          mount: true,
          getValue,
          setValue,
          validateValue,
          validateItem
        }
      });
    }
  };
  const initState = () => {
    props.setParentState({
      [props.name]: {
        ...state,
        defaultValue: props.value,
        value: props.value,
        validate: { isPass: true, msg: '' },
        mount: true,
        getValue,
        setValue,
        validateValue,
        validateItem
      }
    });
  };

  //#region 挂载时执行
  useMount(() => {
    initState();
  });
  //#endregion
  useUpdateEffect(() => {
    initStateOnUpdate();
  }, [props.value]);
  //#endregion

  //#region 渲染函数
  const renderFormItem = (type: FormItemType, props: FormItemProps) => {
    if (type === 'text') {
      return <FormItemText {...props} />;
    } else if (type === 'input') {
      return <FormItemInput {...props} setValue={setValue} />;
    }
  };
  const render = () => {
    if (_.isEmpty(state)) {
      return null;
    }
    return (
      <>
        {state.validate && (
          <span
            style={{ width: getWidth().inputWidth }}
            className={`itemInput ${
              props.formItemClassName &&
              props.formItemClassName.itemInputValidateErr
                ? props.formItemClassName.itemInputValidateErr
                : state.validate.isPass
                ? ''
                : 'validate-error'
            } ${props.formItemClassName && props.formItemClassName.itemInput}`}
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
        )}
      </>
    );
  };

  //#endregion
  return (
    <div
      className={`formItem ${
        props.formItemClassName && props.formItemClassName.item
      }`}
    >
      <FormItemLabel
        label={props.label}
        labelShould={props.labelShould}
        width={getWidth().labelWidth}
        itemLabel={props.formItemClassName && props.formItemClassName.itemLabel}
        rules={props.rules}
        itemRequireSymbol={
          props.formItemClassName && props.formItemClassName.itemRequireSymbol
        }
      />
      {render()}
    </div>
  );
};
