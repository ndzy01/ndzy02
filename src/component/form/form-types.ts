import { InputProps, PasswordProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';

/**
 * @description FormContextItem
 */
export interface FormContextItem {
  /**
   * @description value
   */
  value?: any;
  /**
   * @description validate 验证信息
   */
  validate?: {
    isPass: boolean;
    msg: string;
  };
  /**
   * @description validateValue 验证 value
   */
  validateValue: (value: any) => void;
  /**
   * @description setValue 验证 value
   * @description validate 是否验证
   */
  setValue?: (value: any, validate?: boolean) => void;
}

export type FormItemType = 'text' | 'input' | 'password' | 'select';

export type RuleType = 'required';

export interface Rule {
  type: RuleType;
  name?: string;
  msg?: string;
  showErr?: boolean; // 不可展示不通过验证的值
  validate?: (value: any) => { isPass: boolean; msg: string };
}

export interface FormConfig {
  column?: number; //可单独配置所占宽度 all
  labelWidth?: number; // all
  inputWidth?: number; // all
  name: string; // 唯一标识 all
  formItemStyle?: {
    itemWrap?: AnyObj;
    item?: AnyObj;
    itemLabel?: AnyObj; // width 默认 30%
    itemInput?: AnyObj; // width 默认 70%
    itemInputValidate?: AnyObj;
    itemRequireSymbol?: AnyObj;
    itemValidateMsg?: AnyObj;
  }; // all
  formItemClassName?: {
    itemWrap?: string;
    item?: string;
    itemLabel?: string;
    itemInput?: string;
    itemInputValidate?: string;
    itemRequireSymbol?: string;
    itemValidateMsg?: string;
  }; // all
  type: FormItemType; // item 类型 all
  value?: any; //all
  label?: string; //all
  rules?: Rule[]; // all
  labelShould?: boolean; // all
  hidden?: boolean; // all
  onChange?: (value: any) => void; //all
  // ----------------
  textType?: {
    render?: (name: string) => JSX.Element | JSX.Element[] | null;
  };
  inputType?: InputProps;
  passwordType?: PasswordProps;
  selectType?: SelectProps<any>;
}

export interface FormItemProps extends FormConfig {
  setParentState: (value: AnyObj) => void;
  parentColumn: number; // form 的 Column
  formState: { [key: string]: FormContextItem };
  [key: string]: any;
}

export interface FormProps {
  column?: number;
  formClassName?: string;
  formStyles?: AnyObj;
  formConfig: FormConfig[];
  clearFormItems?: () => void;
}
