import { createContext } from 'react';

export const FormItemContext = createContext({
  defaultValue: '',
  value: '',
  validate: {
    isPass: true,
    msg: ''
  },
  mount: false
});
