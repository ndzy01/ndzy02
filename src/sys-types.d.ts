interface InitProps {
  [key: string]: any;
}
interface InitState {
  [key: string]: any;
}
interface AnyObj {
  [key: string]: any;
}
interface FormRef {
  current: {
    getFormData?: (validate?: boolean) => {} | boolean;
    getFormItemData?: (key: string, validate: boolean = true) => {} | boolean;
    setFormItemData?: (
      key: string,
      value: any,
      validate: boolean = false
    ) => void;
    clearFormItems?: () => void;
    // handleReset?: () => any;
    // handleSearch?: () => any;
    [key: string]: any;
  };
  [key: string]: any;
}
// end form
