import { createContext } from 'react';
import { FormContextItem } from '@/component/form/form-types';
export const FormContext = createContext<{
  [key: string]: FormContextItem;
}>({});
