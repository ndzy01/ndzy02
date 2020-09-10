import { useContext } from 'react';
import { FormItemProps } from './types';

import { FormItemContext } from './context';

export const FormItemText = (props: FormItemProps) => {
  const state = useContext(FormItemContext);
  if (props.render) {
    return props.render(props.name);
  }
  return props.value || state.defaultValue;
};
