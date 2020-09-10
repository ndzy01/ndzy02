import { Moment } from 'moment';
import { TimePickerProps } from 'antd/lib/time-picker';
import { TreeNode } from 'antd/lib/tree-select';
import { AnyObj } from '@/types';
//#region
type TreeNode = TreeNodeNormal | TreeNodeSimpleMode;
type TreeNodeValue = string | number | string[] | number[];
interface TreeNodeNormal {
  value: TreeNodeValue;
  label?: React.ReactNode;
  title?: React.ReactNode;
  key: string;
  isLeaf?: boolean;
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  children?: TreeNodeNormal[];
}

interface TreeNodeSimpleMode {
  [key: string]: string | boolean | React.ReactNode;
}

export type FormItemType =
  | 'text'
  | 'input'
  | 'select'
  | 'rangePicker'
  | 'checkBox'
  | 'textArea'
  | 'treeSelect'
  | 'tree'
  | 'radio'
  | 'password'
  | 'datePicker'
  | 'braftEditor'
  | 'upload'
  | 'switch'
  | 'timePicker';

type TreeCheckedNode =
  | string[]
  | {
      checked: string[];
      halfChecked: string[];
    };

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

type RuleType =
  | 'custom'
  | 'required'
  | 'confirm'
  | 'maxLen'
  | 'minLen'
  | 'number'
  | 'positiveInteger'
  | 'greaterZeroInteger'
  | 'orderCusNo'
  | 'sysUserName'
  | 'cPassword';

interface Rule {
  type: RuleType;
  name?: string;
  msg?: string;
  num?: number;
  showErr?: boolean;
  validate?: (value: any) => { isPass: boolean; msg: string };
}
export interface FormConfig {
  formItemClassName?: {
    itemClassName?: string;
    itemLabelClassName?: string;
    itemInputClassName?: string;
    errMsgClassName?: string;
  };
  name: string;
  type: FormItemType;
  value?: any;
  placeholder?: string;
  label?: string;
  selectOptions?: Option[];
  checkOptions?: Option[] | string[];
  radioOptions?: Option[];
  suffix?: string | JSX.Element;
  addonAfter?: string | JSX.Element;
  render?: (name: string) => JSX.Element | JSX.Element[] | null;
  column?: undefined | number; //可单独配置所占宽度
  rules?: Rule[];
  autoSize?:
    | boolean
    | {
        minRows?: number;
        maxRows?: number;
      };
  treeData?: TreeNode[];
  treeDataTree?: TreeNodeNormal[];
  onChange?: (value: any) => void;
  mode?: 'multiple' | 'tags' | undefined;
  visibilityToggle?: boolean;
  hidden?: boolean;
  labelShould?: boolean;
  labelWidth?: number;
  inputWidth?: number;
  showTime?: TimePickerProps | boolean;
  format?: string;
  disabled?: boolean;
  accept?: string;
  maxSize?: number;
  fileParam?: {};
  extra?: string;
  allowClear?: boolean;
  itemStyle?: {
    labelWidth: string;
    inputWidth: string;
  };
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
  // 验证时机
  validateValueOnChange?: boolean;
}
//#endregion
//#region
export interface FormProps {
  ref: {
    current?: {
      getFormData: any;
    };
  };
  formConfig: FormConfig[];
  column?: number | undefined;
  hasBtn?: boolean;
  onSearch?: (data: {}) => void;
  onReset?: (data: {}) => void;
  labelWidth?: number;
  inputWidth?: number;
  formItemClassName?: string;
}
//#endregion
export interface FormItemProps extends FormConfig {
  setParentState: (state: AnyObj) => void;
  parentColumn: number;
  refBrother: { [key: string]: any };
  [key: string]: any;
}
