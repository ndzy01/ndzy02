import { createContext } from 'react';
export const FormContext = createContext<{
  [key: string]: {
    defaultValue?: string;
    value?: string;
    validate?: {
      isPass: boolean;
      msg: string;
    };
    mount?: boolean;
    getValue?: (isValidate: boolean) => any;
    setValue?: (value: any, isValidate?: boolean) => void;
  };
}>({});
