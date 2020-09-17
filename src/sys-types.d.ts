interface InitProps {
  [key: string]: any;
}
interface InitState {
  [key: string]: any;
}
interface AnyObj {
  [key: string]: any;
}
// form
interface FormContextItem {
  value?: any;
  validate?: {
    isPass: boolean;
    msg: string;
  };
  validateValue: (value: any) => void;
  setValue?: (value: any) => void;
}

// FormItemType
type FormItemType = 'text' | 'input';

// RuleType
type RuleType = 'required';

// Rule
interface Rule {
  type: RuleType;
  name?: string;
  msg?: string;
  showErr?: boolean; // 不可展示不通过验证的值
  validate?: (value: any) => { isPass: boolean; msg: string };
}

// FormConfig
interface FormConfig {
  name: string; // 唯一标识 all
  type: FormItemType; // item 类型 all
  column?: number; //可单独配置所占宽度 all
  // all
  formItemStyle?: {
    itemWrap?: AnyObj;
    item?: AnyObj;
    itemLabel?: AnyObj; // width 默认 30%
    itemInput?: AnyObj; // width 默认 70%
    itemInputValidate?: AnyObj;
    itemRequireSymbol?: AnyObj;
    itemValidateMsg?: AnyObj;
  };
  labelWidth?: number; // all
  inputWidth?: number; // all
  // all
  formItemClassName?: {
    itemWrap?: string;
    item?: string;
    itemLabel?: string;
    itemInput?: string;
    itemInputValidate?: string;
    itemRequireSymbol?: string;
    itemValidateMsg?: string;
  };
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
  inputType?: {
    placeholder?: string;
  };
  // selectOptions?: Option[];
  // checkOptions?: Option[] | string[];
  // radioOptions?: Option[];
  // suffix?: string | JSX.Element;
  // addonAfter?: string | JSX.Element;
  // autoSize?:
  //   | boolean
  //   | {
  //       minRows?: number;
  //       maxRows?: number;
  //     };
  // // treeData?: TreeNode[];
  // // treeDataTree?: TreeNodeNormal[];
  // mode?: 'multiple' | 'tags' | undefined;
  // visibilityToggle?: boolean;

  // showTime?: TimePickerProps | boolean;
  // format?: string;
  // disabled?: boolean;
  // accept?: string;
  // maxSize?: number;
  // fileParam?: {};
  // extra?: string;
  // allowClear?: boolean;
  // disabledDate?: (current: Moment | null) => boolean;
  // disabledTime?: (
  //   current?: Moment | null
  // ) => {
  //   disabledHours?: () => number[];
  //   disabledMinutes?: () => number[];
  //   disabledSeconds?: () => number[];
  // };
  // switchData?: { value: any; checked: boolean }[];
  // maxHeight?: number;
  // maxLength?: number;
}
//
interface FormProps {
  column?: number;
  formClassName?: string;
  formStyles?: AnyObj;
  formConfig: FormConfig[];
  // hasBtn?: boolean;
  // onSearch?: (data: {}) => void;
  // onReset?: (data: {}) => void;
}

//#endregion
interface FormItemProps extends FormConfig {
  setParentState: (value: AnyObj) => void;
  parentColumn: number; // form 的 Column
  formState: { [key: string]: FormContextItem };
  [key: string]: any;
}
// end form
