import { Moment } from 'moment';
import { TimePickerProps } from 'antd/lib/time-picker';
import { AnyObj } from '@/types';

export interface FormContextItem {
  defaultValue?: string;
  value?: string;
  validate?: {
    isPass: boolean;
    msg: string;
  };
  mount?: boolean;
  getValue?: () => any;
  setValue?: (value: any) => void;
  validateValue?: (
    value: any
  ) => { isPass: boolean; msg: string; showErr?: boolean };
}

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}
type RuleType = 'required';

export interface Rule {
  type: RuleType;
  name?: string;
  msg?: string;
  num?: number;
  showErr?: boolean;
  validate?: (value: any) => { isPass: boolean; msg: string };
}

export type FormItemType = 'text' | 'input';

export interface FormConfig {
  name: string; // 唯一标识 all
  type: FormItemType; // item 类型 all
  column?: undefined | number; //可单独配置所占宽度 all
  // all
  formitemStyle?: {
    labelWidth: string;
    inputWidth: string;
  };
  labelWidth?: number; // all
  inputWidth?: number; // all
  // all
  formItemClassName?: {
    itemWrap?: string;
    item?: string;
    itemLabel?: string;
    itemInput?: string;
    itemRequireSymbol?: string;
    itemValidateErrMsg?: string;
  };
  value?: any; //all
  label?: string; //all
  rules?: Rule[]; // all
  labelShould?: boolean; // all
  hidden?: boolean; // all
  validate?: boolean; // all
  // ----------------
  textType?: {
    render?: (name: string) => JSX.Element | JSX.Element[] | null;
  };
  inputType?: {
    maxLen?: number;
    placeholder?: string;
  };

  selectOptions?: Option[];
  checkOptions?: Option[] | string[];
  radioOptions?: Option[];
  suffix?: string | JSX.Element;
  addonAfter?: string | JSX.Element;
  // render?: (name: string) => JSX.Element | JSX.Element[] | null;
  autoSize?:
    | boolean
    | {
        minRows?: number;
        maxRows?: number;
      };
  // treeData?: TreeNode[];
  // treeDataTree?: TreeNodeNormal[];
  onChange?: (value: any) => void;
  mode?: 'multiple' | 'tags' | undefined;
  visibilityToggle?: boolean;

  showTime?: TimePickerProps | boolean;
  format?: string;
  disabled?: boolean;
  accept?: string;
  maxSize?: number;
  fileParam?: {};
  extra?: string;
  allowClear?: boolean;
  disabledDate?: (current: Moment | null) => boolean;
  disabledTime?: (
    current?: Moment | null
  ) => {
    disabledHours?: () => number[];
    disabledMinutes?: () => number[];
    disabledSeconds?: () => number[];
  };
  switchData?: { value: any; checked: boolean }[];
  maxHeight?: number;
  maxLength?: number;
  // // 验证时机
  // validateValueOnChange?: boolean;
}

export interface FormProps {
  ref: any;
  formClassName?: string;
  formConfig: FormConfig[];
  column?: number | undefined;
  hasBtn?: boolean;
  isShowMessage?: boolean;
  onSearch?: (data: {}) => void;
  onReset?: (data: {}) => void;
}

//#endregion
export interface FormItemProps extends FormConfig {
  setParentState: (value: AnyObj) => void;
  parentColumn: number;
  refOther: { [key: string]: any };
  [key: string]: any;
}
