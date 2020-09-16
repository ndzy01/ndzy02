import { createContext } from 'react';
import { FormContextItem } from '@/component/form/formTypes';
export const FormContext = createContext<{
  [key: string]: FormContextItem;
}>({});
