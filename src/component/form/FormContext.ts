import { createContext } from 'react';
// import { FormContextItem } from '@/component/form';
export const FormContext = createContext<{
  [key: string]: FormContextItem;
}>({});
