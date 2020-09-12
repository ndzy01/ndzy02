import { createContext } from 'react';
import { FormContextItem } from './types';
export const FormContext = createContext<{
  [key: string]: FormContextItem;
}>({});
